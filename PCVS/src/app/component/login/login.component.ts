import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserService } from 'src/app/service/user.service';
import { CentresService } from 'src/app/service/centres.service';
import { Centre } from 'src/app/model/centre.model';
import { CurrentUserService } from 'src/app/service/currentuser.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  centres:Centre[] = [];
  users:User[] =[];
  private centreSub:Subscription | undefined;
  private sub: any;
  private userSub:Subscription | undefined;

  durationInMiliSeconds = 3000;
  inputEmail='';inputUser='';inputName='';inputPhone=0;inputIC='';inputICType='';inputPassword='';inputFirstDose=false;inputStaffID='';inputCentreID='';
  page:number;
  placeholderName:String='';
  hide = true;
  progress=10;
  newCentreSelect=new FormControl(false);
  ICoptionValue:any;
  Auth='';centre='';centreID='';vacName='';

  constructor(public userService:UserService, private route:ActivatedRoute,
    public currentUserService:CurrentUserService, public centresService:CentresService,
    private router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar) {
      this.page=0;
    }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();


  ngOnInit(): void {
    this.userService.getUsers();
    this.userSub = this.userService.getUserUpdateListener()
     .subscribe((users:User[]) => {
       this.users=users;
     });
    this.centresService.getCentres();
     this.centreSub = this.centresService.getCentreUpdateListener()
     .subscribe((centres:Centre[]) => {
       this.centres=centres;
     });
     this.sub = this.route.params.subscribe(params => {
         this.centreID = params['centreID'];
         this.vacName = params['vacname'];
      })
  }
  ngOnDestroy(){
    this.userSub?.unsubscribe();
    this.centreSub?.unsubscribe();
  }
  openSnackBar() {
    this._snackBar.openFromComponent(InvalidLoginSnackbarComponent, {
      duration: this.durationInMiliSeconds,
    });
  }

  //form controll
  verifyEmail(form: NgForm) {
    if (form.invalid){console.log("invalid email");return;}
    this.inputEmail = form.value.email;
    let found=this.userService.getUserByEmail(this.inputEmail)
    if (found!=undefined){
      this.placeholderName=found.username;
      this.page=6;
      return;
    }
    this.page=1;
  }

  verifyPatient(form: NgForm){
    if (form.invalid){console.log("invalid patient");return;}
    this.inputUser=form.value.username;
    this.inputPassword=form.value.password;
    this.inputName=form.value.fullname;
    this.inputICType=form.value.type;
    this.inputPhone=form.value.phone;
    if (form.value.ICno!='')
      this.inputIC=form.value.ICno;
    if (form.value.Passport!='')
      this.inputIC=form.value.Passport;
    this.setProgress(90);
    this.page=3;
  }

  verifyAdmin(form:NgForm) {
    if (this.newCentreSelect.value){
      //new centre
      return;
    }
    this.inputCentreID=form.value.centre;
  }

  existingCentre(form: NgForm){
    if (form.invalid){console.log("invalid exist centre");return;}
    this.inputCentreID=form.value.centre;
    this.page=5;
  }

  newCentre(form: NgForm){
    if (form.invalid){console.log("invalid new centre");return;}
    let id = Math.floor(Math.random()*999999).toString( );
    this.centresService.addCentre(id, form.value.centreName,
    form.value.centreAddress,form.value.postcode, form.value.centreState)
    this.inputCentreID=id;
    this.page=5;
  }

  login(form: NgForm){
    if (form.invalid){this.openSnackBar();console.log("invalid login detail");return;}
    this.currentUserService.login(this.inputEmail,form.value.password)
    if (this.currentUserService.getToken() != ""){
      form.reset();
      if (!this.currentUserService.isAdmin()){

        if (this.vacName!=undefined && this.centreID!=undefined){
          this.router.navigate(['/patient/vaccines/centres/',this.vacName,this.centreID]);
          return;
        }
        else {
          this.router.navigate(['/patient/home']);
          return;
        }
      }
      if (this.currentUserService.isAdmin()){
        this.router.navigate(['/admin/home']);

      }
      // this.page=0;
      return;
    }
    this.openSnackBar();
    form.reset();
    return;
  }

  //page manipulation
  public returnToFirst(){ //clear all form data
    this.page=0;
    return;
  }

  public gotoPatientReg():any {
    this.page=2;
    return;
  }

  public gotoAdminReg() {
    this.page=4;
    return;
  }

  public setProgress(number:number) {
    this.progress = number;
  }

  public setFirstDose(bool:boolean){
    this.inputFirstDose = bool;
  }

  public registerPatient() {
    this.userService.addPatient(Math.floor(Math.random()*999999).toString( ),this.inputUser,this.inputEmail,
    this.inputPassword,this.inputName,this.inputIC,this.inputICType,this.inputPhone,
    this.inputFirstDose);
    this.page=0;
    this.dialog.open(RegSuccessDialog);
  }

  regAdmin(form: NgForm){
    if (form.invalid){console.log("invalid admin");return;}
    this.inputUser=form.value.username;
    this.inputPassword=form.value.password;
    this.inputName=form.value.fullname;
    this.inputStaffID=form.value.staffID;
    this.userService.addAdmin(Math.floor(Math.random()*999999).toString( )
    ,this.inputUser,this.inputEmail,this.inputPassword, this.inputName,
    this.inputCentreID,this.inputStaffID)
    this.page=0;
    this.dialog.open(RegSuccessDialog);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'reg-success-dialog',
  templateUrl: './RegSuccessDialog.html',
})
export class RegSuccessDialog {
  constructor(
    public dialogRef: MatDialogRef<RegSuccessDialog>) {}
  onClick(){
    this.dialogRef.close();
  }
}

@Component({
  selector: './invalid-login-snack-bar',
  templateUrl: './invalid-login-snack-bar.html',
  styles: [`
    .snack-bar {
      color: hotpink;
    }
  `],
})
export class InvalidLoginSnackbarComponent {}
