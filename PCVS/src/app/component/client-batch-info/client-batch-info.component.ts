import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Batch } from 'src/app/model/batch.model';
import { VaccineService } from 'src/app/service/vaccine.service';
import { VaccinationService } from 'src/app/service/vaccination.service';
import { CurrentUserService } from 'src/app/service/currentuser.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vaccine } from 'src/app/service/vaccine.service';
import * as moment from 'moment';
import { Centre } from 'src/app/model/centre.model';
import { CentresService } from 'src/app/service/centres.service';


@Component({
  selector: 'app-client-batch-info',
  templateUrl: './client-batch-info.component.html',
  styleUrls: ['./client-batch-info.component.css']
})
export class ClientBatchInfoComponent implements OnInit {

  batchID:String="";
  centreID:String="";
  vacName:String="";
  batches_:Batch[] = [];
  batches:Batch[] = [];
  vaccines:Vaccine[] = [];
  private batchesSub:Subscription | undefined;
  centres:Centre[] = [];
  private centreSub:Subscription | undefined;
  private sub: any;
  selecteddate: "" | undefined;
  durationInMiliSeconds = 1000;
  constructor(private router:Router,private route: ActivatedRoute, public vaccinationService:VaccinationService,
   public currentUserService:CurrentUserService, public vaccineService:VaccineService, public centresService:CentresService,
   public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.vaccines = this.vaccineService.getVaccines();
    this.sub = this.route.params.subscribe(params => {
      this.centreID = params['centreID'];
      this.vacName = params['vacname'];
    });
    this.vaccineService.getAllBatches();
    this.batchesSub = this.vaccineService.getVaccineUpdateListener()
     .subscribe((batches:Batch[]) => {
       this.batches_=batches;
     });
     this.centresService.getCentres();
     this.centreSub = this.centresService.getCentreUpdateListener()
     .subscribe((centres:Centre[]) => {
       this.centres=centres;
     });
    if (!this.currentUserService.getLoginStatus()){
      this.router.navigate(['../../login',this.vacName,this.centreID])

    }
    this.batches = this.vaccineService.getBatches(this.vacName,this.centreID);
  }
  ngOnDestroy(): void {
    this.batchesSub?.unsubscribe;
    this.centreSub?.unsubscribe;
  }

  displayDate(date:Date){
    return moment(date).format('DD/MM/YYYY');
  }

  checkAppointed(batchID:String) {
    return !(!this.vaccinationService.checkUserAppointed(batchID,this.currentUserService.getUser())&&this.vaccinationService.checkAvailable(batchID));
  }

  openAppointDialog( batchID:String
  ): void {
    this.batchID=batchID;
    const dialogRef = this.dialog.open(ClientAppointDialogComponent, {
      width: '250px',
      data: {selecteddate: this.selecteddate}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selecteddate = result.selecteddate;
      let centre = this.centresService.getCentreByID(this.centreID);
      if (this.selecteddate!=undefined&&centre!=undefined){
        let date= new Date(this.selecteddate);
        this.vaccinationService.addVaccinations(
          Math.floor(Math.random()*999999).toString( ),
          this.batchID, this.centreID, this.currentUserService.getUserID(),
          date, centre
        );
        this.openSnackBar();
      }
    });
  }
  openSnackBar() {
    this._snackBar.openFromComponent(ClientSuccessSnackBarComponent, {
      duration: this.durationInMiliSeconds,
    });
  }



}

export interface DialogData {
  selecteddate: Date;
}

@Component({
  selector: 'client-appoint-dialog',
  templateUrl: './client-appoint-dialog.html',
  providers: [
    { provide: MatDialog, useClass: ClientAppointDialogComponent },
  ],

})
export class ClientAppointDialogComponent implements OnInit{

  verify=true;

  constructor(
    public dialogRef: MatDialogRef<ClientAppointDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    let date: Date = new Date()
    if(event.value!=undefined){
      if (date>event.value){
        this.verify = true;
        return;
      }
      this.verify = false;
      return}
    this.verify = true;
  }
  ngOnInit() {
  }
}


@Component({
  selector: './client-success-snack',
  templateUrl: './client-success-snack.html',
  styles: [`
    .snack-bar {
      color: hotpink;
    }
  `],
})
export class ClientSuccessSnackBarComponent {}
