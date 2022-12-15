import * as React from 'react';
import { Cell, Column } from 'react-table';
import useSWR from 'swr';

import clsxm from '@/lib/clsxm';
import useSWRWithToast from '@/hooks/toast/useSWRWithToast';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

import PeralatanAction from '@/container/action/admin/PeralatanAction';
import MenuHeader from '@/container/text/MenuHeader';

import { ApiReturn, Condition, Tools } from '@/types/api';

function IndexPage() {
  const {
    data: apiTools,
    isLoading,
    mutate,
  } = useSWRWithToast(useSWR<ApiReturn<Tools[]>>('/pondtool/view'));

  const tools: Tools[] = apiTools?.data ?? [];
  const columns = React.useMemo<Column<Tools>[]>(
    () => [
      {
        Header: 'Nama Alat',
        accessor: (row) => [row.name],
        className: 'capitalize',
        Cell: ({ value: [name] }: Cell<Tools, [string]>) => (
          <span className='font-semibold text-primary-500'>{name}</span>
        ),
      },
      {
        Header: 'Penanggung Jawab Terakhir',
        accessor: (row) => row.nameEmployee,
        className: 'capitalize w-full',
      },
      {
        Header: 'Kondisi',
        accessor: (row) => [row.condition],
        Cell: ({
          value: [condition],
        }: Cell<Tools, [keyof typeof Condition]>) => (
          <span
            className={clsxm(
              'px-4 py-1 rounded-full text-xs font-semibold tracking-wide',
              [
                condition === 'Bagus' && 'bg-yellow-100 ',
                condition === 'Rusak' && 'bg-red-100 ',
                condition === 'Sempurna' && 'bg-green-100 ',
              ]
            )}
          >
            {condition}
          </span>
        ),
      },
      {
        Header: 'Aksi',
        accessor: (row) => [row],
        Cell: ({ value: [tools] }: Cell<Tools, [Tools]>) => (
          <PeralatanAction data={tools} mutate={mutate} />
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
      <Seo templateTitle='Peralatan | Karyawan' />
      <MenuHeader headerVariant='peralatan'>
        <MenuHeader.Heading>Data Peralatan Tambak</MenuHeader.Heading>
        <MenuHeader.Subheading>
          Berikut ini merupakan daftar peralatan tambak
        </MenuHeader.Subheading>
      </MenuHeader>
      <Table
        className='mt-12'
        data={tools}
        columns={columns}
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default withAuth(IndexPage, 'employee');
