import React from 'react';
import MainLayouts from '../../components/Layouts/MainLayouts';
import FormTenagaAhli from '../../components/Fragments/FormTenagaAhli';

const UpdateTenagaAhli = () => {
  return (
    <MainLayouts type="RKN">
      <h1 className="mb-6 text-xl font-bold text-black capitalize">
        Edit Staff
      </h1>
      <div className="py-10 mb-10 border rounded-lg page-padding">
        <FormTenagaAhli />
      </div>
    </MainLayouts>
  );
};

export default UpdateTenagaAhli;
