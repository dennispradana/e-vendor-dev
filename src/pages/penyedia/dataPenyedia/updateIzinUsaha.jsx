import React from 'react';
import FormIzinUsaha from '../../../components/Fragments/FormIzinUsaha';

const UpdateIzinUsaha = () => {
  return (
    <>
      <h1 className="my-10 text-xl font-bold text-black capitalize">
        Edit Izin Usaha
      </h1>
      <div className="py-10 mb-10 border rounded-lg page-padding">
        <FormIzinUsaha />
      </div>
    </>
  );
};

export default UpdateIzinUsaha;
