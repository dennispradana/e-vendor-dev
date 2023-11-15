import React, { useEffect, useState } from 'react';
import { panitiaService } from '../../services/panitia.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { SkeletonItem } from '../Elements/Skelekton';
import { CheckBoxForm, InputForm, TextAreaForm } from '../Elements/Input';
import Button from '../Elements/Button';

const FormPanitia = () => {
  const [loading, setLoading] = useState(true);
  const { postPanitia, editPanitia, updatePanitia } = panitiaService();
  const { panitiaId } = useParams();
  const isEdit = panitiaId !== undefined;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        try {
          const response = await editPanitia(panitiaId);
          const panitiaData = response.data;
          formik.setValues({
            ...panitiaData,
            is_active: panitiaData.is_active === '1' ? true : false,
          });

          setLoading(false);
        } catch (error) {
          toasterror(error.message);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const initialValues = {
    pnt_nama: '',
    pnt_no_sk: '',
    pnt_tahun: '',
    pnt_alamat: '',
    pnt_email: '',
    pnt_telp: '',
    is_active: false,
  };

  const validation = Yup.object({
    pnt_nama: Yup.string().required('Nama Panitia harus diisi'),
    pnt_no_sk: Yup.string().required('Nama Panitia harus diisi'),
    pnt_tahun: Yup.string().required('Nama Panitia harus diisi'),
    pnt_alamat: Yup.string().required('Nama Panitia harus diisi'),
    pnt_telp: Yup.string().required('Nama Panitia harus diisi'),
    pnt_email: Yup.string()
      .required('Email harus diisi')
      .email('Format e-mail tidak valid'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const mappedValues = {
      ...values,
      is_active: values.is_active ? 1 : 0,
    };

    try {
      let response;
      let message;

      if (isEdit) {
        response = await updatePanitia(panitiaId, mappedValues);
        message = 'Update Sukses';
        navigate(`/daftar-panitia/detail/${panitiaId}`);
      } else {
        response = await postPanitia(mappedValues);
        message = 'Submit Sukses';
        navigate('/daftar-panitia');
      }
      if (response) {
        toastsuccess(message);
      } else {
        toasterror('Terjadi kesalahan saat menyimpan data.');
      }
    } catch (error) {
      toasterror(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: handleSubmit,
  });

  const handleBack = () => {
    history.back();
  };

  return loading ? (
    <>
      <SkeletonItem itemCount={1} cN="bg-gray-200 h-6 w-1/4" />
      <div className="py-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
        <SkeletonItem itemCount={10} cN="bg-gray-200 h-8" />
      </div>
    </>
  ) : (
    <form onSubmit={formik.handleSubmit}>
      <InputForm
        label="Nama Panitia"
        type="text"
        {...formik.getFieldProps('pnt_nama')}
        error={formik.touched.pnt_nama && formik.errors.pnt_nama}
      />
      <InputForm
        label="Nomor SK"
        type="text"
        {...formik.getFieldProps('pnt_no_sk')}
        error={formik.touched.pnt_no_sk && formik.errors.pnt_no_sk}
      />
      <InputForm
        label="Tahun"
        type="text"
        {...formik.getFieldProps('pnt_tahun')}
        error={formik.touched.pnt_tahun && formik.errors.pnt_tahun}
      />
      <TextAreaForm
        label="Alamat"
        {...formik.getFieldProps('pnt_alamat')}
        error={formik.touched.pnt_alamat && formik.errors.pnt_alamat}
      />
      <InputForm
        label="No. Telepon"
        type="text"
        {...formik.getFieldProps('pnt_telp')}
        error={formik.touched.pnt_telp && formik.errors.pnt_telp}
      />
      <InputForm
        label="E-mail"
        type="email"
        {...formik.getFieldProps('pnt_email')}
        error={formik.touched.pnt_email && formik.errors.pnt_email}
      />
      <CheckBoxForm
        label="Aktif"
        {...formik.getFieldProps('is_active')}
        error={formik.touched.is_active && formik.errors.is_active}
      />
      <div className="flex gap-4">
        <Button
          cN={`btn bg-sky-500 text-white  hover:bg-blue-600 ease-in duration-200 ${
            formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={formik.isSubmitting}
        >
          {isEdit ? 'Update' : 'Submit'}
        </Button>
        <Button
          cN={`btn bg-slate-300 text-black hover:bg-slate-400 ease-in duration-200 ${
            formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={formik.isSubmitting}
          type="button"
          onClick={() => handleBack()}
        >
          Kembali
        </Button>
      </div>
    </form>
  );
};

export default FormPanitia;
