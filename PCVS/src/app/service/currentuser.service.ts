import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private user:User;
  private loginstatus:boolean = false;

  constructor(public userservice:UserService){
    this.user ={
      userID:'',
      username:'',
      email:"",
      password:"",
      name:"",
      acctype:"",
      centreID:"",
      staffID:"",
      ID:"",
      IDtype:"",
      phone:0,
      gender:0,
      first:false,
    };
  }

  getUsername() {
    return this.user.username
  }

  getEmail() {
    return this.user.email
  }

  getName(){
    return this.user.email
  }

  getUserID(){
    return this.user.userID
  }

  getPassword(){
    return this.user.password
  }

  getCentreID(){
    return this.user.centreID
  }

  getStaffID(){
    return this.user.staffID
  }

  getID(){
    return this.user.ID
  }

  getIDType(){
    return this.user.IDtype
  }

  getPhone(){
    return this.user.phone
  }

  getGender(){
    return this.user.gender
  }

  getFirst(){
    return this.user.first
  }

  getLoginStatus(){
    return this.loginstatus
  }

  login(email:String,password:String){
    let user = this.userservice.getUserByEmail(email)
    if (user!=undefined){
      if (this.checkPassword(password,user)){
        this.user = user;
        this.loginstatus = true;
        return true;
      }
    }
    return false;
  }

  logout(){
    let user:User ={
      userID:'',
      username:'',
      email:"",
      password:"",
      name:"",
      acctype:"",
      centreID:"",
      staffID:"",
      ID:"",
      IDtype:"",
      phone:0,
      gender:0,
      first:false,
    };
    this.user=user;
    this.loginstatus=false;
    return;
  }

  isAdmin(){
    if (typeof(this.user)!="undefined"){
      if (this.user.acctype ==="admin")
        return true;
      return false;
    }
    return false;
  }

  checkPassword(Password:String, user:User){
    if(user.password === Password){
      return true;
    }
    return false;
  }


  setPassword(password:String){
    this.user.password = password;
    return;
  }

  setPhone(phone:number){
    this.user.phone = phone;
    return;
  }

  setFirst(){
    this.user.first = true;
    return;
  }
}

