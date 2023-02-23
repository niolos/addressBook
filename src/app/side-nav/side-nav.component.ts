import { Component, OnInit } from '@angular/core';
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
  userImage:String=""

  ngOnInit(): void {
    this.getUser()
  }


  getUser():void{
    this.userService.getProfile()
    this.userService.getUserId(this.userService.decodedToken.id).subscribe(resp=>{
      this.user = resp.data
      this.userImage="http://localhost:5000/"+resp.data.profile
    })
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
