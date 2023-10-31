import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import TableListsPegawai from '../../../components/Fragments/TableListsPegawai';

const ListPegawai = () => {
  return (
    <MainLayouts>
      <div className="relative">
        <TableListsPegawai />
      </div>
    </MainLayouts>
  );
};

export default ListPegawai;
