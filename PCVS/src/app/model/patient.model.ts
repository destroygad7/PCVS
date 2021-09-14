import { user } from "./user.model";

export interface patient extends user{
  ID: String;
  IDtype: String;
  phone: number;
  gender: number; //0=female 1=male
  first: boolean; //vaccinated?
  second: boolean;
  vaccinationID: String;
}
