import * as React from 'react';
import { Cell, Column } from 'react-table';
import useSWR from 'swr';

import useSWRWithToast from '@/hooks/toast/useSWRWithToast';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

import AddTransactionAction from '@/container/action/admin/AddTransactionAction';
import MenuHeader from '@/container/text/MenuHeader';

import { ApiReturn, Stocks } from '@/types/api';

function CreatePage() {
  const {
    data: apiStocks,
    isLoading,
    mutate,
  } = useSWRWithToast(useSWR<ApiReturn<Stocks[]>>('/stock/view'));

  const stocks: Stocks[] = apiStocks?.data ?? [];
  const columns = React.useMemo<Column<Stocks>[]>(
    () => [
      {
        Header: 'Nama Barang',
        accessor: (row) => row.name,
        className: 'capitalize',
      },
      {
        Header: 'Harga Barang',
        accessor: (row) => row.priceStock,
        className: 'capitalize',
      },
      {
        Header: 'Stok',
        accessor: (row) => row.totalStocks,
        className: 'capitalize w-full',
      },
      {
        Header: 'Aksi',
        accessor: (row) => [row],
        Cell: ({ value: [stock] }: Cell<Stocks, [Stocks]>) => (
          <AddTransactionAction data={stock} mutate={mutate} />
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
      <Seo templateTitle='Create' />
      <MenuHeader headerVariant='transaksi'>
        <MenuHeader.Heading>Tambah Riwayat Transaksi</MenuHeader.Heading>
        <MenuHeader.BackLink href='/admin/transaksi'>
          Kembali
        </MenuHeader.BackLink>
      </MenuHeader>
      <Table
        className='mt-12'
        data={stocks}
        columns={columns}
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default withAuth(CreatePage, 'admin');
