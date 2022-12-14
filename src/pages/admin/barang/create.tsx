import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import axiosClient from '@/lib/axios';
import useLoadingToast from '@/hooks/toast/useLoadingToast';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import ScaleInput from '@/components/forms/ScaleInput';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import MenuHeader from '@/container/text/MenuHeader';

import { Stocks } from '@/types/api';

type CreateStocks = Pick<Stocks, 'name' | 'priceStock' | 'totalStocks'>;

function CreatePage() {
  const router = useRouter();
  const isLoading = useLoadingToast();

  //#region  //*=========== Form ===========
  const methods = useForm<CreateStocks>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== API Calls ===========
  const onSubmit: SubmitHandler<CreateStocks> = (data) => {
    toast.promise(
      axiosClient.post('/stock/create', data).then(() => {
        router.replace('/admin/barang');
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Barang berhasil ditambahkan',
      }
    );
  };
  //#endregion  //*======== API Calls ===========

  return (
    <Layout>
      <Seo templateTitle='Create' />
      <MenuHeader headerVariant='barang'>
        <MenuHeader.Heading>Tambah Barang</MenuHeader.Heading>
        <MenuHeader.BackLink href='/admin/barang'>Kembali</MenuHeader.BackLink>
      </MenuHeader>

      <div className='mt-8'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-row gap-x-12 items-end mt-4'>
              <div className='max-w-sm'>
                <Input
                  label='Nama Barang'
                  id='name'
                  validation={{
                    required: 'Nama Barang baru harus diisi',
                  }}
                />

                <ScaleInput
                  step={1000}
                  range={{ min: 0, max: 1000000 }}
                  unit='Rp'
                  label='Harga'
                  id='priceStock'
                  type='number'
                  validation={{
                    required: 'Harga harus diisi',
                  }}
                />
                <ScaleInput
                  step={1}
                  range={{ min: 0, max: 1000000 }}
                  unit=''
                  label='Stok'
                  id='totalStocks'
                  type='number'
                  validation={{
                    required: 'Stok harus diisi',
                  }}
                />
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
