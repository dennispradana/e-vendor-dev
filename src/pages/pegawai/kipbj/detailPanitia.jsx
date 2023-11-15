import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import Panitia from '../../../components/Fragments/Panitia';

const DetailPanitia = () => {
  const breadcrumbItems = [
    { label: 'list', url: '/daftar-panitia' },
    { label: 'Data Panitia' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="mb-5 text-xl font-bold text-black capitalize">
        data panitia
      </h1>
      <div className="py-10 mb-10 bg-white shadow-xl rounded-xl">
        <Panitia />
      </div>
    </MainLayouts>
  );
};

export default DetailPanitia;
