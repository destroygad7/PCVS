import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../service/currentuser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private currentUserService:CurrentUserService) { }

  ngOnInit(): void {
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
