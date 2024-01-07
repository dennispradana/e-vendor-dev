import React from 'react';
import MainLayouts from '../../components/Layouts/MainLayouts';
import Breadcrumb from '../../components/Elements/Breadcrumb';
import { useParams } from 'react-router-dom';
import DokumenRKN from '../../components/Fragments/DokumenRkn';

const DokRKN = () => {
  const { llsId } = useParams();
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Penawaran', url: `/penawaran/${llsId}` },
    { label: 'Dokumen Penawaran' },
  ];
  return (
    <MainLayouts type="RKN">
      <Breadcrumb items={breadcrumbItems} />
      <DokumenRKN />
    </MainLayouts>
  );
};

export default DokRKN;
