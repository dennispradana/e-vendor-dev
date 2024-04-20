import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import DokumenEvaluasi from '../../../components/Fragments/DokumenEvaluasi';
import { useParams } from 'react-router-dom';

const DokEvaluasi = () => {
  const { llsId } = useParams();
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Evaluasi', url: `/evaluasi/${llsId}` },
    { label: 'Dokumen Evaluasi' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <DokumenEvaluasi />
    </MainLayouts>
  );
};

export default DokEvaluasi;
