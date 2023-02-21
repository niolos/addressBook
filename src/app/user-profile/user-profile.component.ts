import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Users } from '../Models/users';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  constructor(private router: Router, private route:ActivatedRoute, private userService: UserService) { }

  getUser!: Users
  updateUser!: FormGroup
  userImage:String=""


  updateUserDetails(){
    if(this.updateUser.controls['first_name'].hasError('required') || this.updateUser.controls['last_name'].hasError('required') || this.updateUser.controls['email'].hasError('required') || this.updateUser.controls['mobile_number'].hasError('required') || this.updateUser.controls['home_number'].hasError('required')){
      Swal.fire({
        icon:"error",
        title:"Form fields cannot be empty"
      })
      this.router.navigate(['/userProfile'])
    }
      else if(this.updateUser.controls['email'].hasError('email')){
        Swal.fire({
          icon:"error",
          title:"Please enter a valid email"
      })
      this.router.navigate(['/addSub'])
    }
    else{
      this.userService.updateUser(this.userService.decodedToken.id, this.updateUser.value).subscribe({
        next:(res)=>{
          Swal.fire({
            icon: 'success',
            title: 'Update Successful',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/userProfile'])
        },
        error:(err)=>{
          alert(err)
        }
      })
    }
  }

  ngOnInit(): void{
    
    
    this.userService.getProfile()
    // console.log(localStorage.getItem("authToken"))
    this.userService.getUserId(this.userService.decodedToken.id).subscribe(resp=>{
      console.log("user info", resp);
      this.getUser = resp.data;
      this.updateUser = new FormGroup({
        first_name: new FormControl(resp.data.first_name,(Validators.required)),
        last_name: new FormControl(resp.data.last_name,(Validators.required)),
        email: new FormControl(resp.data.email,(Validators.required, Validators.email)),
        mobile_number: new FormControl(resp.data.mobile_number,(Validators.required)),
        home_number: new FormControl(resp.data.home_number,(Validators.required))
      })
      this.userImage="http://localhost:5000/"+resp.data.profile_image
    })

    console.log(this.userImage)
  }

  

  onselectFile(event:any){
    if(event.target.files){
      var check = new FileReader();
      check.readAsDataURL(event.target.files[0]);
      check.onload=(change:any)=>{
        this.userImage=change.target.result;
      }
    }
  }
}
