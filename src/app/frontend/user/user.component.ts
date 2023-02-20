import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { asyncValidatorFn } from 'src/app/Services/asyncronous-validator.service';
import { passwordLengthValidator } from 'src/app/Services/asyncronous-validator.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Users } from 'src/app/Models/users';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
public check: boolean=false;

// recaptchaSiteKey = environment.recaptchaSiteKey;

  constructor(
  private  fb: FormBuilder, private authService: AuthenticationService, private router:Router) {   }

  userLogin = new FormGroup({
    email: new FormControl('',(Validators.required, Validators.email)),
    password: new FormControl('',(Validators.required, passwordLengthValidator(8))),
    checkCaptcha: new FormControl(),
  })
   
  //   this.userLogin = fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required, passwordLengthValidator(8)],
  //     checkCaptcha: new FormControl(['', Validators.required, asyncValidatorFn])
  //   })

  ngOnInit(): void {
   
  }

 

  myCaptcha(myCaptchaResponse: string) {
    this.check = (myCaptchaResponse && myCaptchaResponse.length > 0)?true:false
    // Sitekey 6LdpLIkkAAAAAD7UZ2dO7uWJ8JGaPPiZvvl8iXar
    // SECRET KEY FOR CAPTCHA 6LdpLIkkAAAAANwDKI1N02-7ZADP_ofTiRrxk4ZU 
  }

  onSubmit() {
    this.authService.checkLogin(this.userLogin.value).subscribe(res=>{
      if(res.status===200){
        console.log("successful login")
        console.log(this.userLogin);
        localStorage.setItem('email', res['data']['existUser']['email'])
        this.router.navigate(['/userProfile'])
        Swal.fire({
          title:"YOU HAVE SUCCESSFULLY LOGGED IN",
          icon:"success"
        })
      }
      else {
        Swal.fire({
          icon:"error",
          title:"Please enter valid user credentials"
        })
        console.log('Not valid user')
        console.log(this.userLogin)
      }
    },(err) => {
      if(err) {
        console.log('Error is ' , err)
      }
    })
    
  }
}
  

