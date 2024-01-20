import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import TableDokKualifikasiPen from '../../../components/Fragments/TableDokKualifikasiPen';
import { useParams } from 'react-router-dom';

const DokKualifikasiPen = () => {
  const { llsId } = useParams();
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Evaluasi', url: `/evaluasi/${llsId}` },
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
