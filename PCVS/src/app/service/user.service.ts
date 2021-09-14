import { Injectable } from '@angular/core';
import { admin } from '../model/admin.model';
import { user } from '../model/user.model';
import { patient } from '../model/patient.model';

@Injectable({
  providedIn: 'root'
})
export class CentresService {
  private users:user [] = [];

  getUsers(){
    return this.users;
  }

  getUserByEmail(email:String){
    let found=this.users.find(i=>i.email === email);
    if (typeof(found)!="undefined"){
      return found;
    }
    return;
  }

  isAdmin(user:user){
    user.hasOwnProperty("staffID");
  }

  addAdmin(userID: String,username: String,email: String,password: String,
    name: String,centreID: String, staffID: String) {
    const admin:admin  = {
      userID:userID,
      username:username,
      email:email,
      password:password,
      name:name,
      centreID:centreID,
      staffID:staffID
    }
    this.users.push(admin);
  }

  //getAdminByID(: String){
  //  let found = this.admins.find(i=>i === centreID)
  //  return
  //}


}
