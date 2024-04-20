import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import TableDokKualifikasiPen from '../../../components/Fragments/TableDokKualifikasiPen';

const DokKualifikasiPen = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Dokumen Kualifikasi' },
  ];

  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <TableDokKualifikasiPen />
    </MainLayouts>
  );
};

export default DokKualifikasiPen;
