import React from 'react';
import AuthLayouts from '../components/Layouts/AuthLayouts';
import FormLogin from '../components/Fragments/FormLogin';

const Login = () => {
  return (
    <AuthLayouts>
      <FormLogin />
    </AuthLayouts>
  );
};

export default Login;
