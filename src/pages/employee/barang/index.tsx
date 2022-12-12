import * as React from 'react';
import { HiPlus } from 'react-icons/hi';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import MenuHeader from '@/container/text/MenuHeader';

function IndexPage() {
  return (
    <Layout>
      <Seo templateTitle='Daftar Barang' />
      <MenuHeader headerVariant='barang'>
        <MenuHeader.Heading>Data Informasi Barang</MenuHeader.Heading>
        <MenuHeader.Subheading>
          Berikut ini merupakan daftar barang yang kami jual
        </MenuHeader.Subheading>
        <MenuHeader.ButtonGroup>
          <MenuHeader.ButtonChild href='/employee/buat-pemesanan/'>
            <span className='hidden sm:block'>Tambah Pemesanan</span>
            <HiPlus size={20} />
          </MenuHeader.ButtonChild>
        </MenuHeader.ButtonGroup>
      </MenuHeader>
    </Layout>
  );
}

export default withAuth(IndexPage, 'employee');
