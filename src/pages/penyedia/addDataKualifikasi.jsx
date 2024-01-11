import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Elements/Breadcrumb';
import MainLayouts from '../../components/Layouts/MainLayouts';
import FormDokKualifikasiRkn from '../../components/Fragments/FormDokKualifikasiRkn';

const AddDataKualifikasi = () => {
  const { llsId } = useParams();
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Penawaran', url: `/penawaran/${llsId}` },
    { label: 'Dokumen Kualifikasi' },
  ];
  return (
    <MainLayouts type="RKN">
      <Breadcrumb items={breadcrumbItems} />
      <FormDokKualifikasiRkn />
    </MainLayouts>
  );
};

export default AddDataKualifikasi;
