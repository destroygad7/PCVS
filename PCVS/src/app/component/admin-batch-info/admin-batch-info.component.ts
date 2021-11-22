import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { Batch } from 'src/app/model/batch.model';
import { VaccineService } from 'src/app/service/vaccine.service';
import { VaccinationService } from 'src/app/service/vaccination.service';
import { CurrentUserService } from 'src/app/service/currentuser.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vaccine } from 'src/app/service/vaccine.service';
import * as moment from 'moment';


export interface DialogData {
  enteredNumber: String;
  selecteddate: Date;
  enteredQuantity: number;
}

@Component({
  selector: 'app-admin-batch-info',
  templateUrl: './admin-batch-info.component.html',
  styleUrls: ['./admin-batch-info.component.css']
})
export class AdminBatchInfoComponent implements OnInit {

  constructor(private router:Router,private route: ActivatedRoute, public vaccinationService:VaccinationService,
    public currentUserService:CurrentUserService, public vaccineService:VaccineService,
    public dialog: MatDialog) {}

  selecteddate: "" | undefined;
  enteredQuantity=0;
  enteredNumber="";
  batchID:String="";
  vacName:String="";
  batches_:Batch[] = [];
  batches:Batch[] = [];
  vaccines:Vaccine[] = [];
  private batchSub:Subscription | undefined;
  private sub: any;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.vacName = params['vacname'];
    });
    this.vaccines = this.vaccineService.getVaccines();
    this.vaccineService.getAllBatches();
    this.batchSub = this.vaccineService.getVaccineUpdateListener()
     .subscribe((batches:Batch[]) => {
       this.batches_=batches;
     });
    this.batches = this.vaccineService.getBatches(this.vacName,this.currentUserService.getCentreID());
  }
  ngOnDestroy(): void {
    this.batchSub?.unsubscribe;
  }

  displayDate(date:Date){
    return moment(date).format('DD/MM/YYYY');
  }

  openAddBatchDialog(): void {
    const dialogRef = this.dialog.open(AddBatchDialogueComponent, {
      width: '250px',
      data: {
        selecteddate: this.selecteddate,
        enteredNumber: this.enteredNumber,
        enteredQuantity: this.enteredQuantity}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined){
        this.enteredNumber = result.enteredNumber;
        this.enteredQuantity = result.enteredQuantity;
        this.selecteddate = result.selecteddate;
        if (this.selecteddate!=undefined){
          let date = new Date(this.selecteddate);
          this.vaccineService.addBatches(this.vacName, Math.floor(Math.random()*999999).toString( ),
          this.enteredNumber,date,this.enteredQuantity,
          this.currentUserService.getCentreID(), this.vacName);
          this.ngOnInit();
          return;
        }
      }
    });
  }
}

@Component({
  selector: './add-batch-dialogue',
  templateUrl: './add-batch-dialogue.html',
  providers: [
    { provide: MatDialog, useClass: AddBatchDialogueComponent },
  ],

})
export class AddBatchDialogueComponent implements OnInit{

  verify=true;

  constructor(
    public dialogRef: MatDialogRef<AddBatchDialogueComponent>,
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

