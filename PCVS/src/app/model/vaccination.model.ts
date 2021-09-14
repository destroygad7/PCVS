export interface vaccination{
  vaccinationID: String;
  vaccineID: String;
  centreID: String;
  userID: String;
  status: number; //0=pending 1=approve 2=denied 4=completed
  date: Date;
  time: number;
}
