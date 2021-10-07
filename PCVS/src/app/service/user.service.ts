import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users:User [] = [
    {
      userID: "1",
      username: "1",
      email: "a@aa.aa",
      password: "111111",
      name: "1myname",
      acctype: "patient",
      centreID: "",
      staffID: "",
      ID: "123123123",
      IDtype: "Type",
      phone: 11111111,
      first: true
    },
    {
      userID: "1",
      username: "1",
      email: "z@zz.zz",
      password: "111111",
      name: "1myname",
      acctype: "admin",
      centreID: "1",
      staffID: "1",
      ID: "",
      IDtype: "",
      phone: 0,
      first: false
    }
  ];
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

  addAdmin(userID: String,username: String,email: String,password: String,
    name: String,centreID: String, staffID: String) {
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
      phone: 0,
      first: false,
      acctype: "admin"
    }
    this.users.push(user);
    this.usersUpdated.next([...this.users]);
  }

  addPatient(userID: String,username: String,email: String,
    password: String,name: String,ID: String,IDtype: String,
    phone: number,first: boolean){
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
      first: first,
      acctype: "patient"
      }
      this.users.push(user);
      this.usersUpdated.next([...this.users]);
  }

  getUserUpdateListener()
  {
    return this.usersUpdated.asObservable();
  }
}
