import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  newUser: any;
  // myCaptcha: any;

  constructor(
    private fb: FormBuilder,

  ) {
    this.newUser = fb.group({
      frstName: ['', Validators.required,],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required,],
      password: ['', Validators.required, Validators.minLength(6),],
      confirmPassword: ['', Validators.required,],
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
onSubmit() {
  console.log("SUBMITED")
}
}
