import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Vaccination } from '../model/vaccination.model';
import { User } from '../model/user.model';
import { CentresService } from './centres.service';
import { VaccineService } from './vaccine.service';
import { HttpClient } from '@angular/common/http';
import { Centre } from '../model/centre.model';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  private vaccinations: Vaccination[] = [];
  private vaccinationUpdated = new Subject<Vaccination[]>();

  constructor(public centreService:CentresService, public vaccineService:VaccineService, private http:HttpClient){}

  getVaccinations(){
    this.http.get<{message: string, vaccinations: any}>('http://localhost:3000/api/vaccinations')
    .pipe(map((vaccinationData) => {
      return vaccinationData.vaccinations.map((vaccination:
        { _id: any; vaccinationID: any; batch: any; centre: any;
          user: any; status: any; Appointdate: any; }) => {
        return {
          id : vaccination._id,
          vaccinationID: vaccination.vaccinationID,
          batch: vaccination.batch,
          centre: vaccination.centre,
          user: vaccination.user,
          status: vaccination.status,
          Appointdate: vaccination.Appointdate
        };
      });
    }))
    .subscribe((Transformedvaccinations)=>{
      this.vaccinations = Transformedvaccinations;
      this.vaccinationUpdated.next([...this.vaccinations]);
    })
  }

  getVaccination(id:string){
    return{...this.vaccinations.find(p=>p.id === id)};
  }

  updateVaccination(updateVac:Vaccination){
    const vaccination :Vaccination= {
      id: updateVac.id,
      vaccinationID: updateVac.vaccinationID,
      batch: updateVac.batch,
      centre: updateVac.centre,
      user: updateVac.user,
      status: updateVac.status,
      Appointdate: updateVac.Appointdate,
    };
    this.http.put('http://localhost:3000/api/vaccinations/'+updateVac.id, vaccination)
    .subscribe(response => console.log(response));
  }

  addVaccinations(vaccinationID: String,
    batchID: String,centreID: String,userID: String, Appointdate: Date,centre: Centre) {
      const vac: Vaccination = {
        id : "",
        vaccinationID: vaccinationID,
        batch: batchID,
        centre: centreID,
        user: userID,
        status: "Pending", //pending approve completed
        Appointdate: Appointdate
      }
      this.http.post<{message:string}>('http://localhost:3000/api/vaccinations',vac)
      .subscribe((responseData)=>{
        console.log(responseData.message);
        this.vaccinations.push(vac);
        this.vaccinationUpdated.next([...this.vaccinations]);
        return;
      })
      this.vaccinations.push(vac);
        //batch.pending+=1;
        this.vaccineService.updateBatchPending(batchID);
      this.vaccinationUpdated.next([...this.vaccinations]);
      return;
  }

  getVaccinationsByCentre(centreID: String){
    let vaccinations = [];
    if (centreID!=""){
      for (let i=0;i<this.vaccinations.length;i++){
            if (this.vaccinations[i].centre===centreID){
              vaccinations.push(this.vaccinations[i]);
            }
          }
        }

    return vaccinations;
  }

  checkUserAppointed(batchID:String,user:User) {
    let appointed = false;
    for (let i=0;i<this.vaccinations.length;i++){
      if (this.vaccinations[i].batch == batchID){
        appointed = true;
      }
    }
    return appointed;
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
    this.updateVaccination(vaccination);
    //vaccination.batch.pending += 1;
    console.log(vaccination.status);
    return;
  }

  completeVaccination(vaccination:Vaccination){
    vaccination.status = "Completed";
    this.updateVaccination(vaccination);
    //vaccination.batch.administered += 1;
    this.vaccineService.updateBatchAdministered(vaccination.batch);
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
