import React from 'react';
import { useParams } from 'react-router-dom';
import DokumenLelang from '../../../components/Fragments/DokumenLelang';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';

const DokLelangKIPJB = () => {
  const { llsId } = useParams();
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Detail Lelang', url: `/detail-lelang/${llsId}` },
    { label: 'Dokumen' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <DokumenLelang />
    </MainLayouts>
  );
};

export default DokLelangKIPJB;
