import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

function BarangPage() {
  return (
    <Layout>
      <Seo templateTitle='Barang' />

      <h1>Barang</h1>
    </Layout>
  );
}

export default withAuth(BarangPage, 'employee');
