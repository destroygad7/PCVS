import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users:User [] = [];
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient){}

  getUsers(){
    // return this.users;
    this.http.get<{message: string, users: User[]}>('http://localhost:3000/api/users')
    .subscribe((userData)=>{
      this.users = userData.users;
      this.usersUpdated.next([...this.users]);
    })
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
    this.http.post<{message:string}>('http://localhost:3000/api/users',user)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.users.push(user);
      this.usersUpdated.next([...this.users]);
    });
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
      this.http.post<{message:string}>('http://localhost:3000/api/users',user)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.users.push(user);
        this.usersUpdated.next([...this.users]);
       });
  }

  getUserByID(userID:String){
    let found=this.users.find(i=>i.userID === userID);
    if (typeof(found)!="undefined"){
      return found;
    }
    return;
  }

  getUserUpdateListener()
  {
    return this.usersUpdated.asObservable();
  }
}
