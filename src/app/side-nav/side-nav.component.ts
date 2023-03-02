import { Component, OnInit, Injectable } from '@angular/core';
import { Users } from '../Models/users';
import { UserService } from '../Services/user.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private userService: UserService, private router:Router ) { }

  user!:Users
  userImage:string=""

  ngOnInit(): void {
    this.getUser()
  }


  getUser():void{
    this.userService.getProfile()
    this.userService.getUserId(this.userService.decodedToken.id).subscribe(resp=>{
      this.user = resp.data
      console.log(this.user)
      this.userImage="http://localhost:5000/"+resp.data.profile_image
      this.choice(resp);

    })
  }
   

choice (resp:any) {

  if (this.userImage === "http://localhost:5000/undefined") {
    this.userImage = "../../assets/FrontEnd Pictures/Profilelogo.png"; 
    console.log(this.userImage, "DEFAULT IMAGE");
    sessionStorage.setItem("userImage", this.userImage);
  }
  else  {

    this.userImage="http://localhost:5000/"+resp.data.profile_image;
      console.log(this.userImage, "NEW IMAGE");
      sessionStorage.setItem("userImage", this.userImage);

  }
}
  onLogOut() {
    Swal.fire({
      icon: 'success',
      title: 'Logged Out Successful',
      showConfirmButton: false,
      timer: 1400
    })
    
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token')
      this.router.navigate(['/'])
      console.log("token" ,localStorage.getItem('token'))
    }

  }
}
