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
      <MenuHeader headerVariant='barang'>
        <MenuHeader.Heading>Data Informasi Barang</MenuHeader.Heading>
        <MenuHeader.Subheading>
          Berikut ini merupakan daftar informasi barang
        </MenuHeader.Subheading>
        <MenuHeader.ButtonGroup>
          <MenuHeader.ButtonChild href='/admin/barang/create'>
            <span className='hidden sm:block'>Tambah Barang</span>
            <HiPlus size={20} />
          </MenuHeader.ButtonChild>
        </MenuHeader.ButtonGroup>
      </MenuHeader>
    </Layout>
  );
}

export default withAuth(PeralatanPage, 'admin');
