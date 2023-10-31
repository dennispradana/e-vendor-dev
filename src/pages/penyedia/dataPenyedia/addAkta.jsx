import React from 'react';
import FormAkta from '../../../components/Fragments/FormAkta';

const AddAkta = () => {
  return (
    <>
      <h1 className="my-10 text-xl font-bold text-black capitalize">
        Tambah Data Akta
      </h1>
      <div className="py-10 mb-10 border rounded-lg page-padding">
        <FormAkta />
      </div>
    </>
  );
};

export default AddAkta;
