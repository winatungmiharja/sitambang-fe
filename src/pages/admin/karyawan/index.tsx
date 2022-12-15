import * as React from 'react';
import { Cell, Column } from 'react-table';
import useSWR from 'swr';

import useSWRWithToast from '@/hooks/toast/useSWRWithToast';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

import EmployeeAction from '@/container/action/admin/EmployeeAction';
import MenuHeader from '@/container/text/MenuHeader';

import { ApiReturn, Employee } from '@/types/api';

function IndexPage() {
  const {
    data: apiEmployee,
    isLoading,
    mutate,
  } = useSWRWithToast(useSWR<ApiReturn<Employee[]>>('/employee/view'));

  const employees: Employee[] = apiEmployee?.data ?? [];
  const columns = React.useMemo<Column<Employee>[]>(
    () => [
      {
        Header: 'Nama',
        accessor: (row) => [row.name],
        className: 'capitalize',
        Cell: ({ value: [name] }: Cell<Employee, [string]>) => (
          <span className='font-semibold text-primary-500'>{name}</span>
        ),
      },
      {
        Header: 'Posisi',
        accessor: (row) => row.position,
        className: 'capitalize ',
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
        Cell: ({ value: [employee] }: Cell<Employee, [Employee]>) => (
          <EmployeeAction data={employee} mutate={mutate} />
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
      <MenuHeader headerVariant='karyawan'>
        <MenuHeader.Heading>Data Karyawan</MenuHeader.Heading>
        <MenuHeader.Subheading>
          Berikut ini merupakan daftar karyawan
        </MenuHeader.Subheading>
      </MenuHeader>
      <Table
        className='mt-12'
        data={employees}
        columns={columns}
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default withAuth(IndexPage, 'admin');
