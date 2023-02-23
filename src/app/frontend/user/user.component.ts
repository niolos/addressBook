import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators} from '@angular/forms';
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
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    checkCaptcha: new FormControl('',[Validators.required]),
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
    if(this.userLogin.valid){
    this.authService.checkLogin(this.userLogin.value).subscribe({
      next:(res)=>{
        if(res.status===200){
          localStorage.setItem('token', res['data']['token'])
          this.router.navigate(['/listAddress'])
          Swal.fire({
            title:"YOU HAVE SUCCESSFULLY LOGGED IN",
            icon:"success"
          })
          console.log(localStorage.getItem('token'))
        }
    },error:err=>{
      Swal.fire({
        icon:"error",
        title:"Please enter valid user credentials"
      })
      }})
    }
    else{
      Swal.fire({
        icon:"error",
        title:"Please complete all fields"
      })
    }
  }
}
  

