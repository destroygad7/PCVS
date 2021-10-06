import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

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

  constructor(public dialog: MatDialog,) { }

  selecteddate: "" | undefined;
  enteredQuantity=0;
  enteredNumber="";

  ngOnInit(): void {
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
      console.log('The dialog was closed');
      this.selecteddate = result;
      console.log(this.selecteddate);
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
  }

}

