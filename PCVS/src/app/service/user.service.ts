import { Injectable } from '@angular/core';
import { user } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  checkPassword(email:String,password:String){
    let user =this.getUserByEmail(email);
    if (user!=undefined){
      if(user.password === password){
        return true;
      }
    }
    return false;
  }

  addAdmin(userID: String,username: String,email: String,password: String,
    name: String,centreID: String, staffID: String, phone:number, gender:number) {
    const user:user  = {
      userID:userID,
      username:username,
      email:email,
      password:password,
      name:name,
      centreID:centreID,
      staffID:staffID,
      ID: '',
      IDtype: '',
      phone: phone,
      gender: gender,
      first: false,
      second: false,
    }
    this.users.push(user);
  }

  addPatient(userID: String,username: String,email: String,
    password: String,name: String,ID: String,IDtype: String,
    phone: number,gender: number,first: boolean,second: boolean){
      const user:user = {
      userID:userID,
      username:username,
      email:email,
      password:password,
      name:name,
      centreID:'',
      staffID:'',
      ID: ID,
      IDtype: IDtype,
      phone: phone,
      gender: gender,
      first: first,
      second: second,
      }
      this.users.push(user);
  }
}
