import * as React from 'react';
import { HiPlus } from 'react-icons/hi';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import MenuHeader from '@/container/text/MenuHeader';

function PeralatanPage() {
  return (
    <Layout>
      <Seo templateTitle='Peralatan' />
      <MenuHeader headerVariant='karyawan'>
        <MenuHeader.Heading>Data Karyawan</MenuHeader.Heading>
        <MenuHeader.Subheading>
          Berikut ini merupakan daftar karyawan
        </MenuHeader.Subheading>
        <MenuHeader.ButtonGroup>
          <MenuHeader.ButtonChild href='/admin/karyawan/create'>
            <span className='hidden sm:block'>Tambah Karyawan</span>
            <HiPlus size={20} />
          </MenuHeader.ButtonChild>
        </MenuHeader.ButtonGroup>
      </MenuHeader>
    </Layout>
  );
}

export default withAuth(PeralatanPage, 'admin');
