export interface Vaccination{
  vaccinationID: String;
  batchID: String;
  centreID: String;
  userID: String;
  status: String; //0=pending 1=approve 2=denied 4=completed
  Appointdate: Date;
}
