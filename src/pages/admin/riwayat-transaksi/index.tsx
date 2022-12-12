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
      <MenuHeader headerVariant='transaksi'>
        <MenuHeader.Heading>Riwayat Transaksi</MenuHeader.Heading>
        <MenuHeader.Subheading>
          Berikut ini merupakan daftar riwayat transaksi
        </MenuHeader.Subheading>
        <MenuHeader.ButtonGroup>
          <MenuHeader.ButtonChild href='/admin/riwayat-transaksi/create'>
            <span className='hidden sm:block'>Tambah Riwayat Transaksi</span>
            <HiPlus size={20} />
          </MenuHeader.ButtonChild>
        </MenuHeader.ButtonGroup>
      </MenuHeader>
    </Layout>
  );
}

export default withAuth(PeralatanPage, 'admin');
