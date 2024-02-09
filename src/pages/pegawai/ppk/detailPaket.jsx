import React from 'react';
import PaketDetail from '../../../components/Fragments/PaketDetail';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';

const DetailPaketPpk = () => {
  const breadcrumbItems = [
    { label: 'Daftar Paket', url: '/daftar-paket' },
    { label: 'Detail' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <div className="relative">
        <PaketDetail type="ppk" />
      </div>
    </MainLayouts>
  );
};

export default DetailPaketPpk;
