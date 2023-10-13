import React from 'react';
import Navbar from '../Fragments/Navbar';

const AuthLayouts = ({ children, type }) => {
  return (
    <div className="flex items-center justify-center min-h-screen py-8 login-bg">
      <Navbar type="auth" />
      <div
        className={`${
          type === 'penyediaRegister' ? 'w-[50vw]' : 'w-[30rem]'
        } min-h-[20rem] px-4 border rounded-xl backdrop-blur-sm bg-white/90 shadow-2xl py-6`}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayouts;
