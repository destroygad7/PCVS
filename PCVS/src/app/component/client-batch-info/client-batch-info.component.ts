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

@Component({
  selector: 'app-client-batch-info',
  templateUrl: './client-batch-info.component.html',
  styleUrls: ['./client-batch-info.component.css']
})
export class ClientBatchInfoComponent implements OnInit {

  batchID:String="";
  centreID:String="";
  vacName:String="";
  batches:Batch[] = [];
  private sub: any;
  selecteddate: "" | undefined;
  durationInMiliSeconds = 1000;
  constructor(private router:Router,private route: ActivatedRoute, public vaccinationService:VaccinationService,
   public currentUserService:CurrentUserService, public vaccineService:VaccineService,
   public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.centreID = params['centreID'];
      this.vacName = params['vacname'];
    });
    this.batches = this.vaccineService.getBatches(this.vacName,this.centreID);
    if (!this.currentUserService.getLoginStatus()){
      this.router.navigate(['../../login',this.vacName,this.centreID])

    }
  }

  checkAppointed(batchID:String) {
    return this.vaccinationService.checkUserAppointed(batchID,this.currentUserService.getUser())||
    !this.vaccinationService.checkAvailable(batchID);
  }

  openAppointDialog( batchID:String
  ): void {
    this.batchID=batchID;
    const dialogRef = this.dialog.open(ClientAppointDialogComponent, {
      width: '250px',
      data: {selecteddate: this.selecteddate}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.selecteddate = result;
      console.log(this.selecteddate);
      if (this.selecteddate!=undefined){
        let date= new Date(this.selecteddate);
        console.log(date);
        this.vaccinationService.addVaccinations(
          Math.floor(Math.random()*999999).toString( ),
          this.batchID, this.centreID, this.currentUserService.getUser(),
          date
        );
        this.openSnackBar();
        console.log("registered appointment");
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
    console.log(`${type}: ${event.value}`);
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
    console.log(this.data.selecteddate)
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
