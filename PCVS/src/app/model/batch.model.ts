export interface Batch{
  vaccineID: String;
  batchNumber: number;
  expiry: Date;
  quantity: number;
  pending: number;
  administered: number;
  centreID: String;
  staffID: String;
}
