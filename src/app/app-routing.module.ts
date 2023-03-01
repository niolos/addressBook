import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddressComponent } from './add-address/add-address.component';
import { UserComponent } from './frontend/user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DisplayAddressComponent } from './display-address/display-address.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { KeepoutGuard } from './Services/keepout.guard';
import { ErrorpageComponent } from './errorpage/errorpage.component';


const routes: Routes = [
  {path:'', component:UserComponent},
  {path:'add-address', component:AddAddressComponent, canActivate:[KeepoutGuard]},
  {path:'user-profile', component:UserProfileComponent, canActivate:[KeepoutGuard]},
  {path: 'login', component:UserComponent},
  {path: 'list-address', component:DisplayAddressComponent, canActivate:[KeepoutGuard]},
  {path: 'register', component:RegistrationFormComponent},
  {path: 'update-address', component:UpdateAddressComponent},  
  {path: '**', component:ErrorpageComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
