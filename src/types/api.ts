export enum Role {
  'admin',
  'employee',
  'buyer',
}

export interface ApiReturn<D> {
  message: string;
  data: D;
}

export interface ApiUserDataReturn<D> {
  message: string;
  data: D;
  role: keyof typeof Role;
  token: string;
}
