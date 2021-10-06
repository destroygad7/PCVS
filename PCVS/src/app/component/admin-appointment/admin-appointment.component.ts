import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'}
];


export interface DialogData {
  selecteddate: Date;
}

@Component({
  selector: 'app-admin-appointment',
  templateUrl: './admin-appointment.component.html',
  styleUrls: ['./admin-appointment.component.css']
})
export class AdminAppointmentComponent implements OnInit {

  selecteddate: "" | undefined;
  durationInMiliSeconds = 1000;
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  openAppointDialog(): void {
    const dialogRef = this.dialog.open(AppointDialogComponent, {
      width: '250px',
      data: {selecteddate: this.selecteddate}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.selecteddate = result;
      console.log(this.selecteddate);
    });
  }
  openViewPatienttDialog(): void {
    const dialogRef = this.dialog.open(ViewPatientDialogComponent, {
      width: '800px',
      data: {selecteddate: this.selecteddate}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openSnackBar() {
    this._snackBar.openFromComponent(AdminCompleteSnackBarComponent, {
      duration: this.durationInMiliSeconds,
    });
  }

}

@Component({
  selector: 'admin-appoint-dialog',
  templateUrl: './admin-appoint-dialog.html',
  providers: [
    { provide: MatDialog, useClass: AppointDialogComponent },
  ],

})
export class AppointDialogComponent implements OnInit{

  verify=true;

  constructor(
    public dialogRef: MatDialogRef<AppointDialogComponent>,
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


@Component({
  selector: 'admin-viewpatients-dialog',
  templateUrl: './admin-viewpatients-dialog.html',
  styles: [`
    .patient-table {
      width: 100%;
    }
    .content {
      padding-top: 5px;
      padding-bottom: 10px;
    }
  `],
  providers: [
    { provide: MatDialog, useClass: AppointDialogComponent },
  ],

})
export class ViewPatientDialogComponent{
  constructor(
    public dialogRef: MatDialogRef<AppointDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;

  onNoClick(): void {
    this.dialogRef.close();
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
export class AdminCompleteSnackBarComponent {}
