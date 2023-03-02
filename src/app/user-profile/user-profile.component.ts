import { Component, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Users } from '../Models/users';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  // declarations: [SideNavComponent]
})
export class UserProfileComponent {

  constructor(
    private router: Router, 
    private route:ActivatedRoute, 
    private userService: UserService,
     ) { }

  getUser!: Users
  updateUser!: FormGroup
  userImage:any = ""
  selectedPic:String=""
  defaultImage:String="../../assets/FrontEnd Pictures/Profilelogo.png"


  updateUserDetails(){
    const form : any = new FormData();
    
    Object.keys(this.updateUser.controls).forEach((key) => {
    form.append(key, this.updateUser.controls[key].value)
    console.log(form, "The Form");
    });
    //Required fields needed
    if(this.updateUser.controls['first_name'].hasError('required') || this.updateUser.controls['last_name'].hasError('required') || this.updateUser.controls['email'].hasError('required') || this.updateUser.controls['mobile_number'].hasError('required') || this.updateUser.controls['home_number'].hasError('required')){
      Swal.fire({
        icon:"error",
        title:"Form fields cannot be empty"
      })
      this.router.navigate(['/user-profile'])
    }
    else if (this.updateUser.controls['first_name'].hasError('minLength') || this.updateUser.controls['last_name'].hasError('minLength')) {
      Swal.fire({
        icon:"error",
        title:"First and Last name must be more than 2 characters"
      })

    }
    else if (this.updateUser.controls['first_name'].hasError('maxLength') || this.updateUser.controls['last_name'].hasError('maxLength')) {
      Swal.fire({
        icon:"error",
        title:"First and Last name must have less than 36 characters"
      })

    }
    else if (this.updateUser.controls['first_name'].hasError('pattern') || this.updateUser.controls['last_name'].hasError('pattern')) {
      Swal.fire({
        icon:"error",
        title:"First and Last name can only contain letters and not numbers."

      })
    
    }
    //Number validation
    else if (this.updateUser.controls['mobile_number'].hasError('min') || this.updateUser.controls['mobile_number'].hasError('max') || 
    this.updateUser.controls['home_number'].hasError('min') || this.updateUser.controls['home_number'].hasError('max')) {
      Swal.fire({
        icon:"error",
        title:"Number can only limit of three up to 10 characters."
      })
    }
    
      else if(this.updateUser.controls['email'].hasError('email')){
        Swal.fire({
          icon:"error",
          title:"Please enter a valid email"
      })
      this.router.navigate(['/user-profile'])
    }
    else{
      this.userService.updateUser(this.userService.decodedToken.id, form).subscribe({
        next:(res)=>{
          Swal.fire({
            icon: 'success',
            title: 'Update Successful',
            showConfirmButton: false,
            timer: 1500
          })
          
          this.router.navigate(['/list-address'])
        },
        error:(err)=>{
          throw err
        }
      })
    }
  }

  ngOnInit(): void{
    this.userService.getProfile()
    this.userService.getUserId(this.userService.decodedToken.id).subscribe(resp=>{
      this.getUser = resp.data;
      this.updateUser = new FormGroup({
        first_name: new FormControl(resp.data.first_name,(Validators.required, Validators.minLength(3), Validators.maxLength(36), Validators.pattern('^[a-zA-Z ]*$'))),
        last_name: new FormControl(resp.data.last_name,(Validators.required, Validators.minLength(3), Validators.maxLength(36), Validators.pattern('^[a-zA-Z ]*$'))),
        email: new FormControl(resp.data.email,(Validators.required, Validators.email)),
        mobile_number: new FormControl(resp.data.mobile_number,(Validators.required, Validators.min(-999), Validators.max(9999999999999))),
        home_number: new FormControl(resp.data.home_number,(Validators.required, Validators.min(-999), Validators.max(9999999999999))),
        profile_image: new FormControl('',(Validators.required)),

      })
      
      
      this.userImage = sessionStorage.getItem("userImage");
    
      
      
     
    })
  }

  
  

  onselectFile(event:any){
    if(event.target.files){
      this.selectedPic = event.target.files[0];
      var check = new FileReader();
      check.readAsDataURL(event.target.files[0]);
      check.onload=(change:any)=>{
        this.userImage=change.target.result;
  
         this.updateUser.patchValue({ profile_image: this.selectedPic });
         
      }
      
    }

  }
  
}

