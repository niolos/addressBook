import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ParishesService } from '../Services/parishes.service';
import { Parish } from '../Models/parish';
import { AddressService } from '../Services/address.service';
import { Address } from '../Models/address';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  parishes!:Parish[]
  userId=this.userService.getProfile

  constructor(private router: Router, private parishService:ParishesService, private addressService: AddressService, private userService:UserService) { }


  createAddress = new FormGroup({
    address_1: new FormControl('',(Validators.required)),
    address_2: new FormControl('',(Validators.required)),
    city: new FormControl('',(Validators.required)),
    parish: new FormControl('',(Validators.required)),
    user_id: new FormControl()
  })

  newAddress(){
    const formInput = this.createAddress.value as Partial<Address>
    // this.userService.getProfile()
    if(this.createAddress.controls['address_1'].hasError('required')||this.createAddress.controls['address_2'].hasError('required')||this.createAddress.controls['city'].hasError('required')||this.createAddress.controls['parish'].hasError('required')){
      Swal.fire({
        icon:"error",
        title:"Form fields cannot be empty"
      })
      this.router.navigate(['/add-address'])
    }
    else{
      this.addressService.createNewAddress(formInput).subscribe({
        next:(res)=>{
          console.log("response",res)
          Swal.fire({
            title:"Address successfully created",
            icon: 'success',
          })
          this.router.navigate(['/list-address'])
        },
        error:(err)=>{
          throw err
        }
      })
      console.log('address created')
    }
  }

  getAllParishes(){
    this.parishService.getParishes().subscribe((getParishes)=>{
      this.parishes = getParishes.data
      console.log("parishes",this.parishes)
    })
  }

  ngOnInit(): void {
    this.userService.getProfile()
    this.getAllParishes()
    this.createAddress = new FormGroup({
      address_1: new FormControl('',(Validators.required)),
      address_2: new FormControl('',(Validators.required)),
      city: new FormControl('',(Validators.required)),
      parish: new FormControl('',(Validators.required)),
      user_id: new FormControl(this.userService.decodedToken.id)
    })

    
  }
  
  display: any;
    center: google.maps.LatLngLiteral = {
        lat: 24,
        lng: 12
    };
    zoom = 4;
    moveMap(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.center = (event.latLng.toJSON());
    }
    move(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.display = event.latLng.toJSON();
    }
}
