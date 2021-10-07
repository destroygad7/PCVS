import { Component, OnInit } from '@angular/core';
import { VaccineService } from 'src/app/service/vaccine.service';
import { Vaccine } from 'src/app/service/vaccine.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-batch',
  templateUrl: './admin-batch.component.html',
  styleUrls: ['./admin-batch.component.css']
})
export class AdminBatchComponent implements OnInit {

  vaccines:Vaccine[] = [];
  private vaccineSub:Subscription | undefined;
  constructor(public vaccineService:VaccineService) { }

  ngOnInit(): void {
    this.vaccines = this.vaccineService.getVaccines();
     this.vaccineSub = this.vaccineService.getVaccineUpdateListener()
     .subscribe((vaccines:Vaccine[]) => {
       this.vaccines=vaccines;
     });
  }
  ngOnDestroy(){
    this.vaccineSub?.unsubscribe();
  }

  getTotalBatches(vaccine:Vaccine) {
    return this.vaccineService.getTotalBatches(vaccine);
  }
}
