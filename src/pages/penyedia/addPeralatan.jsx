import React from 'react';
import FormPeraltan from '../../components/Fragments/FormPeraltan';
import MainLayouts from '../../components/Layouts/MainLayouts';

const AddPeralatan = () => {
  return (
    <MainLayouts type="RKN">
      <h1 className="mb-6 text-xl font-bold text-black capitalize">
        Tambah Peralatan
      </h1>
      <div className="py-10 mb-10 border rounded-lg page-padding">
        <FormPeraltan />
      </div>
    </MainLayouts>
  );
};

export default AddPeralatan;
