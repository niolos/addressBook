import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddressComponent } from './add-address/add-address.component';
import { UserComponent } from './frontend/user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DisplayAddressComponent } from './display-address/display-address.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { KeepoutGuard } from './Services/keepout.guard';


const routes: Routes = [
  {path:'', component:UserComponent},
  {path:'addAddress', component:AddAddressComponent, canActivate:[KeepoutGuard]},
  {path:'userProfile', component:UserProfileComponent, canActivate:[KeepoutGuard]},
  {path: 'login', component:UserComponent},
  {path: 'listAddress', component:DisplayAddressComponent, canActivate:[KeepoutGuard]},
  {path: 'register', component:RegistrationFormComponent},
  {path: 'updateAddress', component:UpdateAddressComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
