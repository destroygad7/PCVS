export interface User{
  userID: String;
  username: String;
  email: String;
  password: String;
  name: String;
  acctype: String;

  centreID: String;
  staffID: String;

  ID: String;
  IDtype: String;
  phone: number;
  gender: number; //0=female 1=male
  first: boolean; //vaccinated?
}
