import { Injectable } from '@angular/core';
import { centre } from '../model/centre.model';

@Injectable({
  providedIn: 'root'
})
export class CentresService {
  private centres: centre[] = []; //set type to post array(model) and assign to empty array

  getCentres(){
    return this.centres; //creating new array by copying old array
  }

  addCentre(centreID: String, centreName: String, centreAddress: String) {
    const centre: centre = {
      centreID: centreID,
      centreName: centreName,
      centreAddress: centreAddress
    }//var storing values
    this.centres.push(centre);//push the new post into posts array
  }

  getCentreByID(centreID: String){
    let found = this.centres.find(i=>i.centreID === centreID);
    if (typeof(found) != "undefined")
    return found;
    return;
  }
}
