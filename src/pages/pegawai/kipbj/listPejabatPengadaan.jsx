import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import TableListPP from '../../../components/Fragments/TableListPP';

const ListPejabatPengadaan = () => {
  return (
    <MainLayouts>
      <div className="relative">
        <TableListPP />
      </div>
    </MainLayouts>
  );
};

export default ListPejabatPengadaan;
