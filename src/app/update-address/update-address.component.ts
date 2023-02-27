import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ParishesService } from '../Services/parishes.service';
import { Parish } from '../Models/parish';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent {

  constructor(private router: Router, private parishService: ParishesService) { }
  
  updateAddress = new FormGroup({
    address_1: new FormControl('',(Validators.required)),
    address_2: new FormControl('',(Validators.required)),
    city: new FormControl('',(Validators.required)),
    parish: new FormControl('',(Validators.required)),
    user_id:new FormControl()
  })

  parishes!:Parish[]


  editAddress(){
    if(this.updateAddress.controls['address_1'].hasError('required')||this.updateAddress.controls['address_2'].hasError('required')||this.updateAddress.controls['city'].hasError('required')||this.updateAddress.controls['parish'].hasError('required')){
      Swal.fire({
        icon:"error",
        title:"Form fields cannot be empty"
      })
      this.router.navigate(['/update-address'])
    }
  }

  getAllParishes(){
    this.parishService.getParishes().subscribe((getParishes)=>{
      this.parishes = getParishes.data
      console.log("parishes",this.parishes)
    })
  }



  ngOnInit(): void {
    this.getAllParishes()
  }


}
