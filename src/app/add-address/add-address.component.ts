import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ParishesService } from '../Services/parishes.service';
import { Parish } from '../Models/parish';
import { AddressService } from '../Services/address.service';
import { Address } from '../Models/address';
import { UserService } from '../Services/user.service';
import { MapInterface } from '../Models/map.interface';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  @ViewChild('inputField')
  inputField!: ElementRef;
  
  @Output() placeChanged = new EventEmitter<MapInterface>();

  parishes!:Parish[]
  fromValue: MapInterface | undefined
  toValue: MapInterface | undefined
  autocomplete: google.maps.places.Autocomplete|undefined


  ngAfterViewInit(){
    let address_line1:string=''
    let city:string=''
    let streetNumber:string=''

    var options = {
      componentRestrictions: {country: "jm"}
     };

     this.autocomplete= new google.maps.places.Autocomplete(this.inputField.nativeElement, options)

    this.autocomplete.addListener('place_changed', ()=>{
      const place = this.autocomplete?.getPlace();
      const result : MapInterface={
        address: this.inputField.nativeElement.value,
        location: place?.geometry?.location,
        iconUrl: place?.icon,
      }

      //this updates the map after the place changes with the from value from the html 
      this.fromValue = result


      console.log(place?.address_components);
      // console.log(result.address.split(', ')[0]);
      // // this.testAddress1= result.address.split(', ')[1];


      console.log("results info",result);



      for (const component of place?.address_components as google.maps.GeocoderAddressComponent[]) {
        const componentType = component.types[0];
      
        switch (componentType) {
          case "street_number": {
            streetNumber = `${component.long_name} `;
            break;
          }
    
          case "route": {
            address_line1 = `${component.short_name}`;
            break;
          }
    
          case "locality":{
            city =`${component.long_name}`
          }
        }
      }
      this.createAddress.controls['address_1'].setValue(streetNumber + address_line1)
      this.createAddress.controls['city'].setValue(city)
      
      this.ngZone.run(()=>{
        this.placeChanged.emit(result)
      })
    })
  }
  
  userId=this.userService.getProfile

  constructor(private router: Router, private parishService:ParishesService, private addressService: AddressService, private userService:UserService, private ngZone:NgZone) { }


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
    }else{
      this.addressService.createNewAddress(formInput).subscribe({
        next:(res)=>{
          if (res.status === 201 || res.status ===200) {

            
          }

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

  changeLocation(event:any){
    console.log("the event passed",event);
    
  }
}