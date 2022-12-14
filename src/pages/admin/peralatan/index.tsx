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

import PeralatanAction from '@/container/action/PeralatanAction';
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
        accessor: (row) => row.name,
        className: 'capitalize',
      },
      {
        Header: 'Penanggung Jawab Terakhir',
        accessor: (row) => row.employeeID,
        className: 'capitalize w-full',
      },
      {
        Header: 'Kondisi',
        accessor: (row) => [row.condition],
        Cell: ({
          value: [condition],
        }: Cell<Tools, [keyof typeof Condition]>) => (
          <span
            className={clsxm('px-4 py-1 rounded-full text-xs font-semibold', [
              condition === 'Bagus' && 'bg-green-200 ',
              condition === 'Rusak' && 'bg-red-200 ',
            ])}
          >
            {condition}
          </span>
        ),
      },
      {
        Header: 'Aksi',
        accessor: (row) => [row.id, row.name, row.condition],
        Cell: ({
          value: [id, name, condition],
        }: Cell<Tools, [number, string, keyof typeof Condition]>) => (
          <PeralatanAction data={{ id, name, condition }} mutate={mutate} />
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
      <MenuHeader headerVariant='peralatan'>
        <MenuHeader.Heading>Data Peralatan Tambak</MenuHeader.Heading>
        <MenuHeader.Subheading>
          Berikut ini merupakan daftar peralatan tambak
        </MenuHeader.Subheading>
        <MenuHeader.ButtonGroup>
          <MenuHeader.ButtonChild href='/admin/peralatan/create'>
            <span className='hidden sm:block'>Tambah Peralatan</span>
            <HiPlus size={20} />
          </MenuHeader.ButtonChild>
        </MenuHeader.ButtonGroup>
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

export default withAuth(IndexPage, 'admin');
