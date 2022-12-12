import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

function VerifikasiPemesananPage() {
  return (
    <Layout>
      <Seo templateTitle='VerifikasiPemesanan' />

      <h1>VerifikasiPemesanan</h1>
    </Layout>
  );
}

export default withAuth(VerifikasiPemesananPage, 'admin');
