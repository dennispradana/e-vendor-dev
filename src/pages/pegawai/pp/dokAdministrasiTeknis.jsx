import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import TableAdministrasiTeknis from '../../../components/Fragments/TableAdministrasiTeknis';

const DokAdministrasiTeknis = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Administrasi Teknis' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <TableAdministrasiTeknis />
    </MainLayouts>
  );
};

export default DokAdministrasiTeknis;
