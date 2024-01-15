import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayouts from '../../components/Layouts/MainLayouts';
import Breadcrumb from '../../components/Elements/Breadcrumb';
import FormKirimPenawaran from '../../components/Fragments/FormKirimPenawaran';

const SendPenawaran = () => {
  const { llsId } = useParams();
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Penawaran', url: `/penawaran/${llsId}` },
    { label: 'Kirim Penawaran' },
  ];
  return (
    <MainLayouts type="RKN">
      <Breadcrumb items={breadcrumbItems} />
      <FormKirimPenawaran />
    </MainLayouts>
  );
};

export default SendPenawaran;
