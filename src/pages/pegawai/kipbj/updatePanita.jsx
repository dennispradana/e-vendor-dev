import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import FormPanitia from '../../../components/Fragments/FormPanitia';
import { useParams } from 'react-router-dom';

const UpdatePanitia = () => {
  const { panitiaId } = useParams();
  const breadcrumbItems = [
    { label: 'list', url: '/daftar-panitia' },
    { label: 'detail', url: `/daftar-panitia/detail/${panitiaId}` },
    { label: 'Edit Data Panitia' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="mb-5 text-xl font-bold text-black capitalize">
        Edit data panitia
      </h1>
      <div className="py-10 mb-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
        <FormPanitia />
      </div>
    </MainLayouts>
  );
};

export default UpdatePanitia;
