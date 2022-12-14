import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import axiosClient from '@/lib/axios';
import useLoadingToast from '@/hooks/toast/useLoadingToast';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { toolsCondition } from '@/constant/form';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import MenuHeader from '@/container/text/MenuHeader';

import { ApiReturn, Employee, Tools } from '@/types/api';

type CreateTools = Pick<Tools, 'name' | 'condition' | 'idEmployee'>;

function CreatePage() {
  const router = useRouter();
  const isLoading = useLoadingToast();

  const { data: apiEmployee } = useSWR<ApiReturn<Employee[]>>('/employee/view');
  const employees: Employee[] = apiEmployee?.data ?? [];

  //#region  //*=========== Form ===========
  const methods = useForm<CreateTools>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== API Calls ===========
  const onSubmit: SubmitHandler<CreateTools> = (data) => {
    toast.promise(
      axiosClient.post('/pondtool/create', data).then(() => {
        router.replace('/admin/peralatan');
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Peralatan berhasil ditambahkan',
      }
    );
  };
  //#endregion  //*======== API Calls ===========

  return (
    <Layout>
      <Seo templateTitle='Create' />
      <MenuHeader headerVariant='peralatan'>
        <MenuHeader.Heading>Tambah Peralatan Tambak</MenuHeader.Heading>
        <MenuHeader.BackLink href='/admin/peralatan'>
          Kembali
        </MenuHeader.BackLink>
      </MenuHeader>

      <div className='mt-8'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-row gap-x-12 items-end mt-4'>
              <div className='space-y-6 max-w-sm'>
                <Input
                  label='Nama Peralatan'
                  placeholder='Isikan Nama Peralatan'
                  id='name'
                  validation={{
                    required: 'Nama Peralatan baru harus diisi',
                  }}
                />
                <SelectInput
                  id='condition'
                  label='Kondisi'
                  validation={{
                    required: 'Kondisi harus diisi',
                  }}
                >
                  {toolsCondition.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </SelectInput>
                <SelectInput
                  id='idEmployee'
                  label='Penanggung Jawab'
                  validation={{
                    required: 'Penanggung Jawab harus diisi',
                  }}
                >
                  {employees.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </SelectInput>
              </div>
            </div>
            <hr className='mt-4' />
            <div className='mt-4 space-x-2'>
              <Button
                disabled={isLoading}
                onClick={() => router.replace('/admin/barang')}
                type='button'
                variant='light'
              >
                Batal
              </Button>{' '}
              <Button isLoading={isLoading} type='submit'>
                Tambah
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Layout>
  );
}

export default withAuth(CreatePage, 'admin');
