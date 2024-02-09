import React from 'react';
import FormPaketPJB from '../../../components/Fragments/FormPaketPJB';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';

const UpdatePaketPJB = () => {
  const breadcrumbItems = [
    { label: 'Daftar Paket', url: '/paket' },
    { label: 'Peket' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <div className="relative">
        <FormPaketPJB />
      </div>
    </MainLayouts>
  );
};

export default UpdatePaketPJB;
