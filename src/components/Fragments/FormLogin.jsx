import React, { useState } from 'react';
import { InputForm } from '../Elements/Input';
import Button from '../Elements/Button';
import Spinner from '../Elements/Spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from '../../contexts/AuthContext';
import Captcha from '../Elements/Captcha';
import { PiEyeLight, PiEyeClosedLight } from 'react-icons/pi';

const FormLogin = () => {
  const [verified, setIsVerified] = useState(null);
  const [loginFailed, setLoginFailed] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
        <div className="mb-6">
          <label className="mb-4 text-sm font-semibold capitalize ">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`w-full mt-2 p-1 px-3 text-gray-700 bg-white border ${
                formik.touched.password && formik.errors.password
                  ? 'border-red-500 focus:ring-red-600'
                  : 'border-gray-300  focus:ring-sky-600'
              } rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2  focus:border-transparent`}
              {...formik.getFieldProps('password')}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600">
              <button
                type="button"
                onClick={handleShowPassword}
                className={`mt-2 ${showPassword ? '' : 'text-blue-600'}`}
              >
                {showPassword ? (
                  <PiEyeLight size="1.2rem" />
                ) : (
                  <PiEyeClosedLight size="1.2rem" />
                )}
              </button>
            </div>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="mt-2 text-sm italic text-red-500">
              {formik.errors.password}
            </p>
          )}
        </div>
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
