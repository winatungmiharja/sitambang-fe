import * as React from 'react';
import { HiPlus } from 'react-icons/hi';
import { Cell, Column } from 'react-table';
import useSWR from 'swr';

import clsxm from '@/lib/clsxm';
import useSWRWithToast from '@/hooks/toast/useSWRWithToast';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

import { VIEW_STATE } from '@/constant/form';
import ViewTransactionAction from '@/container/action/buyer/ViewTransactionAction';
import MenuHeader from '@/container/text/MenuHeader';

import { ApiReturn, Payment } from '@/types/api';

function IndexPage() {
  const [state, setState] = React.useState(VIEW_STATE[0]);

  const {
    data: ApiTransaction,
    isLoading,
    mutate,
  } = useSWRWithToast(useSWR<ApiReturn<Payment[]>>(state.url));
  const payment: Payment[] = ApiTransaction?.data ?? [];
  const columns = React.useMemo<Column<Payment>[]>(
    () => [
      {
        Header: 'Id',
        accessor: (row) => row.id,
        className: 'capitalize',
      },
      {
        Header: 'Nama Barang',
        accessor: (row) => [row.nameStock],
        className: 'capitalize',
        Cell: ({ value: [name] }: Cell<Payment, [string]>) => (
          <span className='font-semibold text-primary-500'>{name}</span>
        ),
      },
      {
        Header: 'Pembeli',
        accessor: (row) => [row.nameBuyer],
        className: 'capitalize',
        Cell: ({ value: [name] }: Cell<Payment, [string]>) => (
          <span className='font-semibold text-primary-500'>{name}</span>
        ),
      },
      {
        Header: 'Total Pembayaran',
        accessor: (row) => [row.totalPayment],
        className: 'capitalize w-full',
        Cell: ({ value: [total] }: Cell<Payment, [string]>) => (
          <span>Rp {total}</span>
        ),
      },

      {
        Header: 'Aksi',
        accessor: (row) => [row],
        Cell: ({ value: [payment] }: Cell<Payment, [Payment]>) => (
          <ViewTransactionAction data={payment} mutate={mutate} />
        ),
        disableSortBy: true,
        className: 'capitalize',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Layout>
      <Seo templateTitle='Peralatan' />
      <MenuHeader headerVariant='transaksi'>
        <MenuHeader.Heading>Data Transaksi</MenuHeader.Heading>
        <MenuHeader.Subheading>
          Berikut ini merupakan daftar transaksi
        </MenuHeader.Subheading>
        <MenuHeader.ButtonGroup>
          <MenuHeader.ButtonChild href='/admin/transaksi/create'>
            <span className='hidden sm:block'>Tambah Transaksi</span>
            <HiPlus size={20} />
          </MenuHeader.ButtonChild>
        </MenuHeader.ButtonGroup>
      </MenuHeader>
      <div className='grid grid-cols-3'>
        {VIEW_STATE.map((item) => (
          <button
            key={item.name}
            className={clsxm(
              'flex justify-center my-4 py-2 border-b-2 transition-all duration-150',

              item.name === state.name
                ? 'border-primary-500'
                : 'border-transparent hover:bg-gray-50 rounded-md'
            )}
            onClick={() => setState(item)}
          >
            <p>{item.name}</p>
          </button>
        ))}
      </div>

      <Table
        className='mt-12'
        data={payment}
        columns={columns}
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default withAuth(IndexPage, 'admin');
