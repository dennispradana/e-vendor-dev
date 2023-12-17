import React from 'react';
import PaketDetail from '../../../components/Fragments/PaketDetail';
import MainLayouts from '../../../components/Layouts/MainLayouts';

const DetailPaketPpk = () => {
  return (
    <MainLayouts>
      <div className="relative">
        <PaketDetail type="ppk" />
      </div>
    </MainLayouts>
  );
};

export default DetailPaketPpk;
