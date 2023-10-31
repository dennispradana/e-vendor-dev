import React from 'react';
import FormIzinUsaha from '../../components/Fragments/FormIzinUsaha';
import MainLayouts from '../../components/Layouts/MainLayouts';

const UpdateIzinUsaha = () => {
  return (
    <MainLayouts type="RKN">
      <h1 className="mb-6 text-xl font-bold text-black capitalize">
        Edit Izin Usaha
      </h1>
      <div className="py-10 mb-10 border rounded-lg page-padding">
        <FormIzinUsaha />
      </div>
    </MainLayouts>
  );
};

export default UpdateIzinUsaha;
