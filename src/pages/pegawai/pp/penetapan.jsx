import React from 'react';
import TablePenetapan from '../../../components/Fragments/TablePenetapan';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';

const Penetapan = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Penetapan Pemenang' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <TablePenetapan />
    </MainLayouts>
  );
};

export default Penetapan;
