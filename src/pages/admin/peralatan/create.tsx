import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import MenuHeader from '@/container/text/MenuHeader';

function CreatePage() {
  return (
    <Layout>
      <Seo templateTitle='Create' />
      <MenuHeader headerVariant='peralatan'>
        <MenuHeader.Heading>Tambah Peralatan Tambak</MenuHeader.Heading>
        <MenuHeader.BackLink href='/admin/peralatan'>
          Kembali
        </MenuHeader.BackLink>
      </MenuHeader>
    </Layout>
  );
}

export default withAuth(CreatePage, 'admin');
