import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { asyncValidatorFn } from 'src/app/Services/asyncronous-validator.service';
import { passwordLengthValidator } from 'src/app/Services/asyncronous-validator.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
userLogin: any;
myCaptcha: any;
email: any;
// recaptchaSiteKey = environment.recaptchaSiteKey;

  constructor(
  private  fb: FormBuilder,
  ) {
    this.myCaptcha='';
    this.email = "neopetsnathony@gmail.com"
    this.userLogin = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, passwordLengthValidator(8)],
      myCaptcha: ['', Validators.required, asyncValidatorFn, ]
    })
   }

  ngOnInit(): void {
  }
resolved(myCaptchaResponse: string) {
  this.myCaptcha = myCaptchaResponse;
  console.log(this.myCaptcha + "My captcha");
  // Sitekey 6LdpLIkkAAAAAD7UZ2dO7uWJ8JGaPPiZvvl8iXar
  // SECRET KEY FOR CAPTCHA 6LdpLIkkAAAAANwDKI1N02-7ZADP_ofTiRrxk4ZU 
}

onSubmit() {
//   console.log("this.userLogin");
//   if (this.userLogin.valid) {
//     const myCaptchaResponse = this.userLogin.controls.recaptcha.value;
//     console.log(myCaptchaResponse + "My captcha");

    
//  // Send a the reCAPTCHA response to your server for validation
//   }
  
}
  }
  

