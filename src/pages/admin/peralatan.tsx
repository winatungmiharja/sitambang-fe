import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

function PeralatanPage() {
  return (
    <Layout>
      <Seo templateTitle='Peralatan' />

      <h1>Peralatan</h1>
    </Layout>
  );
}

export default withAuth(PeralatanPage, 'admin');
