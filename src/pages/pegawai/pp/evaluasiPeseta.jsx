import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import TabEavluasiPeserta from '../../../components/Fragments/TabEavluasiPeserta';
import Breadcrumb from '../../../components/Elements/Breadcrumb';

const EvaluasiPeserta = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Evaluasi Peserta' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <TabEavluasiPeserta />
    </MainLayouts>
  );
};

export default EvaluasiPeserta;
