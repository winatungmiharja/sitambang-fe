import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

function BuatPemesananPage() {
  return (
    <Layout>
      <Seo templateTitle='BuatPemesanan' />

      <h1>BuatPemesanan</h1>
    </Layout>
  );
}

export default withAuth(BuatPemesananPage, 'buyer');
