import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

function KaryawanPage() {
  return (
    <Layout>
      <Seo templateTitle='Karyawan' />

      <h1>Karyawan</h1>
    </Layout>
  );
}

export default withAuth(KaryawanPage, 'admin');
