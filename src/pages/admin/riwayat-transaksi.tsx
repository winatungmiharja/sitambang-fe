import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

function RiwayatTransaksiPage() {
  return (
    <Layout>
      <Seo templateTitle='RiwayatTransaksi' />

      <h1>RiwayatTransaksi</h1>
    </Layout>
  );
}

export default withAuth(RiwayatTransaksiPage, 'admin');
