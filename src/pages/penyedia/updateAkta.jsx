import React from 'react';
import FormAkta from '../../components/Fragments/FormAkta';
import MainLayouts from '../../components/Layouts/MainLayouts';

const UpdateAkta = () => {
  return (
    <MainLayouts type="RKN">
      <h1 className="mb-6 text-xl font-bold text-black capitalize">
        Edit Akta
      </h1>
      <div className="py-10 mb-10 border rounded-lg page-padding">
        <FormAkta />
      </div>
    </MainLayouts>
  );
};

export default UpdateAkta;
