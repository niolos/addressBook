import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './frontend/user/user.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { DisplayAddressComponent } from './display-address/display-address.component';
import { RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS, RecaptchaFormsModule } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './footer/footer.component';

import { InterceptInterceptor } from './Services/intercept.interceptor';
import { AuthenticationService } from './Services/authentication.service';

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
    FooterComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    AuthenticationService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptInterceptor,
      multi:true
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


