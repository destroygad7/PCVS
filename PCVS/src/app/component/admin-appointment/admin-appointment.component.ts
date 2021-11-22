import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { VaccineService } from 'src/app/service/vaccine.service';
import { VaccinationService } from 'src/app/service/vaccination.service';
import { CurrentUserService } from 'src/app/service/currentuser.service';
import { Vaccination } from 'src/app/model/vaccination.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-appointment',
  templateUrl: './admin-appointment.component.html',
  styleUrls: ['./admin-appointment.component.css']
})
export class AdminAppointmentComponent implements OnInit {

  selecteddate: "" | undefined;
  durationInMiliSeconds = 3000;
  batchID:String="";
  vacName:String="";
  vaccinations:Vaccination[] = [];
  vaccinations_:Vaccination[] = [];
  private vaccinationSub:Subscription | undefined;
  private sub: any;

  constructor(private route: ActivatedRoute, public vaccinationService:VaccinationService,
    public currentUserService:CurrentUserService, public vaccineService:VaccineService,public userService:UserService,
    public dialog: MatDialog, private _snackBar: MatSnackBar, private router:Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.batchID = params['batchID'];
      this.vacName = params['vacname'];
    });
    this.vaccinationService.getVaccinations();
    this.vaccinationSub=this.vaccinationService.getVaccinationUpdateListener()
      .subscribe((vaccinations: Vaccination[])=>{
        this.vaccinations_=vaccinations;
      });
    this.vaccinations = this.vaccinationService.getVaccinationsByCentre(this.currentUserService.getCentreID());
  }
  ngOnDestroy(): void {
    this.vaccinationSub?.unsubscribe();
  }

  getBatch(batchID: String){
    return this.vaccineService.getBatchbyID(batchID);
  }

  getBatchManufacturer(batchID: String){
    return this.vaccineService.getManufacturerbyBatchID(batchID);
  }

  getUser(userID:String){
    return this.userService.getUserByID(userID);
  }

  countAvailable(batchID: String){
    let i=this.getBatch(batchID)?.quantity ?? 0;
    let j= this.getBatch(batchID)?.pending ??0;
    let k= this.getBatch(batchID)?.administered??0
    return i-j-k;
  }

  openCompleteSnackBar() {
    this._snackBar.openFromComponent(AdminCompleteSnackBarComponent, {
      duration: this.durationInMiliSeconds,
    });
  }
  openApprovedSnackBar() {
    this._snackBar.openFromComponent(AdminApprovedSnackBarComponent, {
      duration: this.durationInMiliSeconds,
    });
  }

  onApprove(vacID:String){
    let vac = this.vaccinationService.getVaccinationbyID(vacID);
    if (vac!=undefined){
      this.vaccinationService.approveVaccination(vac);
      this. openApprovedSnackBar();
    };
    this.ngOnInit();
  }

  onComplete(vacID:String){
    let vac = this.vaccinationService.getVaccinationbyID(vacID);
    if (vac!=undefined){
      this.vaccinationService.completeVaccination(vac);
      this.openCompleteSnackBar();
    };
    this.ngOnInit();
  }

  onReject(vac: Vaccination){
    this.vaccinationService.declineVaccination(vac);
    this.ngOnInit();
  }

  getVaccineNamebyBatchID(batchID: String){
    return this.vaccineService.getVaccineNamebyBatchID(batchID);
  }

  getManufacturerbyBatchID(batchID: String){
    return this.vaccineService.getManufacturerbyBatchID(batchID);
  }
}

@Component({
  selector: './admin-complete-snack-bar',
  templateUrl: './admin-complete-snack-bar.html',
  styles: [`
    .snack-bar {
      color: hotpink;
    }
  `],
})
export class AdminCompleteSnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<AdminCompleteSnackBarComponent>){}
}

@Component({
  selector: './admin-approved-snack-bar',
  templateUrl: './admin-approved-snack-bar.html',
  styles: [`
    .snack-bar {
      color: hotpink;
    }
  `],
})
export class AdminApprovedSnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<AdminApprovedSnackBarComponent>){}
}

