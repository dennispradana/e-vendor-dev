import React from 'react';
import AuthLayouts from '../../components/Layouts/AuthLayouts';
import FormLogin from '../../components/Fragments/FormLogin';

const LoginPegawaiPage = () => {
  return (
    <AuthLayouts type="pegawai">
      <h1 className="mb-6 text-2xl font-bold text-center text-blue-700">
        Login Sebagai Pegawai
      </h1>
      <FormLogin type="pegawai" />
    </AuthLayouts>
  );
};

export default LoginPegawaiPage;
