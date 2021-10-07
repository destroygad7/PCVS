import { Injectable } from '@angular/core';
import { Centre } from '../model/centre.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentresService {
  private centres: Centre[] = [{
    centreID: "1",
        centreName: "aname",
        centreAddress: "address",
        centrePos: 12345,
        centreState: "stateeee"
  }]; //set type to post array(model) and assign to empty array
  private centresUpdated = new Subject<Centre[]>();

  getCentres(){
    return this.centres; //creating new array by copying old array
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
    this.centres.push(centre);//push the new post into posts array
    this.centresUpdated.next([...this.centres]);
  }

  getCentreByID(centreID: String){
    let found = this.centres.find(i=>i.centreID === centreID);
    if (typeof(found) != "undefined")
    return found;
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
