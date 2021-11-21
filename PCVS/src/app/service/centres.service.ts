import { Injectable } from '@angular/core';
import { Centre } from '../model/centre.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CentresService {
  private centres: Centre[] = [
  ]; //set type to post array(model) and assign to empty array
  private centresUpdated = new Subject<Centre[]>();

  constructor(private http: HttpClient) {}

  getCentres(){
    //return this.centres;
    this.http.get<{message: string, centres: Centre[]}>('http://localhost:3000/api/centres')
    .subscribe((centreData)=>{
      this.centres = centreData.centres;
      this.centresUpdated.next([...this.centres]);
    })
  }

  addCentre(centreID: String, centreName: String, centreAddress: String,
    centrePos:number, centreState:String) {
    const centre: Centre = {
      centreID: centreID,
      centreName: centreName,
      centreAddress: centreAddress,
      centrePos: centrePos,
      centreState: centreState,
    }//var storing values

    this.http.post<{message: string}>('http://localhost:3000/api/centres', centre)
    .subscribe((responseData)=>{
      console.log(responseData.message);
      this.centres.push(centre);
      this.centresUpdated.next([...this.centres]);
    })
  }

  getCentreByID(centreID: String){
    console.log(this.centres);
    for (let i=0;i<this.centres.length;i++){

      if (this.centres[i].centreID === centreID)
        return this.centres[i]
    }
    return;
  }

  getCentreIDbyName(name:string,address:string){
    let found = this.centres.find(i=>i.centreName === name&&i.centreAddress===address);
    if (typeof(found) != "undefined")
      return found.centreID;
    return;
  }

  getCentreUpdateListener()
  {
    return this.centresUpdated.asObservable();
  }
}
