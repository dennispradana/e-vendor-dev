import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import FormPeyediaEdit from '../../../components/Fragments/FormPeyediaEdit';

const UpdatePenyediaPage = () => {
  const breadcrumbItems = [
    { label: 'List', url: '/daftar-penyedia' },
    { label: 'Edit Data Penyedia' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="mb-5 text-xl font-bold text-black capitalize">
        Edit data Penyedia
      </h1>
      <div className="py-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
        <FormPeyediaEdit />
      </div>
    </MainLayouts>
  );
};

export default UpdatePenyediaPage;
