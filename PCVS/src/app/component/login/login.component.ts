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


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  centres:Centre[] = [];
  private centreSub:Subscription | undefined;

  inputEmail='';
  inputUser='';
  inputName='';
  inputPhone=0;
  inputIC='';
  inputICType='';
  inputPassword='';
  inputFirstDose=false;
  inputStaffID='';
  inputCentreID='';
  page:number;
  placeholderName:String='';
  hide = true;
  progress=10;
  newCentreSelect=new FormControl(false);
  ICoptionValue:any;
  Auth='';

  centre='';

  constructor(public userService:UserService,
    public currentUserService:CurrentUserService, public centresService:CentresService,
    private router: Router, public dialog: MatDialog) {
      this.page=0;
    }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();


  ngOnInit(): void {
    this.centres = this.centresService.getCentres();
     this.centreSub = this.centresService.getCentreUpdateListener()
     .subscribe((centres:Centre[]) => {
       this.centres=centres;
     });
  }
  ngOnDestroy(){
    this.centreSub?.unsubscribe();
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
    console.log(this.inputEmail);
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
    // console.log(this.inputEmail);
    // console.log(this.inputUser);
    // console.log(this.inputName);
    // console.log(this.inputPassword);
    // console.log(this.inputPhone);
    // console.log(this.inputIC);
    // console.log(this.inputICType);
    this.setProgress(90);
    console.log("go to 3rd page")
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
    console.log(this.inputCentreID);
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
    if (form.invalid){console.log("invalid login detail");return;}
    if (this.currentUserService.login(this.inputEmail,form.value.password)){
      console.log("successful login");
      form.reset();

      console.log(this.currentUserService.getLoginStatus());
      console.log(this.currentUserService.isAdmin());

      this.page=0;
      return;
    }
    console.log("wrong password?");
    form.reset();
    return;
  }

  //page manipulation
  public returnToFirst(){ //clear all form data
    console.log("back to first");
    this.page=0;
    return;
  }

  public gotoPatientReg():any {
    console.log("to patient register");
    this.page=2;
    return;
  }

  public gotoAdminReg() {
    console.log("to admin register");
    this.page=4;
    return;
  }

  public setProgress(number:number) {
    this.progress = number;
  }

  public setFirstDose(bool:boolean){
    this.inputFirstDose = bool;
    console.log(this.inputFirstDose);
    console.log("success first dose data")
  }

  public registerPatient() {
    this.userService.addPatient(Math.floor(Math.random()*999999).toString( ),this.inputUser,this.inputEmail,
    this.inputPassword,this.inputName,this.inputIC,this.inputICType,this.inputPhone,
    this.inputFirstDose);

    console.log("(success register, back to login)");

    this.page=0;
    this.dialog.open(RegSuccessDialog);
  }

  regAdmin(form: NgForm){
    if (form.invalid){console.log("invalid admin");return;}
    this.inputUser=form.value.username;
    this.inputPassword=form.value.password;
    this.inputName=form.value.fullname;
    this.inputStaffID=form.value.staffID;
    console.log(this.inputEmail);
    console.log(this.inputUser);
    console.log(this.inputName);
    console.log(this.inputPassword);
    console.log(this.inputStaffID);

    this.userService.addAdmin(Math.floor(Math.random()*999999).toString( )
    ,this.inputUser,this.inputEmail,this.inputPassword, this.inputName,
    this.inputCentreID,this.inputStaffID)

    console.log("(success register, back to login)");
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
export class RegSuccessDialog {}
