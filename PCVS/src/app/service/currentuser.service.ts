import { Injectable } from '@angular/core';
import { user } from '../model/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private user:user = {
      userID:'',
      username:'',
      email:'',
      password:'',
      name:'',
      centreID:'',
      staffID:'',
      ID: '',
      IDtype: '',
      phone: 0,
      gender: 0,
      first: false,
      second: false
  };

  constructor(public userservice:UserService){}

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

  getSecond(){
    return this.user.second
  }

  login(email:String,password:String){
    let user = this.userservice.getUserByEmail(email)
    if (!user){
      return 0 //not logged in
    }
    if (user.centreID != ''){
      return 1 //admin
    }
    return 2 //patient
  }
}
