export enum Role {
  'admin',
  'employee',
  'buyer',
}

export interface ApiReturn<D> {
  message: string;
  data: D;
}

export interface ApiRouteReturn {
  message: string;
  error: string;
}

export interface ApiUserDataReturn<D> {
  message: string;
  data: D;
  role: keyof typeof Role;
  token: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: string;
  place_of_birth: string;
  date_of_birth: Date;
  position: string;
  phone_number: string;
}

export interface Buyer {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

//#region  //*=========== /pondtool ===========
export enum Condition {
  'Sempurna',
  'Bagus',
  'Rusak',
}

export interface Tools {
  id: number;
  name: string;
  employeeID: number;
  condition: keyof typeof Condition;
}
//#endregion  //*======== /pondtool ===========

//#region  //*=========== /stock ===========
export interface Stocks {
  id: number;
  name: string;
  totalStocks: number;
  priceStock: number;
}
//#endregion  //*======== /stock ===========
