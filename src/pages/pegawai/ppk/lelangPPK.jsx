import React from 'react';
import TabLelangPPK from '../../../components/Fragments/TabLelangPPK';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';

const LelangPPK = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Lelang' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <TabLelangPPK />
    </MainLayouts>
  );
};

export default LelangPPK;
