import React from 'react';
import FormPengalaman from '../../components/Fragments/FormPengalaman';
import MainLayouts from '../../components/Layouts/MainLayouts';

const AddPengalaman = () => {
  return (
    <MainLayouts type="RKN">
      <h1 className="mb-6 text-xl font-bold text-black capitalize">
        Tambah Pengalaman
      </h1>
      <div className="py-10 mb-10 border rounded-lg page-padding">
        <FormPengalaman />
      </div>
    </MainLayouts>
  );
};

export default AddPengalaman;
