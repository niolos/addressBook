import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  constructor(private router: Router,) { }

  createAddress = new FormGroup({
    address1: new FormControl('',(Validators.required)),
    address2: new FormControl('',(Validators.required)),
    city: new FormControl('',(Validators.required)),
    parish: new FormControl('St. Catherine',(Validators.required)),
  })

  newAddress(){
    if(this.createAddress.controls['address1'].hasError('required')||this.createAddress.controls['address2'].hasError('required')||this.createAddress.controls['city'].hasError('required')||this.createAddress.controls['parish'].hasError('required')){
      Swal.fire({
        icon:"error",
        title:"Form fields cannot be empty"
      })
      this.router.navigate(['/addAddress'])
    }
  }

  ngOnInit(): void {
  }

}
