import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineReload } from 'react-icons/ai';

const Captcha = ({ onCaptchaChange }) => {
  const randomString = Math.random().toString(36).slice(8);
  const [captcha, setCaptcha] = useState(randomString);
  const captchaRef = useRef(null);

  const refreshString = () => {
    const newCaptcha = Math.random().toString(36).slice(8);
    setCaptcha(newCaptcha);
    formik.resetForm();
  };

  const validationSchema = Yup.object({
    captcha: Yup.string().required('Captcha harus diisi'),
  });

  const handleChange = (e) => {
    const enteredCaptcha = e.target.value;

    if (enteredCaptcha === captcha) {
      onCaptchaChange(true);
    } else {
      onCaptchaChange(false);
    }

    formik.handleChange(e);
  };

  const formik = useFormik({
    initialValues: {
      captcha: '',
    },
    validationSchema: validationSchema,
  });

  return (
    <>
      <h1 className="w-full mb-2 text-sm font-semibold capitalize">
        Verifikasi Captcha
      </h1>
      <div className="mb-3 ">
        <div
          className="w-full p-2 mr-4 font-bold text-center text-white bg-gray-800 rounded-lg"
          ref={captchaRef}
        >
          {captcha}
        </div>
      </div>
      <div className="mb-6">
        <div className="flex gap-4 item-center">
          <input
            type="text"
            placeholder="Enter Captcha"
            className={`w-full p-1 px-3 text-gray-700 bg-white border ${
              formik.errors.captcha && formik.touched.captcha
                ? 'border-red-500 focus:ring-red-600'
                : 'border-gray-300  focus:ring-sky-600'
            } rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2  focus:border-transparent`}
            {...formik.getFieldProps('captcha')}
            onChange={handleChange}
          />
          <button
            className="p-2 bg-gray-200 rounded-lg"
            onClick={() => refreshString()}
            type="button"
          >
            <AiOutlineReload className="text-blue-500 " size={25} />
          </button>
        </div>
        {formik.touched && (
          <p className="mt-2 text-sm italic text-red-500">
            {formik.errors.captcha}
          </p>
        )}
      </div>
    </>
  );
};

export default Captcha;
