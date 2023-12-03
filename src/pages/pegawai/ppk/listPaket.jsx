import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import TableListsPaket from '../../../components/Fragments/TableListsPaket';

const ListPaket = () => {
  return (
    <MainLayouts>
      <div className="relative">
        <TableListsPaket />
      </div>
    </MainLayouts>
  );
};

export default ListPaket;
