import { Injectable } from '@angular/core';
import { Batch } from '../model/batch.model';
import { Subject } from 'rxjs';
import { CentresService } from './centres.service';
import { HttpClient } from '@angular/common/http';
import { Centre } from '../model/centre.model';
import { map } from 'rxjs/operators';

export interface Vaccine{
  vaccineName: String;
  manufacturer: String;
}

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  constructor(public centreService: CentresService, private http:HttpClient){}
  private vaccines: Vaccine[] = [
    {vaccineName: "AstraZeneca", manufacturer: "AstraZeneca"},
    {vaccineName: "CanSino", manufacturer: "CanSino Biologics"},
    {vaccineName: "CoronaVac", manufacturer: "Sinovac"},
    {vaccineName: "Johnson & Johnson", manufacturer: "Janssen Pharmaceutical"},
    {vaccineName: "Moderna", manufacturer: "Moderna"},
    {vaccineName: "Pfizer", manufacturer: "BioNTech"},
    {vaccineName: "Sinopharm BBIBP", manufacturer: "Sinopharm"},
  ];
  private batches: Batch[] = [];
  private batchesUpdated = new Subject<Batch[]>();


  getAllBatches(){
    this.http.get<{message: string, batches:any}>('http://localhost:3000/api/batches')
    .pipe(map((batchData)=>{
      return batchData.batches.map((batch:
        { _id: any; batchID: any; batchNumber: any;
          expiry: any; quantity: any; pending: any;
          administered: any; centre: any; vaccine: any; } )=>
          {
        return {
          id: batch._id,
          batchID: batch.batchID,
          batchNumber: batch.batchNumber,
          expiry: batch.expiry,
          quantity: batch.quantity,
          pending: batch.pending,
          administered: batch.administered,
          centre: batch.centre,
          vaccine: batch.vaccine
        }
      })
    }))
    .subscribe((transformedBatches)=>{
      this.batches= transformedBatches;
      this.batchesUpdated.next([...this.batches]);
    })
  }

  getBatch(id: string){
    return{...this.batches.find(p=>p.id===id)};
  }

  updateBatch( updatebatch: Batch){
    const batch: Batch = {
      id: updatebatch.id,
      batchID: updatebatch.batchID,
      batchNumber: updatebatch.batchNumber,
      expiry: updatebatch.expiry,
      quantity: updatebatch.quantity,
      pending: updatebatch.pending,
      administered: updatebatch.administered,
      centre: updatebatch.centre,
      vaccine: updatebatch.vaccine,
    };
    this.http.put('http://localhost:3000/api/batches/'+updatebatch.id, batch)
    .subscribe(response => console.log(response));
  }

  updateBatchPending( batchid:String ){
    let batch = this.getBatchbyID(batchid);
    if (batch!=undefined){
      batch.pending += 1;
      this.updateBatch(batch);
    }
  }

  updateBatchAdministered( batchid:String ){
    let batch = this.getBatchbyID(batchid);
    if (batch!=undefined){
      batch.pending -= 1;
      batch.administered += 1;
      this.updateBatch(batch);
    }
  }

  updateRejectedPending( batchid:String ){
    let batch = this.getBatchbyID(batchid);
    if (batch!=undefined){
      batch.pending -= 1;
      this.updateBatch(batch);
    }
  }

  getVaccines(){
    return this.vaccines;
  }

  getBatchbyID(batchID: String){
    for (let i=0;i<this.batches.length;i++){
      if (this.batches[i].batchID===batchID){
        return this.batches[i];
      }
    }
    return;
  }

  getBatches(vaccineName: String, centreID: String){
    let batches = [];
    if (centreID!=""){
      for (let i=0;i<this.batches.length;i++){
            if (this.batches[i].centre===centreID&&this.batches[i].vaccine===vaccineName){
              batches.push(this.batches[i]);
            }
          }
        }

    return batches;
  }

  getCentresofVaccine(vaccineName: String){
    let centres: Centre[]= [];
    for (let i=0;i<this.batches.length;i++){
      if (this.batches[i].vaccine === vaccineName){
        let centre = this.centreService.getCentreByID(this.batches[i].centre);
        if (centre!=null)
          centres.push(centre);
      }
    }
    return centres;
  }

  addBatches(vaccineName:String, batchID: String,
    batchNumber: String,expiry: Date,quantity: number,centreID: String, vaccine: String) {
      const batch: Batch= {
        id: "",
        batchID: batchID,
        batchNumber: batchNumber,
        expiry: expiry,
        quantity: quantity,
        pending: 0,
        administered: 0,
        centre: centreID,
        vaccine: vaccine
      }
      this.http.post<{message:string}>('http://localhost:3000/api/batches',batch)
      .subscribe((responseData)=>{
        console.log(responseData.message);
        this.batches.push(batch);
        this.batchesUpdated.next([...this.batches]);
        return;
      })
  }

  getAllTotalBatches(vaccine:Vaccine){
    let i = 0;
    for (let i=0;i<this.batches.length;i++){
      if (this.batches[i].vaccine ===vaccine.vaccineName){
        i++;
      }
    }
    return i;
  }

  getTotalBatches(vaccine:Vaccine, centreid:String){
    let i=0;
    for (let o=0;o<this.batches.length;o++){
      if (this.batches[o].centre === centreid&&this.batches[o].vaccine===vaccine.vaccineName){
        i++;
      }
    }
    return i;
  }

  getTotalAvailableBatches(vaccine:Vaccine){
    let i = 0;
    let vacName = vaccine.vaccineName;
    for (let i=0;i<this.batches.length;i++){
      if (this.batches[i].vaccine === vacName){
        i=i+this.batches[i].quantity-this.batches[i].pending-this.batches[i].administered;
      }
    }
    return i;
  }

  getVaccineNamebyBatchID(batchID: String){
    for (let i=0;i<this.batches.length;i++){
      if (this.batches[i].batchID = batchID)
      {
        return this.batches[i].vaccine;
      }
    }
    return;
  }

  getManufacturerbyBatchID(batchID: String){
    for (let i=0;i<this.batches.length;i++){
      if (this.batches[i].batchID = batchID)
      {
        let vacname = this.batches[i].vaccine;
      }
      for (let j=0;j<this.vaccines.length;j++){
        if (this.vaccines[j].vaccineName = this.batches[i].vaccine)
        {
          return this.vaccines[j].manufacturer;
        }
      }
    }
    return;
  }

  hasCentres(centreID: String){
    if (this.batches.find(p=>p.centre===centreID))
      return true;
    return false;
  }

  getVaccineUpdateListener()
  {
    return this.batchesUpdated.asObservable();
  }

}
