import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { CentresService } from 'src/app/service/centres.service';
import { CurrentUserService } from './service/currentuser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService,CentresService,CurrentUserService]
})
export class AppComponent {
  title = 'PCVS';

  constructor(private userService: UserService) {

  }
}


