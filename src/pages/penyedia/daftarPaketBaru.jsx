import React from 'react';
import MainLayouts from '../../components/Layouts/MainLayouts';
import TablePaketBaru from '../../components/Fragments/TablePaketBaru';

const DaftarPaketBaru = () => {
  return (
    <MainLayouts type="RKN">
      <div className="relative">
        <TablePaketBaru />
      </div>
    </MainLayouts>
  );
};

export default DaftarPaketBaru;
