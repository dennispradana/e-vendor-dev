import React from 'react';
import MainLayouts from '../../components/Layouts/MainLayouts';
import FormPeraltan from '../../components/Fragments/FormPeraltan';

const UpdatePeralatan = () => {
  return (
    <MainLayouts type="RKN">
      <h1 className="mb-6 text-xl font-bold text-black capitalize">
        Edit Pengalaman
      </h1>
      <div className="py-10 mb-10 border rounded-lg page-padding">
        <FormPeraltan />
      </div>
    </MainLayouts>
  );
};

export default UpdatePeralatan;
