import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import MenuHeader from '@/container/text/MenuHeader';

function IndexPage() {
  return (
    <Layout>
      <Seo templateTitle='Peralatan' />
      <MenuHeader headerVariant='pemesanan'>
        <MenuHeader.Heading>Verifikasi Pemesanan</MenuHeader.Heading>
        <MenuHeader.Subheading>
          Berikut ini merupakan daftar verifikasi pemesanan
        </MenuHeader.Subheading>
      </MenuHeader>
    </Layout>
  );
}

export default withAuth(IndexPage, 'admin');
