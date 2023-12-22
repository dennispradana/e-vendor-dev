import React from 'react';
import PaketDetail from '../../../components/Fragments/PaketDetail';
import MainLayouts from '../../../components/Layouts/MainLayouts';

const DetailPaketPjb = () => {
  return (
    <MainLayouts>
      <div className="relative">
        <PaketDetail type="kipjb" />
      </div>
    </MainLayouts>
  );
};

export default DetailPaketPjb;
