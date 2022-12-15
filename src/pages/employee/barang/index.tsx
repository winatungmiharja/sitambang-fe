import * as React from 'react';
import { HiPlus } from 'react-icons/hi';
import { Cell, Column } from 'react-table';
import useSWR from 'swr';

import useSWRWithToast from '@/hooks/toast/useSWRWithToast';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

import StokAction from '@/container/action/admin/StokAction';
import MenuHeader from '@/container/text/MenuHeader';

import { ApiReturn, Stocks } from '@/types/api';

function IndexPage() {
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
        accessor: (row) => [row.name],
        className: 'capitalize',
        Cell: ({ value: [name] }: Cell<Stocks, [string]>) => (
          <span className='font-semibold text-primary-500'>{name}</span>
        ),
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
          <StokAction data={stock} mutate={mutate} />
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
      <Seo templateTitle='Barang | Karyawan' />
      <MenuHeader headerVariant='barang'>
        <MenuHeader.Heading>Data Informasi Barang</MenuHeader.Heading>
        <MenuHeader.Subheading>
          Berikut ini merupakan daftar informasi barang
        </MenuHeader.Subheading>
        <MenuHeader.ButtonGroup>
          <MenuHeader.ButtonChild href='/employee/barang/create'>
            <span className='hidden sm:block'>Tambah Barang</span>
            <HiPlus size={20} />
          </MenuHeader.ButtonChild>
        </MenuHeader.ButtonGroup>
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

export default withAuth(IndexPage, 'employee');
