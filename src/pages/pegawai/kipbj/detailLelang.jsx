import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import TableDetaiLelang from '../../../components/Fragments/TableDetaiLelang';

const DetailLelangKIPJB = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Detail Lelang' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <TableDetaiLelang />
    </MainLayouts>
  );
};

export default DetailLelangKIPJB;
