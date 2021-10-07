import { Centre } from "./centre.model";

export interface Batch{
  batchID: String;
  batchNumber: String;
  expiry: Date;
  quantity: number;
  pending: number;
  administered: number;
  centre: Centre;
}
