import React from 'react';
import FormTenagaAhli from '../../components/Fragments/FormTenagaAhli';
import MainLayouts from '../../components/Layouts/MainLayouts';

const AddTenagaAhli = () => {
  return (
    <MainLayouts type="RKN">
      <h1 className="mb-6 text-xl font-bold text-black capitalize">
        Tambah Tenaga Ahli
      </h1>
      <div className="py-10 mb-10 border rounded-lg page-padding">
        <FormTenagaAhli />
      </div>
    </MainLayouts>
  );
};

export default AddTenagaAhli;
