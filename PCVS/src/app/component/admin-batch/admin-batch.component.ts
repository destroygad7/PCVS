import { Component, OnInit } from '@angular/core';
import { VaccineService } from 'src/app/service/vaccine.service';
import { Vaccine } from 'src/app/service/vaccine.service';
import { Subscription } from 'rxjs';
import { CurrentUserService } from 'src/app/service/currentuser.service';
import { Batch } from 'src/app/model/batch.model';

@Component({
  selector: 'app-admin-batch',
  templateUrl: './admin-batch.component.html',
  styleUrls: ['./admin-batch.component.css']
})
export class AdminBatchComponent implements OnInit {

  batches:Batch[] = [];
  vaccines:Vaccine[] = [];
  private batchSub:Subscription | undefined;
  constructor(public vaccineService:VaccineService,
    public currentUserService:CurrentUserService) { }

  ngOnInit(): void {
    this.vaccines = this.vaccineService.getVaccines();
    this.vaccineService.getAllBatches();
    this.batchSub = this.vaccineService.getVaccineUpdateListener()
     .subscribe((batches:Batch[]) => {
       this.batches=batches;
     });
  }
  ngOnDestroy(){
    this.batchSub?.unsubscribe();
  }

  getTotalBatches(vaccine:Vaccine) {
    return this.vaccineService.getTotalBatches(vaccine,this.currentUserService.getCentreID());
  }
}
