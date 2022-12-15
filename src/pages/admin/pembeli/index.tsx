import * as React from 'react';
import { Cell, Column } from 'react-table';
import useSWR from 'swr';

import useSWRWithToast from '@/hooks/toast/useSWRWithToast';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

import BuyerAction from '@/container/action/admin/BuyerAction';
import MenuHeader from '@/container/text/MenuHeader';

import { ApiReturn, Buyer } from '@/types/api';

function IndexPage() {
  const {
    data: apiBuyer,
    isLoading,
    mutate,
  } = useSWRWithToast(useSWR<ApiReturn<Buyer[]>>('/buyer/view'));

  const buyer: Buyer[] = apiBuyer?.data ?? [];
  const columns = React.useMemo<Column<Buyer>[]>(
    () => [
      {
        Header: 'Nama',
        accessor: (row) => [row.name],
        className: 'capitalize',
        Cell: ({ value: [name] }: Cell<Buyer, [string]>) => (
          <span className='font-semibold text-primary-500'>{name}</span>
        ),
      },

      {
        Header: 'Email',
        accessor: (row) => row.email,
      },
      {
        Header: 'Telp',
        accessor: (row) => row.phone_number,
        className: 'capitalize w-full',
      },
      {
        Header: 'Aksi',
        accessor: (row) => [row],
        Cell: ({ value: [buyer] }: Cell<Buyer, [Buyer]>) => (
          <BuyerAction data={buyer} mutate={mutate} />
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
      <MenuHeader headerVariant='pembeli'>
        <MenuHeader.Heading>Data Pembeli</MenuHeader.Heading>
        <MenuHeader.Subheading>
          Berikut ini merupakan daftar pembeli
        </MenuHeader.Subheading>
      </MenuHeader>
      <Table
        className='mt-12'
        data={buyer}
        columns={columns}
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default withAuth(IndexPage, 'admin');
