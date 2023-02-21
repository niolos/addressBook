import { Component, OnInit } from '@angular/core';
import { Users } from '../Models/users';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private userService: UserService) { }

  user!:Users
  userImage:String=""

  ngOnInit(): void {
    this.getUser()
  }


  getUser():void{
    this.userService.getUserId(this.userService.decodedToken.id).subscribe(resp=>{
      this.user = resp.data
      this.userImage="http://localhost:5000/"+resp.data.profile_image
    })
  }
}
