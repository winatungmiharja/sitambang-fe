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

export interface Stocks {
  id: number;
  name: string;
  totalStocks: number;
  priceStock: number;
}
