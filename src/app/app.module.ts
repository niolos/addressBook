import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './frontend/user/user.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { DisplayAddressComponent } from './display-address/display-address.component';
import { RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    AddAddressComponent,
    AppComponent,
    AppComponent,
    UserComponent,
    RegistrationFormComponent,
    UserComponent,
    UserProfileComponent,
    DisplayAddressComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaModule,
  ],
  providers: [
    // {
    //   provide: RECAPTCHA_SETTINGS,
    //   useValue: {
    //     siteKey: environment.recaptcha.siteKey,
    //   } as RecaptchaSettings,
    // },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


