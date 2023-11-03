import React from 'react';
import MainLayouts from '../../components/Layouts/MainLayouts';
import FormPajak from '../../components/Fragments/FormPajak';

const AddPajak = () => {
  return (
    <MainLayouts type="RKN">
      <h1 className="mb-6 text-xl font-bold text-black capitalize">
        Tambah Pajak
      </h1>
      <div className="py-10 mb-10 border rounded-lg page-padding">
        <FormPajak />
      </div>
    </MainLayouts>
  );
};

export default AddPajak;
