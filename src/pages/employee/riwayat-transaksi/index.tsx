import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import MenuHeader from '@/container/text/MenuHeader';

function IndexPage() {
  return (
    <Layout>
      <Seo templateTitle='Peralatan' />
      <MenuHeader headerVariant='transaksi'>
        <MenuHeader.Heading>Riwayat Transaksi</MenuHeader.Heading>
        <MenuHeader.Subheading>
          Berikut ini merupakan daftar riwayat transaksi anda
        </MenuHeader.Subheading>
      </MenuHeader>
    </Layout>
  );
}

export default withAuth(IndexPage, 'employee');
