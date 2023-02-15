import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './frontend/user/user.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AddAddressComponent } from './add-address/add-address.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    AddAddressComponent,
    AppComponent,
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
