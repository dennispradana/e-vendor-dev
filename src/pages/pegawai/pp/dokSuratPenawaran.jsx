import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import SuratPenawaranEvaluasi from '../../../components/Fragments/SuratPenawaranEvaluasi';

const DokSuratPenawaranEvaluasi = () => {
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Surat Penawaran' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <SuratPenawaranEvaluasi />
    </MainLayouts>
  );
};

export default DokSuratPenawaranEvaluasi;
