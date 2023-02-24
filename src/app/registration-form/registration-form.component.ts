import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
<<<<<<< Updated upstream
import { Users } from '../Models/users';
import { UserService } from '../Services/user.service';
=======
import { Users} from '../Models/users';
import { UserService,  } from '../Services/user.service';
>>>>>>> Stashed changes
// import { AsyncValidator } from '@angular/forms';
import Swal from 'sweetalert2';
import { passwordLengthValidator, asyncValidatorFn, passwordMatchValidator2 } from '../Services/asyncronous-validator.service';
import { kMaxLength } from 'buffer';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  newUser: any;
  // myCaptcha: any;
  selectedPic: any;
  errorMessage: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient,
    // private fg: FormGroup,

  ) {
    this.newUser = fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(36)]],
      last_name: ['', [Validators.required,  Validators.maxLength(36)]],
      email: ['', [Validators.required, Validators.email]],
      mobile_number: ['', Validators.required,],
      home_number: ['', Validators.required,],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required,]],
      profile_image: ['', [this.profilePicValidator,]],

    }, {


    });

  }


// this is to gather the passwords for the validation in the sweet alert
  get password() {
    return this.newUser.get('password');
  }

  get confirmPassword() {
    return this.newUser.get('confirmPassword');
  }



  ngOnInit(): void {



  }


  //To register a new user
  onSubmit() {
    //Password value confirmation
    
    if (this.password.value != this.confirmPassword.value) {
      Swal.fire({
        icon: 'error',
        title: 'Please ensure password and confirm password are the same',
        showConfirmButton: false,
        timer: 1500
      })

    }
    //email validation
    else if (this.newUser.controls['email'].hasError('email')) {
      Swal.fire({
        icon: 'error',
        title: 'Please ensure your email is valid',
        showConfirmButton: false,
        timer: 1500
      })
    }
    //Name Validations
    else if (this.newUser.controls['first_name'].hasError('maxlength') || this.newUser.controls['last_name'].hasError('maxlength')) {
      Swal.fire({
        icon: 'error',
        title: 'First name and Last name must be less than 36 characters long',
        showConfirmButton: false,
        timer: 1500
      })

    }
    else if (this.newUser.controls["password"].hasError('minlength')) {
      Swal.fire({
        icon: 'error',
        title: 'Password must be at least be 8 characters long',
        showConfirmButton: false,
        timer: 1500
      })

    }
    //required validators
    else if (this.newUser.controls['password'].hasError('required') || this.newUser.controls['confirmPassword'].hasError('required') || this.newUser.controls['first_name'].hasError('required') || this.newUser.controls['last_name'].hasError('required') || this.newUser.controls['email'].hasError('required') || this.newUser.controls['mobile_number'].hasError('required') || this.newUser.controls['home_number'].hasError('required')) {

      Swal.fire({
        icon: 'error',
        title: 'Please ensure all fields are filled',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else if (  this.userService.createNewUser(this.newUser.value).subscribe(res => res.status=== 404)) {
      Swal.fire({
        icon: 'error',
        title: 'This email is already registered',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      console.log("SUBMITED")
      console.log("confirm password:" + this.confirmPassword.value + "password" + this.password.value)
      this.userService.createNewUser(this.newUser.value).subscribe((data: any) => { console.log(data) });
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(this.newUser.value);
      // this.router.navigate(['']);
    }



    




  }

  //Sweet Altert 
  // onSubmit2() {
  //   this.authService.checkLogin(this.userLogin.value).subscribe(res=>{
  //     if(res.status===200){
  //       console.log("successful login")
  //       console.log(this.userLogin);
  //       localStorage.setItem('email', res['data']['existUser']['email'])
  //       this.router.navigate(['/userProfile'])
  //       Swal.fire({
  //         title:"YOU HAVE SUCCESSFULLY LOGGED IN",
  //         icon:"success"
  //       })
  //     }
  //     else {
  //       Swal.fire({
  //         icon:"error",
  //         title:"Please enter valid user credentials"
  //       })
  //       console.log('Not valid user')
  //       console.log(this.userLogin)
  //     }
  //   },(err) => {
  //     if(err) {
  //       console.log('Error is ' , err)
  //     }
  //   })

  // }
  // }


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
  onPicSelected(event: any) {
    this.selectedPic = event.target.files[0];
  }
  userImage = "../../assets/FrontEnd Pictures/Profilelogo.png"


  onselectFile(event: any) {
    if (event.target.files) {
      var check = new FileReader();
      check.readAsDataURL(event.target.files[0]);
      check.onload = (change: any) => {
        this.userImage = change.target.result;
      }
    }
  }
}

