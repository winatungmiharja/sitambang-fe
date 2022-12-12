import { Role } from '@/types/api';

export const ROLES: (keyof typeof Role)[] = ['admin', 'employee', 'buyer'];

/**
 * Get Roles in Bahasa Indonesia from ROLES_EN
 *
 * @example GET_ROLES_FROM_EN[role]
 */
export const GET_ROLES_FROM_EN = {
  admin: 'admin',
  employee: 'karyawan',
  buyer: 'pembeli',
} as const;
