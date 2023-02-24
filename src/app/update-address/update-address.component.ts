import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent {

  constructor(private router: Router,) { }
  
  updateAddress = new FormGroup({
    address1: new FormControl('',(Validators.required)),
    address2: new FormControl('',(Validators.required)),
    city: new FormControl('',(Validators.required)),
    parish: new FormControl('St. Catherine',(Validators.required)),
  })


  editAddress(){
    if(this.updateAddress.controls['address1'].hasError('required')||this.updateAddress.controls['address2'].hasError('required')||this.updateAddress.controls['city'].hasError('required')||this.updateAddress.controls['parish'].hasError('required')){
      Swal.fire({
        icon:"error",
        title:"Form fields cannot be empty"
      })
      this.router.navigate(['/updateAddress'])
    }
  }



  ngOnInit(): void {
  }


}
