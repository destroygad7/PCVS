import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Batch } from 'src/app/model/batch.model';
import { Centre } from 'src/app/model/centre.model';
import { CentresService } from 'src/app/service/centres.service';
import { VaccineService } from 'src/app/service/vaccine.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {

  batches:Batch[] = [];
  private batchesSub:Subscription | undefined;
  centres:Centre[] = [];
  private centreSub:Subscription | undefined;

  constructor(public vaccineService:VaccineService, public centresService:CentresService) { }

  ngOnInit(): void {
    this.vaccineService.getAllBatches();
    this.batchesSub = this.vaccineService.getVaccineUpdateListener()
     .subscribe((batches:Batch[]) => {
       this.batches=batches;
     });
     this.centresService.getCentres();
     this.centreSub = this.centresService.getCentreUpdateListener()
     .subscribe((centres:Centre[]) => {
       this.centres=centres;
     });
  }

}
