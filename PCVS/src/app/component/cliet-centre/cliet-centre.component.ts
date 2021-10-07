import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Centre } from 'src/app/model/centre.model';
import { Subscription } from 'rxjs';
import { VaccineService } from 'src/app/service/vaccine.service';
import { CurrentUserService } from 'src/app/service/currentuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliet-centre',
  templateUrl: './cliet-centre.component.html',
  styleUrls: ['./cliet-centre.component.css']
})
export class ClietCentreComponent implements OnInit {

  vacName="";
  vacCentres:Centre[] = [];
  private centreSub:Subscription | undefined;
  private sub: any;

  constructor(private router:Router, private route: ActivatedRoute,private vaccineService:VaccineService,
    private currentUserService:CurrentUserService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.vacName = params['vacname'];
   });
    this.vacCentres = this.vaccineService.getCentresofVaccine(this.vacName);

  }
  ngOnDestroy(){
    this.centreSub?.unsubscribe();
  }

}
