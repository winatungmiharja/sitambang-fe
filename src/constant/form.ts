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
  'Manager',
];

export const toolsCondition: (keyof typeof Condition)[] = [
  'Bagus',
  'Rusak',
  'Sempurna',
];

export const paymentMethodOption = [
  {
    name: 'Bank',
    options: [
      'Bank Mandiri',
      'BRI',
      'BNI',
      'Panin Bank',
      'BCA',
      'CIMB Niaga',
      'Bank Permata',
      'OCBC NISP',
    ],
  },
  {
    name: 'E-Money',
    options: ['Dana', 'Gopay', 'OVO', 'ShopeePay', 'LinkAja'],
  },
];

export const VIEW_STATE = [
  {
    name: 'Proses',
    url: '/transaction/view-pending',
  },
  {
    name: 'Selesai',
    url: '/transaction/view-confirmed',
  },
  { name: 'Dibatalkan', url: '/transaction/view-cancelled' },
];
