import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import TableListsPenyedia from '../../../components/Fragments/TableListsPenyedia';

const ListPenyedia = () => {
  return (
    <MainLayouts>
      <div className="relative">
        <TableListsPenyedia />
      </div>
    </MainLayouts>
  );
};

export default ListPenyedia;
