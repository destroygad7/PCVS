export interface Batch{
  id: String;
  batchID: String;
  batchNumber: String;
  expiry: Date;
  quantity: number;
  pending: number;
  administered: number;
  centre: String;
  vaccine: String;
}
