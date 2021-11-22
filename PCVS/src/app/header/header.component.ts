import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentUserService } from '../service/currentuser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private currentUserService:CurrentUserService) { }

  ngOnInit(): void {
    this.authListenerSubs = this.currentUserService
    .getAuthStatusListener()
    .subscribe(
      isAuthenticated =>{
        this.userIsAuthenticated = isAuthenticated;
      }
    )
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
