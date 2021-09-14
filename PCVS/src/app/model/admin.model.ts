import { user } from "./user.model";

export interface admin extends user{
  centreID: String;
  staffID: String;
}
