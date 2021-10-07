import { Batch } from "./batch.model";
import { User } from "./user.model";
import { Centre } from "./centre.model";

export interface Vaccination{
  vaccinationID: String;
  batch: Batch;
  centre: Centre;
  user: User;
  status: String; //pending approved completed
  Appointdate: Date;
}
