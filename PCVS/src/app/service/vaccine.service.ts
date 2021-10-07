import { Injectable } from '@angular/core';
import { Batch } from '../model/batch.model';
import { Subject } from 'rxjs';
import { CentresService } from './centres.service';

export interface Vaccine{
  batches :Batch[];
  vaccineName: String;
  manufacturer: String;
}

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  constructor(public centreService: CentresService){}
  private vaccines: Vaccine[] = [
    {batches:[{
      batchID: "thisID",
      batchNumber: "N123",
      expiry: new Date("2019-01-16"),
      quantity:5,
      pending:1,
      administered:2,
      centre: {centreID: "1",
        centreName: "aname",
        centreAddress: "address",
        centrePos: 12345,
        centreState: "stateeee"},
    },{
      batchID: "myID",
      batchNumber: "N22",
      expiry: new Date("2022-01-16"),
      quantity:10,
      pending:5,
      administered:2,
      centre: {centreID: "1",
        centreName: "aname",
        centreAddress: "address",
        centrePos: 12345,
        centreState: "stateeee"}},]
    ,vaccineName:"AZ",manufacturer:"me"},
  ];

  private vaccinesUpdated = new Subject<Vaccine[]>();

  getVaccines(){
    return this.vaccines;
  }

  getBatchbyID(batchID: String){
    for (let i=0;i<this.vaccines.length;i++){
      for (let j=0;j<this.vaccines[i].batches.length;j++){
        if (this.vaccines[i].batches[j].batchID===batchID){
          return this.vaccines[i].batches[j];
        }
      }
    }
    return;
  }

  getBatches(vaccineName: String, centreID: String){
    let batches = [];
    for (let i=0;i<this.vaccines.length;i++){
      if (this.vaccines[i].vaccineName==vaccineName){
        for (let j=0;j<this.vaccines[i].batches.length;j++){
          if (this.vaccines[i].batches[j].centre.centreID === centreID){
            batches.push(this.vaccines[i].batches[j]);
          }
        }
      }
    }
    return batches;
  }

  getCentresofVaccine(vaccineName: String){
    let centres = [];
    for (let i=0;i<this.vaccines.length;i++){
      for (let j=0;j<this.vaccines[i].batches.length;j++){
        centres.push(this.vaccines[i].batches[j].centre);
      }
    }
    return centres;
  }

  addBatches(vaccineName:String, batchID: String,
    batchNumber: String,expiry: Date,quantity: number,centreID: String) {
    let centre = this.centreService.getCentreByID(centreID);
    if (centre!=undefined){
      const batch: Batch= {
        batchID: batchID,
        batchNumber: batchNumber,
        expiry: expiry,
        quantity: quantity,
        pending: 0,
        administered: 0,
        centre: centre
      }
      let find = this.vaccines.find(x=>x.vaccineName===vaccineName)?.batches;
      if (find!=undefined){
        find.push(batch);
        console.log("added batch");
        this.vaccinesUpdated.next([...this.vaccines]);
        return;
      }
      console.log("vaccine not found");return;
    }
    console.log("centre not found");
    return;
  }

  getTotalBatches(vaccine:Vaccine){
    if (vaccine!=undefined){
      return vaccine.batches.length;
    }
    return 0;
  }

  getTotalAvailableBatches(vaccine:Vaccine){
    let i=0;
    if (vaccine!=undefined){
      for (let o=0;o<vaccine.batches.length;o++){
        i=i+vaccine.batches[o].quantity
        -vaccine.batches[o].pending-vaccine.batches[o].administered;
      }
    }
    return i;
  }

  getVaccineNamebyBatchID(batchID: String){
    for (let i=0;i<this.vaccines.length;i++){
      for (let j=0;j<this.vaccines[i].batches.length;j++){
        if (this.vaccines[i].batches[j].batchID = batchID)
          return this.vaccines[i].vaccineName;
      }
    }
    return;
  }

  getManufacturerbyBatchID(batchID: String){
    for (let i=0;i<this.vaccines.length;i++){
      for (let j=0;j<this.vaccines[i].batches.length;j++){
        if (this.vaccines[i].batches[j].batchID = batchID)
          return this.vaccines[i].manufacturer;
      }
    }
    return;
  }

  getVaccineUpdateListener()
  {
    return this.vaccinesUpdated.asObservable();
  }

}
