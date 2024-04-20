import React from 'react';
import { Link } from 'react-router-dom';

const RegisterLayout = ({ children }) => {
  return (
    <div className="container py-6 bg-sky-50">
      <h1 className="my-6 text-4xl font-bold text-center text-blue-700">
        Daftar Sebagai Peyedia
      </h1>
      <div className="w-1/2 p-5 mx-auto bg-white rounded-lg shadow-xl page-padding">
        {children}
      </div>
      <div className="flex items-center justify-center mt-3">
        <p className="mr-1 text-sm font-semibold capitalize">
          sudah punya akun penyedia?
        </p>
        <Link
          to="/login"
          className="text-sm font-semibold text-blue-500 capitalize hover:text-blue-700"
        >
          masuk
        </Link>
      </div>
    </div>
  );
};

export default RegisterLayout;
