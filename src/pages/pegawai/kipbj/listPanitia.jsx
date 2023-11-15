import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import TableListPanitia from '../../../components/Fragments/TableListPanitia';

const ListPanitia = () => {
  return (
    <MainLayouts>
      <div className="relative">
        <TableListPanitia />
      </div>
    </MainLayouts>
  );
};

export default ListPanitia;
