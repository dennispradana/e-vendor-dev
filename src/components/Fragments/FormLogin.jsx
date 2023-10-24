import React, { useState } from 'react';
import { InputForm } from '../Elements/Input';
import Button from '../Elements/Button';
import Spinner from '../Elements/Spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from '../../contexts/AuthContext';
import Captcha from '../Elements/Captcha';

const FormLogin = () => {
  const [verified, setIsVerified] = useState(null);
  const [loginFailed, setLoginFailed] = useState('');
  const { login } = useAuthContext();

  const handleRecaptcha = (value) => {
    setIsVerified(value);
  };

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('username harus diisi'),
    password: Yup.string().required('password harus diisi'),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    if (verified) {
      try {
        await login({
          username: values.username,
          password: values.password,
        });
      } catch (error) {
        setLoginFailed(error.message);
      } finally {
        setSubmitting(false);
      }
    } else {
      setLoginFailed('Captcha tidak valid. Silahkan isi Kembali');
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {loginFailed && (
          <p className="my-2 text-sm text-center text-red-500 capitalize">
            {loginFailed}
          </p>
        )}
        <InputForm
          label="username"
          type="text"
          {...formik.getFieldProps('username')}
          error={formik.touched.username && formik.errors.username}
        />
        <InputForm
          label="password"
          type="password"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && formik.errors.password}
        />
        <Captcha onCaptchaChange={handleRecaptcha} />
        <Button
          cN={`btn-full bg-blue-600 text-white hover:bg-blue-800 ease-in duration-200 ${
            formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <Spinner /> : 'login'}
        </Button>
      </form>
    </>
  );
};

export default FormLogin;
