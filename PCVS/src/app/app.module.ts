import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './component/login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { LoginSelectComponent } from './component/login-select/login-select.component';
import { LoginPasswordComponent } from './component/login-password/login-password.component';
import { RegisterAdminComponent } from './component/register-admin/register-admin.component';
import { RegisterClientComponent } from './component/register-client/register-client.component';
import { RegisterSelectComponent } from './component/register-select/register-select.component';
import { ClientNavComponent } from './component/client-nav/client-nav.component';
import { ClientHomeComponent } from './component/client-home/client-home.component';
import { ClientVaccineComponent } from './component/client-vaccine/client-vaccine.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LoginSelectComponent,
    LoginPasswordComponent,
    RegisterAdminComponent,
    RegisterClientComponent,
    RegisterSelectComponent,
    ClientNavComponent,
    ClientHomeComponent,
    ClientVaccineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
