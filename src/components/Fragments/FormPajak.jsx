import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from '../Elements/Modal/fileUpload';
import { InputForm, SelectForm, TextAreaForm } from '../Elements/Input';
import Button from '../Elements/Button';
import Spinner from '../Elements/Spinner';
const FormPajak = () => {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [pjkId, setPjkId] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    pjk_jenis: '',
    pjk_no: '',
    pjk_tahun: '',
    pjk_tanggal: '',
    pjk_id_attachment: '',
  };

  const validation = Yup.object({
    pjk_jenis: Yup.string().required('Jenis Laporan Pajak harus diisi'),
    pjk_no: Yup.string().required(
      'Nomor Bukti Penerimaan Pajak Pajak harus diisi'
    ),
    pjk_tahun: Yup.string().required('Tahun Masa Pajak Pajak harus diisi'),
    pjk_tanggal: Yup.date().required(
      'Tanggal Bukti Penerimaan Pajak harus diisi'
    ),
    pjk_id_attachment: Yup.string().required('belum ada file yang ter-upload'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = (pjkIdAttachment) => {
    setShowModal(false);
    setPjkId(pjkIdAttachment);
    formik.setFieldValue('pjk_id_attachment', pjkIdAttachment);
  };

  const handleBack = () => {
    history.back();
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <InputForm
          label="Jenis Laporan Pajak"
          type="text"
          {...formik.getFieldProps('pjk_jenis')}
          error={formik.touched.pjk_jenis && formik.errors.pjk_jenis}
        />
        <InputForm
          label="Nomor Bukti Penerimaan Pajak"
          type="text"
          {...formik.getFieldProps('pjk_no')}
          error={formik.touched.pjk_no && formik.errors.pjk_no}
        />
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputForm
            label="Tahun Masa Pajak"
            type="text"
            {...formik.getFieldProps('pjk_tahun')}
            error={formik.touched.pjk_tahun && formik.errors.pjk_tahun}
          />
          <InputForm
            label="Tanggal Bukti Penerimaan Pajak"
            type="date"
            {...formik.getFieldProps('pjk_tanggal')}
            error={formik.touched.pjk_tanggal && formik.errors.pjk_tanggal}
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
          {formik.touched.pjk_id_attachment &&
            formik.errors.pjk_id_attachment && (
              <p className="mt-2 text-sm text-center text-red-500 ">
                {formik.errors.pjk_id_attachment}
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
      {showModal && <FileUpload close={handleCloseModal} Id={pjkId} />}
    </>
  );
};

export default FormPajak;
