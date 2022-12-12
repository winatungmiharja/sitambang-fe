import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import MenuHeader from '@/container/text/MenuHeader';

function CreatePage() {
  return (
    <Layout>
      <Seo templateTitle='Create' />
      <MenuHeader headerVariant='barang'>
        <MenuHeader.Heading>Tambah Barang</MenuHeader.Heading>
        <MenuHeader.BackLink href='/admin/barang'>Kembali</MenuHeader.BackLink>
      </MenuHeader>
    </Layout>
  );
}

export default withAuth(CreatePage, 'admin');
