import React from 'react';
import AuthLayouts from '../../components/Layouts/AuthLayouts';
import FormLogin from '../../components/Fragments/FormLogin';
import { Link } from 'react-router-dom';

const LoginPenyediaPage = () => {
  return (
    <AuthLayouts type="penyediaLogin">
      <h1 className="mb-6 text-2xl font-bold text-center text-blue-700">
        Login Sebagai Penyedia
      </h1>
      <FormLogin type="penyedia" />
      <div className="flex items-center justify-center mt-3">
        <p className="mr-1 text-sm font-semibold capitalize">
          belum punya akun penyedia?
        </p>
        <Link
          to="/register/penyedia"
          className="text-sm font-semibold text-blue-500 capitalize hover:text-blue-700"
        >
          daftar
        </Link>
      </div>
    </AuthLayouts>
  );
};

export default LoginPenyediaPage;
