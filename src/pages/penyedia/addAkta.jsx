import React from 'react';
import FormAkta from '../../components/Fragments/FormAkta';
import MainLayouts from '../../components/Layouts/MainLayouts';

const AddAkta = () => {
  return (
    <MainLayouts type="RKN">
      <h1 className="mb-6 text-xl font-bold text-black capitalize">
        Tambah Data Akta
      </h1>
      <div className="py-10 mb-10 border rounded-lg page-padding">
        <FormAkta />
      </div>
    </MainLayouts>
  );
};

export default AddAkta;
