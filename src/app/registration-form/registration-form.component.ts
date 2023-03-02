import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  HttpClientModule,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Users } from '../Models/users';
import { UserService, } from '../Services/user.service';


// import { AsyncValidator } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  passwordLengthValidator,
  asyncValidatorFn,
  passwordMatchValidator2,
} from '../Services/asyncronous-validator.service';
import { kMaxLength } from 'buffer';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  newUser: any;
  // myCaptcha: any;
  // selectedPic: any;
  errorMessage: any;
  // userImage:String;
  selctedFile: File;
  selectedPic:String=""
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient

  ) // private fg: FormGroup,

  {
    this.newUser = fb.group(
      {
        first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(36), Validators.pattern('^[a-zA-Z ]*$')]],
        last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(36), Validators.pattern('^[a-zA-Z ]*$')]],
        email: ['', [Validators.required, Validators.email]],
        mobile_number: ['', [Validators.required, Validators.min(-999), Validators.max(9999999999999)]],
        home_number: ['', [Validators.required, Validators.min(-999), Validators.max(9999999999999)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(18)]],
        confirmPassword: ['', [Validators.required]],
        profile_image: ['', [this.profilePicValidator]],

      },

      {}

    );
    console.log("IMAGE FOR USER " + this.newUser.profile_image)
  }

  // this is to gather the passwords for the validation in the sweet alert

  get password() {
    return this.newUser.get('password');
  }

  get confirmPassword() {
    return this.newUser.get('confirmPassword');
  }

  get profilePic() {

    // return this.newUser.get('profile_image').toString().replace(/^.*\\/, "");
    return this.newUser.get('profile_image');


  }

  ngOnInit(): void { }

  // To register a new user 101
  onSubmit() {

    const form = new FormData();

    // append all data to the Form Data object from the Reactive form
    // this was done for file upload because reactive forms doesn't natively support file upload
    Object.keys(this.newUser.controls).forEach((key) => {
      form.append(key, this.newUser.controls[key].value);
    
    });
    //Password value confirmation


    if (this.password.value != this.confirmPassword.value) {
      Swal.fire({
        icon: 'error',
        title: 'Please ensure password and confirm password are the same',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    //email validation
    else if (this.newUser.controls['email'].hasError('email')) {
      Swal.fire({
        icon: 'error',
        title: 'Please ensure your email is valid',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    //Name Validations
    else if (
      this.newUser.controls['first_name'].hasError('maxlength') || this.newUser.controls['last_name'].hasError('maxlength')
    ) {
      Swal.fire({
        icon: 'error',
        title: 'First name and Last name must be less than 36 characters long',
        showConfirmButton: false,
        timer: 1500,
      });

    }
    else if (
      this.newUser.controls['first_name'].hasError('pattern') || this.newUser.controls['last_name'].hasError('pattern')
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Only letters for names can be submitted no numbers.',
        showConfirmButton: false,
        timer: 1500,
      });

    }
    else if (this.newUser.controls['first_name'].hasError('minlength') || this.newUser.controls['last_name'].hasError('minlength')) {

      Swal.fire({
        icon: 'error',
        title: 'First name and Last name must be more than 3 characters long',
        showConfirmButton: false,
        timer: 1500,
      });

    }
    //  else if (this.newUser.controls['mobile_number'].hasError('minLength') || this.newUser.controls['home_number'].hasError('minLength')) {

    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Mobile number and Home number must be more than 3 characters long',
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });

    //  }
    else if (this.newUser.controls['mobile_number'].hasError('min') || this.newUser.controls['home_number'].hasError('min')) {

      Swal.fire({
        icon: 'error',
        title: 'Mobile number and Home number must be more than 3 characters long',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    //Need place maxlength for number 
    else if (this.newUser.controls['password'].hasError('minlength')) {
      Swal.fire({
        icon: 'error',
        title: 'Password must be at least be 8 characters long',
        showConfirmButton: false,
        timer: 1500,
      });
    }
     else if (this.newUser.controls['profile_image'].hasError('profilePicValidator')) {

      Swal.fire({
        icon: 'error',
        title: 'File Size is too large or file is not an image',
        showConfirmButton: false,
        timer: 1500,
      });

     }
    //required validators
    else if (
      this.newUser.controls['password'].hasError('required') ||
      this.newUser.controls['confirmPassword'].hasError('required') ||
      this.newUser.controls['first_name'].hasError('required') ||
      this.newUser.controls['last_name'].hasError('required') ||
      this.newUser.controls['email'].hasError('required') ||
      this.newUser.controls['mobile_number'].hasError('required') ||
      this.newUser.controls['home_number'].hasError('required')
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Please ensure all fields are filled',
        showConfirmButton: false,
        timer: 1500,
      });
    }


    // else if (this.userService.createNewUser(this.newUser).subscribe(res => res.status===404 && console.log(res.error))) {


    // }




    else {
      console.log('SUBMITED');
      console.log(
        'confirm password:' +
        this.confirmPassword.value +
        'password' +
        this.password.value


      );

      console.log("DATA DOT PROFILE IMAGE = " + this.profilePic);






      // this.userService.uploadPic(this.newUser.get('profile_image').value,)








      console.log(this.newUser.value)
      this.userService

        .createNewUser(form)


        // this.createNewUser(this.newUser.value, ).subscribe((data: any) => { console.log(this.newUser.value);


        .subscribe((data: any) => {


          if (data.status === 404) {

            Swal.fire({
              icon: 'error',
              title: 'Email already exists',

              showConfirmButton: false,
              timer: 1500,
            });

          }
          else {

            console.log(this.newUser.get('profile_image').value + "  " + this.newUser.get('profile_image').file)



            // this.userService.uploadPic(this.newUser.get('profile_image').value,)

            // imgData = getBase64Image(this.newUser.get('profile_image').value,);
            // localStorage.setItem("imgData", this.imgData);

            // this.newUser.push(data.profile_image);
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(this.newUser.value);
            this.router.navigate(['']);

          }
        });
    }
  }

  // Sweet Altert
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
    // if (file.size > 1000000000000000000) {
      console.log(File, 'file size');
    if (file.size > 1) {
      return { fileTooLarge: true };
    }
    return null;
  }
  onPicSelected(event: any) {


  }
  userImage = '../../assets/FrontEnd Pictures/Profilelogo.png';

  onselectFile(event: any) {
    console.log(event)
    if (event.target.files) {
      this.selectedPic = event.target.files[0];





      var check = new FileReader();
      check.readAsDataURL(event.target.files[0]);
      check.onload = (change: any) => {
        this.userImage = change.target.result;
        console.log(this.selectedPic + " SELECTED PIC")
        // this.uploadFile(this.selectedPic);
        console.log(this.selectedPic + " UPLOADING")
        
         this.newUser.patchValue({ profile_image: this.selectedPic });
  
        //  this.profilePicValidator(this.selectedPic)


      };
    }
  }

  // onselectFile2(event: any) {

  //   const file: File = event.target.files[0];

  // }
  // uploadFile(file: File) {
  //   const formData = new FormData();
  //   formData.append('file', file, file.name);
  //   localStorage.setItem('file', JSON.stringify(formData));
  // }
  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('email', this.newUser.get('email').value);
  //   formData.append('first_name', this.newUser.get('first_name').value);
  //   formData.append('last_name', this.newUser.get('last_name').value);
  //   formData.append('mobile_number', this.newUser.get('mobile_number').value);
  //   formData.append('home_number', this.newUser.get('home_number').value);
  //   formData.append('password', this.newUser.get('password').value);
  //   formData.append('confirmPassword', this.newUser.get('confirmPassword').value);
  //   formData.append('profile', this.newUser.get('profile_image').value);
  //   this.http.post<any>("http://localhost:5000/api/v1/common/users?platform=web", formData).subscribe(res => {console.log(res), console.log(Error)})



  // }

}
