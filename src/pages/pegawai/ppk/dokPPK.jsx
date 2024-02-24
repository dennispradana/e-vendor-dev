import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import DokumenLelang from '../../../components/Fragments/DokumenLelang';
import { useParams } from 'react-router-dom';

const DokumenPPK = () => {
  const { llsId } = useParams();
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Lelang', url: `/lelang/${llsId}` },
    { label: 'Dokumen' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <DokumenLelang type="ppk" />
    </MainLayouts>
  );
};

export default DokumenPPK;
