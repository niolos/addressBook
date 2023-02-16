import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddressComponent } from './add-address/add-address.component';
import { UserComponent } from './frontend/user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DisplayAddressComponent } from './display-address/display-address.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

const routes: Routes = [
  {path:'', component:UserComponent},
  {path:'addAddress', component:AddAddressComponent},
  {path:'userProfile', component:UserProfileComponent},
  {path: 'login', component:UserComponent},
  {path: 'listAddress', component:DisplayAddressComponent},
  {path: 'register', component:RegistrationFormComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
