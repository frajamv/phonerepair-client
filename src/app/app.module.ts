import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ClientlistComponent } from './components/clients/clientlist/clientlist.component';
import { ClientdetailsComponent } from './components/clients/clientdetails/clientdetails.component';
import { RepairinglistComponent } from './components/repairings/repairinglist/repairinglist.component';
import { PhoneCreationFormComponent } from './components/phones/phone-creation-form/phone-creation-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ClientlistComponent,
    ClientdetailsComponent,
    RepairinglistComponent,
    PhoneCreationFormComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
