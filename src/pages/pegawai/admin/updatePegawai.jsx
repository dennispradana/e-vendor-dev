import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import FormPegawai from '../../../components/Fragments/FormPegawai';

const UpdatePegawaiPage = () => {
  const breadcrumbItems = [
    { label: 'list', url: '/daftar-pegawai' },
    { label: 'Edit Data Pegawai' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="mb-5 text-xl font-bold text-black capitalize">
        Edit data pegawai
      </h1>
      <div className="py-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
        <FormPegawai />
      </div>
    </MainLayouts>
  );
};

export default UpdatePegawaiPage;
