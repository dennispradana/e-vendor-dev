import React, { useEffect, useState } from 'react';
import {
  CheckBoxForm,
  InputForm,
  SelectForm,
  TextAreaForm,
} from '../Elements/Input';
import Button from '../Elements/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { pegawaiService } from '../../services/pegawai.service';
import { useNavigate, useParams } from 'react-router-dom';
import { SkeletonItem } from '../Elements/Skelekton';

const options = [
  { value: 'ADM', label: 'Admin' },
  { value: 'KIPBJ', label: 'Kepala Instalasi PBJ' },
  { value: 'PP', label: 'Pejabat Pengadaan' },
  { value: 'PPK', label: 'Pejabat Pembuat Komitmen' },
];

const FormPegawai = () => {
  const [loading, setLoading] = useState(true);
  const { postPegawai, editPegawai, updatePegawai } = pegawaiService();
  const { pegawaiId } = useParams();
  const isEdit = pegawaiId !== undefined;
  const navigate = useNavigate();
  let validationSchema;

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        try {
          const pegawaiData = await editPegawai(pegawaiId);
          formik.setValues({
            ...pegawaiData,
            peg_isactive: pegawaiData.peg_isactive === '1' ? true : false,
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
  }, [pegawaiId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const mappedValues = {
      ...values,
      peg_isactive: values.peg_isactive ? 1 : 0,
    };

    try {
      let response;
      let message;

      if (isEdit) {
        response = await updatePegawai(pegawaiId, mappedValues);
        message = 'Update Sukses';
        navigate('/daftar-pegawai');
      } else {
        response = await postPegawai(mappedValues);
        message = 'Submit Sukses';
        formik.resetForm();
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

  const initialValues = {
    usrgroup: '',
    peg_nama: '',
    peg_nik: '',
    peg_nip: '',
    peg_namauser: '',
    passw: '',
    peg_alamat: '',
    peg_telepon: '',
    peg_email: '',
    peg_pangkat: '',
    peg_jabatan: '',
    peg_golongan: '',
    peg_no_pbj: '',
    peg_no_sk: '',
    peg_isactive: false,
  };

  const validate = {
    usrgroup: Yup.string().required('Pilih salah satu'),
    peg_nama: Yup.string().required('Nama Pegawai harus diisi'),
    peg_nik: Yup.string()
      .matches(/^\d{16}$/, 'NIK tidak valid')
      .required('NIK harus diisi'),
    peg_nip: Yup.string()
      .matches(/^\d{18}$/, 'NIP tidak valid')
      .required('NIP Harus diisi'),
    peg_namauser: Yup.string().required('User-ID harus diisi'),
    peg_alamat: Yup.string().required('Alamat harus diisi'),
    peg_telepon: Yup.string()
      .matches(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, 'Nomor telepon tidak valid')
      .required('No Telepone harus diisi'),
    peg_email: Yup.string()
      .required('Email harus diisi')
      .email('Format e-mail tidak valid'),
    peg_pangkat: Yup.string().required('Pangkat harus diisi'),
    peg_jabatan: Yup.string().required('Jabatan harus diisi'),
    peg_golongan: Yup.string().required('Golongan harus diisi'),
    peg_no_sk: Yup.string().required('Nomor SK harus diisi'),
    peg_isactive: Yup.boolean().isTrue('Pegawai harus aktif'),
  };

  if (isEdit) {
    validationSchema = Yup.object({
      ...validate,
    });
  } else {
    validationSchema = Yup.object({
      ...validate,
      passw: Yup.string()
        .matches(/[a-z]/g, 'Harus terdapat setidaknya 1 karakter huruf Kecil')
        .matches(/[A-Z]/g, 'Harus terdapat setidaknya 1 karakter huruf besar')
        .matches(/[1-9]/g, 'Harus terdapat setidaknya 1 karakter angka')
        .matches(/^\S*$/, 'Tidak boleh terdapat karakter spasi')
        .min(6, 'Password harus lebih dari 6 karakter')
        .required('Password harus diisi'),
    });
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
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
      <SelectForm
        label="Pengangkatan Menjadi"
        {...formik.getFieldProps('usrgroup')}
        options={options}
        error={formik.touched.usrgroup && formik.errors.usrgroup}
      />
      <InputForm
        label="Nama Pegawai"
        type="text"
        {...formik.getFieldProps('peg_nama')}
        error={formik.touched.peg_nama && formik.errors.peg_nama}
      />
      <InputForm
        label="NIK"
        type="text"
        {...formik.getFieldProps('peg_nik')}
        error={formik.touched.peg_nik && formik.errors.peg_nik}
      />
      <InputForm
        label="NIP"
        type="text"
        {...formik.getFieldProps('peg_nip')}
        error={formik.touched.peg_nip && formik.errors.peg_nip}
      />
      <InputForm
        label="User-ID"
        type="text"
        {...formik.getFieldProps('peg_namauser')}
        error={formik.touched.peg_namauser && formik.errors.peg_namauser}
      />
      {!isEdit && (
        <InputForm
          label="Password"
          type="password"
          {...formik.getFieldProps('passw')}
          error={formik.touched.passw && formik.errors.passw}
        />
      )}
      <TextAreaForm
        label="Alamat"
        {...formik.getFieldProps('peg_alamat')}
        error={formik.touched.peg_alamat && formik.errors.peg_alamat}
      />
      <InputForm
        label="No. Telepon"
        type="text"
        {...formik.getFieldProps('peg_telepon')}
        error={formik.touched.peg_telepon && formik.errors.peg_telepon}
      />
      <InputForm
        label="E-mail"
        type="email"
        {...formik.getFieldProps('peg_email')}
        error={formik.touched.peg_email && formik.errors.peg_email}
      />
      <div className="grid md:gap-6 md:grid-cols-3 ">
        <InputForm
          label="Pangkat"
          type="text"
          {...formik.getFieldProps('peg_pangkat')}
          error={formik.touched.peg_pangkat && formik.errors.peg_pangkat}
        />
        <InputForm
          label="Jabatan"
          type="text"
          {...formik.getFieldProps('peg_jabatan')}
          error={formik.touched.peg_jabatan && formik.errors.peg_jabatan}
        />
        <InputForm
          label="Golongan"
          type="text"
          {...formik.getFieldProps('peg_golongan')}
          error={formik.touched.peg_golongan && formik.errors.peg_golongan}
        />
      </div>
      <div className="grid md:gap-6 md:grid-cols-2">
        <InputForm
          label="No. Sertifikat PBJ"
          type="text"
          {...formik.getFieldProps('peg_no_pbj')}
          error={formik.touched.peg_no_pbj && formik.errors.peg_no_pbj}
        />
        <InputForm
          label="Nomor SK"
          type="text"
          {...formik.getFieldProps('peg_no_sk')}
          error={formik.touched.peg_no_sk && formik.errors.peg_no_sk}
        />
      </div>
      <CheckBoxForm
        label="Aktif"
        {...formik.getFieldProps('peg_isactive')}
        error={formik.touched.peg_isactive && formik.errors.peg_isactive}
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

export default FormPegawai;
