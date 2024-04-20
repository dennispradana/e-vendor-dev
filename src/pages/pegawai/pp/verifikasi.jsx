import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import TableVerifikasi from '../../../components/Fragments/TableVerifikasi';

const Verifikasi = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Verifikasi' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <TableVerifikasi />
    </MainLayouts>
  );
};

export default Verifikasi;
