import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
userLogin: any;
myCaptcha: any;

  constructor(
  private  fb: FormBuilder,
  ) {
    this.userLogin = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(16)]],
    
    })
   }

  ngOnInit(): void {
  }
resolved(myCaptchaResponse: string) {
  this.myCaptcha = myCaptchaResponse;
  console.log(this.myCaptcha + "My captcha");
}
  }
  

