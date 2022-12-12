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
