import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AgmCoreModule } from '@agm/core';
import { } from '@google/maps';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './component/login/login.component';

import { AppRoutingModule } from './app-routing.module';
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
    MatButtonModule,
    MatProgressBarModule,
    MatTabsModule,
    MatStepperModule,
    MatToolbarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCSQMLteimv75SIbD39HpsDUxrgW6gZ2nY'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
