import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users:User [] = [];
  private usersUpdated = new Subject<User[]>();

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

  checkUsernameExist(username:String){
    let found=this.users.find(i=>i.username === username);
    if (typeof(found)!="undefined"){
      return true;
    }
    return false;
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
    name: String,centreID: String, staffID: String, phone:number, gender:number,
    acctype: String) {
    const user:User  = {
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
      acctype: "admin"
    }
    this.users.push(user);
    this.usersUpdated.next([...this.users]);
  }

  addPatient(userID: String,username: String,email: String,
    password: String,name: String,ID: String,IDtype: String,
    phone: number,gender: number,first: boolean,
    acctype: String){
      const user:User = {
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
      acctype: "patient"
      }
      this.users.push(user);
      this.usersUpdated.next([...this.users]);
  }

  getPostUpdateListener()
  {
    return this.usersUpdated.asObservable();
  }
}
