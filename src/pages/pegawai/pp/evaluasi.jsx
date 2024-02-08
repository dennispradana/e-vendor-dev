import React from 'react';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import TabEvaluasi from '../../../components/Fragments/TabEvaluasi';
import MainLayouts from '../../../components/Layouts/MainLayouts';

const Evaluasi = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Evaluasi' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <TabEvaluasi />
    </MainLayouts>
  );
};

export default Evaluasi;
