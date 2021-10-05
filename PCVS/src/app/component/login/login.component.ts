import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserService } from 'src/app/service/user.service';
import { CurrentUserService } from 'src/app/service/currentuser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inputEmail='';
  page:number;
  hide = true;
  progress=10;
  optionValue:any;



  constructor(public userService:UserService,
    currentUserService:CurrentUserService) {
      this.page=0;
    }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();


  ngOnInit(): void {}

  //form controll
  verifyEmail(form: NgForm) {
    if (form.invalid){console.log("invalid email");return;}
    this.inputEmail = form.value.email;
    let found=this.userService.getUserByEmail(this.inputEmail)
    if (found!=undefined){
      this.page=5;
      return;
    }
    console.log(this.inputEmail);
    this.page=1;
  }

  verifyPatient(form: NgForm){

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
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
