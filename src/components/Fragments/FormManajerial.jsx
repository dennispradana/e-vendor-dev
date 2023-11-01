import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { manajerialService } from '../../services/manajerial.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../Elements/Button';
import Spinner from '../Elements/Spinner';
import { InputForm, SelectForm, TextAreaForm } from '../Elements/Input';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';

const options = [
  { value: 0, label: 'Pengurus' },
  { value: 1, label: 'Pemilik' },
];

const FormManajerial = () => {
  const { user } = useAuthContext();
  const { postManajer, editManajer, updateManajer } = manajerialService();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { penyediaManajerId } = useParams();
  const isEdit = penyediaManajerId !== undefined;

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        try {
          const response = await editManajer(penyediaManajerId);
          const manajerData = response.data;
          setData(manajerData);
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
    mjr_jenis: '',
    mjr_nama: '',
    mjr_npwp: '',
    mjr_ktp: '',
    mjr_alamat: '',
  };

  const validation = Yup.object({
    mjr_jenis: Yup.string().required('Nomor Akta harus diisi'),
    mjr_nama: Yup.string().required('Nama harus diisi'),
    mjr_npwp: Yup.string()
      .matches(
        /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\.?[0-9]{1}-?[0-9]{3}\.?[0-9]{3}$/,
        'NPWP tidak valid'
      )
      .required('NPWP harus diisi'),
    mjr_ktp: Yup.string()
      .matches(
        /^\d{6}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$/,
        'KTP Tidak Valid'
      )
      .required('KTP harus diisi'),
    mjr_alamat: Yup.string().required('Alamat harus diisi'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      let message;
      if (isEdit) {
        response = await updateManajer(penyediaManajerId, values);
        message = 'Update Sukses';
      } else {
        response = await postManajer(user.user_id, values);
        message = 'Izin Usaha ditambahakan';
      }
      if (response.success) {
        formik.resetForm();
        toastsuccess(message);
        navigate('/data-penyedia/manajerial');
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

  const formatNpwp = (value) => {
    if (typeof value === 'string') {
      return value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})/,
        '$1.$2.$3.$4-$5.$6'
      );
    }
    return value;
  };

  const handleNPWPChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatNpwp(rawValue);

    formik.setFieldValue('mjr_npwp', formattedValue);
  };

  const handleBack = () => {
    history.back();
  };

  useEffect(() => {
    formik.setValues({
      mjr_jenis: data.mjr_jenis || '',
      mjr_nama: data.mjr_nama || '',
      mjr_npwp: data.mjr_npwp || '',
      mjr_ktp: data.mjr_ktp || '',
      mjr_alamat: data.mjr_alamat || '',
    });
  }, [data]);
  console.log(data);

  return loading ? (
    <div className="flex items-center justify-center h-[70vh]">
      <Spinner />
    </div>
  ) : (
    <form onSubmit={formik.handleSubmit}>
      <SelectForm
        label="Kepemilikan"
        {...formik.getFieldProps('mjr_jenis')}
        options={options}
        error={formik.touched.mjr_jenis && formik.errors.mjr_jenis}
      />
      <InputForm
        label="Nama"
        type="text"
        {...formik.getFieldProps('mjr_nama')}
        error={formik.touched.mjr_nama && formik.errors.mjr_nama}
      />
      <div className="grid md:grid-cols-2 md:gap-6">
        <InputForm
          label="NPWP"
          type="text"
          {...formik.getFieldProps('mjr_npwp')}
          onChange={handleNPWPChange}
          error={formik.touched.mjr_npwp && formik.errors.mjr_npwp}
        />

        <InputForm
          label="No. KTP"
          type="text"
          {...formik.getFieldProps('mjr_ktp')}
          error={formik.touched.mjr_ktp && formik.errors.mjr_ktp}
        />
      </div>
      <TextAreaForm
        label="Alamat"
        {...formik.getFieldProps('mjr_alamat')}
        error={formik.touched.mjr_alamat && formik.errors.mjr_alamat}
      />
      <div className="flex gap-4 mt-20">
        <Button
          cN={`btn bg-sky-500 text-white  hover:bg-blue-600 ease-in duration-200 ${
            formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <Spinner /> : isEdit ? 'Update' : 'Submit'}
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

export default FormManajerial;
