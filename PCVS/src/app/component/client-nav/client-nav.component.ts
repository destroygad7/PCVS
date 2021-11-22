import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/service/currentuser.service';

@Component({
  selector: 'app-client-nav',
  templateUrl: './client-nav.component.html',
  styleUrls: ['./client-nav.component.css']
})
export class ClientNavComponent implements OnInit {

  constructor(private currentUserService:CurrentUserService) { }

  ngOnInit(): void {
  }

  isLogin() {
    return this.currentUserService.getLoginStatus();
  }

  logout() {
    this.currentUserService.logout();
    return;
  }
}
