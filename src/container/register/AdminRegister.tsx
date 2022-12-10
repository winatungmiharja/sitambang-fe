import React from 'react';

import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';

export default function AdminLogin() {
  return (
    <React.Fragment>
      <Input
        id='email'
        label='Email'
        validation={{ required: 'Email harus diisi' }}
      />

      <PasswordInput
        id='password'
        label='Password'
        validation={{ required: 'Password harus diisi' }}
      />
    </React.Fragment>
  );
}
