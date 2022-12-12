import React from 'react';

import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import SelectInput from '@/components/forms/SelectInput';
import TextArea from '@/components/forms/TextArea';

import { genderOption, positionOption } from '@/constant/form';

export default function EmployeeRegister() {
  return (
    <React.Fragment>
      <Input
        id='name'
        label='Nama'
        validation={{ required: 'Nama harus diisi' }}
      />
      <Input
        id='email'
        label='Email'
        validation={{ required: 'Email harus diisi' }}
      />
      <Input
        id='phone_number'
        label='Nomor Telepon'
        helperText='contoh : 081234567890'
        validation={{ required: 'Nomor Telepon harus diisi' }}
      />
      <PasswordInput
        id='password'
        label='Password'
        validation={{ required: 'Password harus diisi' }}
      />
      <SelectInput
        id='gender'
        label='Jenis Kelamin'
        validation={{
          required: 'Jenis Kelamin harus diisi',
        }}
      >
        {genderOption.map((item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </SelectInput>

      <SelectInput
        id='position'
        label='Jabatan'
        validation={{
          required: 'Jabatan harus diisi',
        }}
      >
        {positionOption.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </SelectInput>

      <div className='grid grid-cols-2 gap-4'>
        <DatePicker
          id='date_of_birth'
          label='Tanggal Lahir'
          placeholder='dd/mm/yyyy'
          maxDate={new Date()}
          validation={{ required: 'Tanggal lahir harus diisi' }}
        />
        <Input
          id='place_of_birth'
          label='Tempat Lahir'
          validation={{ required: 'Tempat lahir harus diisi' }}
        />
      </div>
      <TextArea
        id='address'
        label='Alamat'
        validation={{ required: 'Alamat harus diisi' }}
      />
    </React.Fragment>
  );
}
