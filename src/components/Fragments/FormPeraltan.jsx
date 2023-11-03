import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { InputForm, SelectForm } from '../Elements/Input';
import Button from '../Elements/Button';
import Spinner from '../Elements/Spinner';

const options = [
  { value: 0, label: 'Baik' },
  { value: 1, label: 'Rusak' },
];

const FormPeraltan = () => {
  const { user } = useAuthContext();

  const initialValues = {
    alt_jenis: '',
    alt_jumlah: '',
    alt_kapasitas: '',
    alt_merktipe: '',
    alt_thpembuatan: '',
    alt_kondisi: '',
    alt_lokasi: '',
    alt_kepemilikan: '',
  };

  const validation = Yup.object({
    alt_jenis: Yup.string().required('Nama harus diisi'),
    alt_jumlah: Yup.string().required('Jumlah harus diisi'),
    alt_merktipe: Yup.string().required('Merk/Tipe harus diisi'),
    alt_thpembuatan: Yup.string().required('Tahun Pembuatan harus diisi'),
    alt_kondisi: Yup.string().required('Pilih Salah Satu'),
    alt_lokasi: Yup.string().required('Lokasi harus diisi'),
    alt_kepemilikan: Yup.string().required('Status Kepemilikan harus diisi'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleBack = () => {
    history.back();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid md:grid-cols-2 md:gap-6">
        <InputForm
          label="Nama"
          type="text"
          {...formik.getFieldProps('alt_jenis')}
          error={formik.touched.alt_jenis && formik.errors.alt_jenis}
        />
        <InputForm
          label="Jumlah"
          type="text"
          {...formik.getFieldProps('alt_jumlah')}
          error={formik.touched.alt_jumlah && formik.errors.alt_jumlah}
        />
      </div>
      <InputForm
        label="Kapasitas"
        type="text"
        {...formik.getFieldProps('alt_kapasitas')}
        error={formik.touched.alt_kapasitas && formik.errors.alt_kapasitas}
      />
      <InputForm
        label="Merk/Tipe"
        type="text"
        {...formik.getFieldProps('alt_merktipe')}
        error={formik.touched.alt_merktipe && formik.errors.alt_merktipe}
      />
      <div className="grid md:grid-cols-2 md:gap-6">
        <SelectForm
          label="Kondisi"
          {...formik.getFieldProps('alt_kondisi')}
          options={options}
          error={formik.touched.alt_kondisi && formik.errors.alt_kondisi}
        />
        <InputForm
          label="Tahun Pembuatan"
          type="text"
          {...formik.getFieldProps('alt_thpembuatan')}
          error={
            formik.touched.alt_thpembuatan && formik.errors.alt_thpembuatan
          }
        />
      </div>
      <InputForm
        label="Lokasi"
        type="text"
        {...formik.getFieldProps('alt_lokasi')}
        error={formik.touched.alt_lokasi && formik.errors.alt_lokasi}
      />
      <InputForm
        label="Status Kepemilikan"
        type="text"
        {...formik.getFieldProps('alt_kepemilikan')}
        error={formik.touched.alt_kepemilikan && formik.errors.alt_kepemilikan}
      />

      <div className="flex gap-4 mt-20">
        <Button
          cN={`btn bg-sky-500 text-white  hover:bg-blue-600 ease-in duration-200 ${
            formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <Spinner /> : 'submit'}
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

export default FormPeraltan;
