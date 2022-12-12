import * as React from 'react';
import { HiPlus } from 'react-icons/hi';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import MenuHeader from '@/container/text/MenuHeader';

function IndexPage() {
  return (
    <Layout>
      <Seo templateTitle='Peralatan' />
      <MenuHeader headerVariant='peralatan'>
        <MenuHeader.Heading>Data Peralatan Tambak</MenuHeader.Heading>
        <MenuHeader.Subheading>
          Berikut ini merupakan daftar peralatan tambak
        </MenuHeader.Subheading>
        <MenuHeader.ButtonGroup>
          <MenuHeader.ButtonChild href='/admin/peralatan/create'>
            <span className='hidden sm:block'>Tambah Peralatan</span>
            <HiPlus size={20} />
          </MenuHeader.ButtonChild>
        </MenuHeader.ButtonGroup>
      </MenuHeader>
    </Layout>
  );
}

export default withAuth(IndexPage, 'admin');
