import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../Models/users';
import { UserService } from '../Services/user.service';
import { AsyncValidator } from '@angular/forms';
import { passwordLengthValidator, asyncValidatorFn } from '../Services/asyncronous-validator.service';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  newUser: any;
  // myCaptcha: any;
  selectedPic: any;
  

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private route:ActivatedRoute, 
    private userService: UserService,
    // private fg: FormGroup,
    
  ) {
    this.newUser = fb.group({
      first_name: ['', Validators.required,],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_number: ['', Validators.required,],
      home_number: ['', Validators.required,],
      password: ['', Validators.required, passwordLengthValidator(8),],
      confirmPassword: ['', Validators.required,],
      // profilePic: ['',[this.profilePicValidator,]],
    }, {
      validator: this.passwordMatchValidator
      
    });
   
 

   }
   get password() {
    return this.newUser.get('password');
  }

  get confirmPassword() {
    return this.newUser.get('confirmPassword');
  }
  ngOnInit(): void {
 
 
    
  }

  onselectFile(event:any){
    this.selectedPic = event.target.files[0];
    if(event.target.files){
      var check = new FileReader();
      check.readAsDataURL(this.selectedPic);
      check.onload=(change:any)=>{
        this.userImage=change.target.result;
      }
    }
  }
 
  //To register a new user
  onSubmit() {
    console.log("SUBMITED")
    this.userService.createNewUser(this.newUser.value).subscribe((data:any) => {console.log(data)});
    console.log(this.newUser.value);
    // this.router.navigate(['']);
  }

  profilePicValidator(control: FormControl): { [key: string]: any } | null {
    const file = control.value as File;
  
    // if (file.type.split('/')[0] !== 'image') {
    //   return { 'invalidFileType': true };
    // }
    if (file.size > 10000000) {
      return { 'fileTooLarge': true };
    }
    return null;
  }

  userImage="../../assets/FrontEnd Pictures/pexels-the-earthy-jay-15409085.jpg"

  passwordMatchValidator(fg: FormGroup) {
    const password = fg.get('password')!.value;
    const confirmPassword = fg.get('confirmPassword')!.value;

    return password === confirmPassword ? null : { mismatch: true };
  }


}

