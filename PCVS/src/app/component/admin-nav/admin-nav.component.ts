import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/service/currentuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  showFiller = false;
  constructor(private router:Router, private currentUserService:CurrentUserService) { }

  ngOnInit(): void {
    // if (!this.currentUserService.isAdmin()){
    //   this.router.navigate(['../login']);
    // }
  }

  isLogin() {
    return this.currentUserService.getLoginStatus();
  }

  logout() {
    this.currentUserService.logout();
    console.log("logout");
    return;
  }
}
