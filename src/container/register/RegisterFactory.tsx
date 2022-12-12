import React from 'react';

import AdminRegister from './form/AdminRegister';
import BuyerRegister from './form/BuyerRegister';
import EmployeeRegister from './form/EmployeeRegister';

import { Role } from '@/types/api';

export default function RegisterFactory({ role }: { role: keyof typeof Role }) {
  return (
    <div className='max-h-max overflow-y-auto px-2 py-4 space-y-6 w-full rounded-md shadow-inner sm:max-h-[50vh]'>
      {(() => {
        switch (role) {
          case 'admin':
            return <AdminRegister />;
          case 'employee':
            return <EmployeeRegister />;
          case 'buyer':
            return <BuyerRegister />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
