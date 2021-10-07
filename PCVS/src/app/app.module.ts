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
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule, MatDialog,MatDialogRef} from  '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'
import { AddBatchDialogueComponent } from './component/admin-batch-info/admin-batch-info.component';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './component/login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { ClientNavComponent } from './component/client-nav/client-nav.component';
import { ClientHomeComponent } from './component/client-home/client-home.component';
import { ClientVaccineComponent } from './component/client-vaccine/client-vaccine.component';
import { AdminHomeComponent } from './component/admin-home/admin-home.component';
import { AdminNavComponent } from './component/admin-nav/admin-nav.component';
import { AdminBatchComponent } from './component/admin-batch/admin-batch.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminAppointmentComponent} from './component/admin-appointment/admin-appointment.component';
import { AdminBatchInfoComponent } from './component/admin-batch-info/admin-batch-info.component';
// import { ViewPatientDialogComponent } from './component/admin-appointment/admin-appointment.component';
import { RegSuccessDialog } from './component/login/login.component';
import { ClietCentreComponent } from './component/cliet-centre/cliet-centre.component';
import { ClientBatchInfoComponent } from './component/client-batch-info/client-batch-info.component';
import { ClientAppointDialogComponent } from './component/client-batch-info/client-batch-info.component';
import { ClientSuccessSnackBarComponent } from './component/client-batch-info/client-batch-info.component';
import { AdminApprovedSnackBarComponent } from './component/admin-appointment/admin-appointment.component';
import { InvalidLoginSnackbarComponent } from './component/login/login.component';
import { ErrorComponent } from './component/error/error.component';

const appRoutes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'login/:vacname/:centreID',component:LoginComponent},
  {path: '',redirectTo: 'patient/home', pathMatch: 'full' },
  {path: 'admin',redirectTo: 'admin/home', pathMatch: 'full' },
  {path:'admin',component:AdminNavComponent,
    children:[
      {path:'home',component:AdminHomeComponent},
      {path:'vaccine',component:AdminBatchComponent},
      {path:'vaccine/:vacname/batches',component:AdminBatchInfoComponent},
      {path:'appointment',component:AdminAppointmentComponent},
      {path:'appointment/:vacname/:batchID',component:AdminAppointmentComponent}
    ]
  },
  {path:'patient',redirectTo: 'patient/home', pathMatch: 'full' },
  {path:'patient',component:ClientNavComponent,
    children:[
      {path:'home',component:ClientHomeComponent},
      {path:'vaccines',component:ClientVaccineComponent},
      {path:'vaccines/centres/:vacname',component:ClietCentreComponent},
      {path:'vaccines/centres/:vacname/:centreID',component:ClientBatchInfoComponent}
    ]},
  // {path:'error',component:ErrorComponent},
  // {path:'**',redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HeaderComponent,
    ClientNavComponent,
    ClientHomeComponent,
    ClientVaccineComponent,
    AdminHomeComponent,
    AdminNavComponent,
    AdminBatchComponent,
    AdminAppointmentComponent,
    AdminBatchInfoComponent,
    // ViewPatientDialogComponent,
    RegSuccessDialog,
    AddBatchDialogueComponent,
    ClietCentreComponent,
    ClientBatchInfoComponent,
    ClientAppointDialogComponent,
    ClientSuccessSnackBarComponent,
    AdminApprovedSnackBarComponent,
    InvalidLoginSnackbarComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
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
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCSQMLteimv75SIbD39HpsDUxrgW6gZ2nY'}),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
