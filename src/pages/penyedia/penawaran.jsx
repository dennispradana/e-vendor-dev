import React from 'react';
import MainLayouts from '../../components/Layouts/MainLayouts';
import PenawaranRkn from '../../components/Fragments/PenawaranRkn';
import Breadcrumb from '../../components/Elements/Breadcrumb';

const Penawaran = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Penawaran' },
  ];
  return (
    <MainLayouts type="RKN">
      <Breadcrumb items={breadcrumbItems} />
      <PenawaranRkn />
    </MainLayouts>
  );
};

export default Penawaran;
