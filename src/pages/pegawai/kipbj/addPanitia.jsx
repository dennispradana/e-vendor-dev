import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import FormPanitia from '../../../components/Fragments/FormPanitia';

const AddPanitia = () => {
  const breadcrumbItems = [
    { label: 'list', url: '/daftar-panitia' },
    { label: 'Tambah Data Panitia' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="mb-5 text-xl font-bold text-black capitalize">
        Tambah data panitia
      </h1>
      <div className="py-10 mb-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
        <FormPanitia />
      </div>
    </MainLayouts>
  );
};

export default AddPanitia;
