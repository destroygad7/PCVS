import { Injectable } from '@angular/core';
import {

@Injectable({
  providedIn: 'root'
})
export class CentresService {
  private : [] = [];

  getCentres(){
    return this.;
  }

  addCentre() {
    const :  = {

    }
    this.centres.push(centre);
  }

  getCentreByID(centreID: String){
    let found = this.centres.find(i=>i.centreID === centreID)
  }
}
