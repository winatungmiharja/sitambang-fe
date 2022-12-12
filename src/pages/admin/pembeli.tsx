import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

function PembeliPage() {
  return (
    <Layout>
      <Seo templateTitle='Pembeli' />

      <h1>Pembeli</h1>
    </Layout>
  );
}

export default withAuth(PembeliPage, 'admin');
