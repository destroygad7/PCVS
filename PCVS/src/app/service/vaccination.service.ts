import { Injectable } from '@angular/core';
import { Batch } from '../model/batch.model';
import { Subject } from 'rxjs';
import { Vaccination } from '../model/vaccination.model';
import { User } from '../model/user.model';
import { CentresService } from './centres.service';
import { VaccineService } from './vaccine.service';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  private vaccinations: Vaccination[] = [
    {
      vaccinationID: "2",
        batch: {
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
            centreState: "stateeee"
          }
        },
        centre: {
          centreID: "1",
          centreName: "aname",
          centreAddress: "address",
          centrePos: 12345,
          centreState: "stateeee"},
        user: {
          userID: "1",
      username: "1",
      email: "a@aa.aa",
      password: "111111",
      name: "1myname",
      acctype: "Patient",
      centreID: "",
      staffID: "",
      ID: "123123123",
      IDtype: "Type",
      phone: 11111111,
      first: true
        },
    status: "Pending",
    Appointdate: new Date()
    },
    {
      vaccinationID: "3",
        batch: {
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
            centreState: "stateeee"
          }
        },
        centre: {
          centreID: "1",
          centreName: "aname",
          centreAddress: "address",
          centrePos: 12345,
          centreState: "stateeee"},
        user: {
          userID: "1",
      username: "1",
      email: "a@aa.aa",
      password: "111111",
      name: "1myname",
      acctype: "Patient",
      centreID: "",
      staffID: "",
      ID: "123123123",
      IDtype: "Type",
      phone: 11111111,
      first: true
        },
    status: "Approved",
    Appointdate: new Date()
    },
    {
      vaccinationID: "1",
        batch: {
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
            centreState: "stateeee"
          }
        },
        centre: {
          centreID: "1",
          centreName: "aname",
          centreAddress: "address",
          centrePos: 12345,
          centreState: "stateeee"},
        user: {
          userID: "1",
      username: "1",
      email: "a@aa.aa",
      password: "111111",
      name: "1myname",
      acctype: "Patient",
      centreID: "",
      staffID: "",
      ID: "123123123",
      IDtype: "Type",
      phone: 11111111,
      first: true
        },
    status: "Completed",
    Appointdate: new Date()
    }
  ];
  private vaccinationUpdated = new Subject<Vaccination[]>();

  constructor(public centreService:CentresService, public vaccineService:VaccineService){}

  getVaccinations(){
    return this.vaccinations;
  }

  addVaccinations(vaccinationID: String,
    batchID: String,centreID: String,user: User, Appointdate: Date) {
    let batch = this.vaccineService.getBatchbyID(batchID);
    let centre = this.centreService.getCentreByID(centreID);
    if (batch!=undefined&&centre!=undefined){
      const vac: Vaccination = {
        vaccinationID: vaccinationID,
        batch: batch,
        centre: centre,
        user: user,
        status: "Pending", //pending approve completed
        Appointdate: Appointdate
      }
      this.vaccinations.push(vac);
      console.log("added appointment");
      this.vaccinationUpdated.next([...this.vaccinations]);
      return;
    }
    return;
  }

  checkUserAppointed(batchID:String,user:User) {
    let found = this.vaccinations.find(i=>i.batch.batchID=batchID)
      if (found!=undefined&&found.user.userID==user.userID){
        return true;
      }
    return false;
  }

  checkAvailable(batchID:String){
    let batch = this.vaccineService.getBatchbyID(batchID);
    if (batch!=undefined){
      let i=batch.quantity-batch.pending-batch.administered;
      if (i<1){
        return false;
      }
      let now = new Date();
      if (now > batch.expiry){
        return false;
      }
      return true;
    }
    return true;
  }

  approveVaccination(vaccination:Vaccination){
    vaccination.status = "Approved";
    vaccination.batch.pending += 1;
    console.log(vaccination.status);
    return;
  }

  completeVaccination(vaccination:Vaccination){
    vaccination.status = "Completed";
    vaccination.batch.administered += 1;
    console.log(vaccination.status);
    return;
  }

  declineVaccination(vaccination:Vaccination){
  }

  getVaccinationbyID(vaccinationID: String){
    let found = this.vaccinations.find(i=>i.vaccinationID === vaccinationID);
    return found;
  }


  getVaccinationUpdateListener()
  {
    return this.vaccinationUpdated.asObservable();
  }
}
