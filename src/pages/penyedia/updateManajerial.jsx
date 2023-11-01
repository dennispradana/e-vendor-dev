import React from 'react';
import MainLayouts from '../../components/Layouts/MainLayouts';
import FormManajerial from '../../components/Fragments/FormManajerial';

const UpdateManajerial = () => {
  return (
    <MainLayouts type="RKN">
      <h1 className="mb-6 text-xl font-bold text-black capitalize">
        Edit Manajerial
      </h1>
      <div className="py-10 mb-10 border rounded-lg page-padding">
        <FormManajerial />
      </div>
    </MainLayouts>
  );
};

export default UpdateManajerial;
