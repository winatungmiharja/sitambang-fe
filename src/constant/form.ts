import { Condition } from '@/types/api';

export const genderOption = [
  {
    value: 'male',
    name: 'Laki-laki',
  },
  {
    value: 'female',
    name: 'Perempuan',
  },
];

export const positionOption = [
  'Pengurus/Pengawas',
  'Kepala Divisi Usaha',
  'Kepala Divisi Pemasaran',
  'Kepala Divisi Simpan Pinjam',
  'Kepala Divisi Pelatihan',
  'Kepala Divisi Produksi',
  'Manager Keuangan',
  'Manager Informasi Teknologi',
  'Direktur',
];

export const toolsCondition: (keyof typeof Condition)[] = [
  'Bagus',
  'Rusak',
  'Sempurna',
];
