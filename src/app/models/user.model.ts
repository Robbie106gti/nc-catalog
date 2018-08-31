export interface User {
  wqData?: WQUser;
  class?: string;
  dealerName?: string;
  displayName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  username?: string;
  dealerID?: string;
  roles?: Roles;
  login?: LastloginWQ;
  address?: Address;
  status?: string;
  image?: string;
  ext?: string;
  position?: string;
}

export interface Roles {
  admin?: boolean;
  nickels?: boolean;
  reader?: boolean;
  writer?: boolean;
  dealer?: boolean;
  sop?: boolean;
  editor?: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postcode: string;
}

export interface LastloginWQ {
  lastLogin: string;
  firstLogin: string;
  dataUpdated: string;
}

export interface WQUser {
  token: string;
  valid: Valid;
  user: User;
}

export interface Valid {
  DealerAddress1: string;
  DealerAddress2: string;
  DealerAddress3: string;
  DealerID: string;
  DealerName: string;
  DealerPostalCode: string;
  DisplayName: string;
  FirstName: string;
  LastName: string;
  UserName: string;
  Email: string;
  Error?: string;
}

export interface Favorites {
  id?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Notes {
  id?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

///// Example get from Webquoin

// tslint:disable-next-line:max-line-length
/*token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJyb2JlcnQiLCJpYXQiOjE1MTY4MzM4MTcsImV4cCI6MTUxNjgzNzQxNywiYXVkIjoiaHR0cHM6Ly9pZGVudGl0eXRvb2xraXQuZ29vZ2xlYXBpcy5jb20vZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1tOGcxZ0BuaWNrZWxzLWNhdGFsb2cuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay1tOGcxZ0BuaWNrZWxzLWNhdGFsb2cuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20ifQ.gvV3YMkouu8jN26kwV_oxzQTrT2HDF0WbVdnol_Iw4KBB7I2Ynf4oxGa1IqB0IM8yi-97cqKNEcJb7S98c8txzqpD-wXpUrqIssKe2erkrrOrNaONZosW20EcoXLKLXHZt7ZMkYmS-0RGgG_yUUy1WYLMgscKva6-LdwlEmcjXvVVmHezurdBNscIOr-GJs3lsIYli7Fs6gy5xcQXtu3tBG4Da99saEHq07Lg43oRY4HgkdpZX3ClftZ6ojCg0EUOTtBcFo1tHCaQ7JHPqTxp3KwiBmjuBeAaqvfuDuYk7hhiNXL9dLxZCl5kd1KBOL-VE3rQAp_bDvMr1W2-mEYQQ"
valid : {
DealerAddress1: "6760 Graybar Rd"
DealerAddress2: "Richmond"
DealerAddress3: "BC"
DealerID: "NICKELSM"
DealerName: "NICKELS CABINETS (MANUFACTURER)"
DealerPostalCode: "V6W1J1"
DisplayName: "Robert                   "
Email: "rob@nickelscabinets.com"
FirstName: "Robert                        "
LastName: "Leeuwerink                    "
UserName: "ROBERT  "
}

class:"NICKELSM"
dealerName:"NICKELS CABINETS (MANUFACTURER)"
displayName:"Robert "
email:"rob@nickelscabinets.com"
firstName:"Robert "
fullName:"Robert Leeuwerink "
lastName:"Leeuwerink "
▶roles:{} 4 keys
username:"ROBERT "

*/
