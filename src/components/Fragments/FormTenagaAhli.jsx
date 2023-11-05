import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { FileUpload } from '../Elements/Modal/fileUpload';
import { InputForm, SelectForm, TextAreaForm } from '../Elements/Input';
import Button from '../Elements/Button';
import Spinner from '../Elements/Spinner';
import { sdmService } from '../../services/sdm.service';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { formatEditDate } from '../../utils/formatDate';

const jnsKelamin = [
  { value: 'laki-laki', label: 'Laki-Laki' },
  { value: 'perempuan', label: 'Perempuan' },
];

const kewarganegaraan = [
  { value: 'Individu WNI', label: 'Individu WNI' },
  { value: 'Individu WNA', label: 'Individu WNA' },
];

const status = [
  { value: 0, label: 'Tidak Tetap' },
  { value: 1, label: 'Tetap' },
];

const FormTenagaAhli = () => {
  const { user } = useAuthContext();
  const { postSdm, editSdm, updateSdm } = sdmService();
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [staId, setStaId] = useState('');
  const navigate = useNavigate();
  const { penyediaStpId } = useParams();
  const isEdit = penyediaStpId !== undefined;

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        try {
          const response = await editSdm(penyediaStpId);
          const pajakData = response.data;
          setData(pajakData);
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
    sta_nama: '',
    sta_npwp: '',
    sta_tgllahir: '',
    sta_jenis_kelamin: '',
    sta_telepon: '',
    sta_email: '',
    sta_alamat: '',
    sta_jabatan: '',
    sta_keahlian: '',
    sta_pendidikan: '',
    sta_kewarganegaraan: '',
    sta_pengalaman: '',
    sta_status: '',
    sta_id_attachment: '',
  };

  const validation = Yup.object({
    sta_nama: Yup.string().required('Nama harus diisi'),
    sta_npwp: Yup.string()
      .matches(
        /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\.?[0-9]{1}-?[0-9]{3}\.?[0-9]{3}$/,
        'NPWP tidak valid'
      )
      .required('NPWP harus diisi'),
    sta_tgllahir: Yup.date().required('Tanggal lahir harus diisi'),
    sta_jenis_kelamin: Yup.string().required('Pilih Salah Satu'),
    sta_telepon: Yup.string().required('No Telepone harus diisi'),
    sta_email: Yup.string()
      .required('Email harus diisi')
      .email('Format e-mail tidak valid'),
    sta_alamat: Yup.string().required('Alamat harus diisi'),
    sta_jabatan: Yup.string().required('Jabatan harus diisi'),
    sta_keahlian: Yup.string().required('Keahlian harus diisi'),
    sta_pendidikan: Yup.string().required('Pendidikan harus diisi'),
    sta_kewarganegaraan: Yup.string().required('Pilih Salah Satu'),
    sta_pengalaman: Yup.string().required('Pengalaman harus diisi'),
    sta_status: Yup.string().required('Pilih Salah Satu'),
    sta_id_attachment: Yup.string().required('belum ada file yang ter-upload'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      let message;
      if (isEdit) {
        response = await updateSdm(penyediaStpId, values);
        message = 'Update Sukses';
      } else {
        response = await postSdm(user.user_id, values);
        message = 'data Staf ditambahakan';
      }
      if (response.success) {
        localStorage.removeItem('idContent');
        formik.resetForm();
        toastsuccess(message);
        navigate('/data-penyedia/sdm');
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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = (staIdAttachment) => {
    setShowModal(false);
    setStaId(staIdAttachment);
    formik.setFieldValue('sta_id_attachment', staIdAttachment);
  };

  const handleBack = () => {
    history.back();
    localStorage.removeItem('idContent');
  };

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
    formik.setFieldValue('sta_npwp', formattedValue);
  };

  useEffect(() => {
    formik.setValues({
      sta_nama: data.sta_nama || '',
      sta_npwp: data.sta_npwp || '',
      sta_tgllahir: data.sta_tgllahir
        ? formatEditDate(new Date(data.sta_tgllahir))
        : '',
      sta_jenis_kelamin: data.sta_jenis_kelamin || '',
      sta_telepon: data.sta_telepon || '',
      sta_email: data.sta_email || '',
      sta_alamat: data.sta_alamat || '',
      sta_jabatan: data.sta_jabatan || '',
      sta_keahlian: data.sta_keahlian || '',
      sta_pendidikan: data.sta_pendidikan || '',
      sta_kewarganegaraan: data.sta_kewarganegaraan || '',
      sta_pengalaman: data.sta_pengalaman || '',
      sta_status: data.sta_status || '',
      sta_id_attachment: data.sta_id_attachment || '',
    });
  }, [data]);

  return loading ? (
    <div className="flex items-center justify-center h-[70vh]">
      <Spinner />
    </div>
  ) : (
    <>
      <form onSubmit={formik.handleSubmit}>
        <InputForm
          label="Nama"
          type="text"
          {...formik.getFieldProps('sta_nama')}
          error={formik.touched.sta_nama && formik.errors.sta_nama}
        />
        <InputForm
          label="NPWP"
          type="text"
          {...formik.getFieldProps('sta_npwp')}
          onChange={handleNPWPChange}
          error={formik.touched.sta_npwp && formik.errors.sta_npwp}
        />
        <div className="grid md:grid-cols-2 md:gap-6">
          <SelectForm
            label="Jenis Kelamain"
            {...formik.getFieldProps('sta_jenis_kelamin')}
            options={jnsKelamin}
            error={
              formik.touched.sta_jenis_kelamin &&
              formik.errors.sta_jenis_kelamin
            }
          />
          <InputForm
            label="Tanggal Lahir"
            type="date"
            {...formik.getFieldProps('sta_tgllahir')}
            error={formik.touched.sta_tgllahir && formik.errors.sta_tgllahir}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputForm
            label="E-mail"
            type="email"
            {...formik.getFieldProps('sta_email')}
            error={formik.touched.sta_email && formik.errors.sta_email}
          />
          <InputForm
            label="No Telepone"
            type="text"
            {...formik.getFieldProps('sta_telepon')}
            error={formik.touched.sta_telepon && formik.errors.sta_telepon}
          />
        </div>
        <TextAreaForm
          label="Alamat"
          {...formik.getFieldProps('sta_alamat')}
          error={formik.touched.sta_alamat && formik.errors.sta_alamat}
        />
        <div className="grid md:grid-cols-3 md:gap-6">
          <InputForm
            label="Jabatan"
            type="text"
            {...formik.getFieldProps('sta_jabatan')}
            error={formik.touched.sta_jabatan && formik.errors.sta_jabatan}
          />
          <InputForm
            label="Keahlian"
            type="text"
            {...formik.getFieldProps('sta_keahlian')}
            error={formik.touched.sta_keahlian && formik.errors.sta_keahlian}
          />
          <InputForm
            label="Pendidikan Terakhir"
            type="text"
            {...formik.getFieldProps('sta_pendidikan')}
            error={
              formik.touched.sta_pendidikan && formik.errors.sta_pendidikan
            }
          />
        </div>
        <div className="grid md:grid-cols-3 md:gap-6">
          <SelectForm
            label="Kewarganegaraan"
            {...formik.getFieldProps('sta_kewarganegaraan')}
            options={kewarganegaraan}
            error={
              formik.touched.sta_kewarganegaraan &&
              formik.errors.sta_kewarganegaraan
            }
          />
          <InputForm
            label="Pengalaman (Tahun)"
            type="text"
            {...formik.getFieldProps('sta_pengalaman')}
            error={
              formik.touched.sta_pengalaman && formik.errors.sta_pengalaman
            }
          />
          <SelectForm
            label="Status Kepegawaian"
            {...formik.getFieldProps('sta_status')}
            options={status}
            error={formik.touched.sta_status && formik.errors.sta_status}
          />
        </div>
        <div className="my-10">
          <button
            type="button"
            onClick={handleOpenModal}
            className="w-full py-2 font-bold text-white duration-200 ease-in rounded-lg bg-violet-400 hover:bg-violet-500"
          >
            Upload File
          </button>
          {formik.touched.sta_id_attachment &&
            formik.errors.sta_id_attachment && (
              <p className="mt-2 text-sm text-center text-red-500 ">
                {formik.errors.sta_id_attachment}
              </p>
            )}
        </div>
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
      {showModal && (
        <FileUpload
          close={handleCloseModal}
          Id={isEdit ? data.sta_id_attachment : staId}
        />
      )}
    </>
  );
};

export default FormTenagaAhli;
