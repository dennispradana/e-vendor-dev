import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../Elements/Button';
import Spinner from '../Elements/Spinner';
import { InputForm } from '../Elements/Input';
import { FileUpload } from '../Elements/Modal/fileUpload';
import { useAuthContext } from '../../contexts/AuthContext';
import { aktaService } from '../../services/akta.service';
import { useNavigate, useParams } from 'react-router-dom';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { formatEditDate } from '../../utils/formatDate';

const FormAkta = () => {
  const { user } = useAuthContext();
  const { postAkta, editAkta, updateAkta } = aktaService();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [lhkpId, setLhkpId] = useState('');
  const navigate = useNavigate();
  const { penyediaLhkpId } = useParams();
  const isEdit = penyediaLhkpId !== undefined;

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        try {
          const response = await editAkta(penyediaLhkpId);
          const aktaData = response.data;
          setData(aktaData);
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
    lhkp_no: '',
    lhkp_tanggal: '',
    lhkp_notaris: '',
    lhkp_id_attachment: '',
  };

  const validation = Yup.object({
    lhkp_no: Yup.string().required('Nomor Akta harus diisi'),
    lhkp_id_attachment: Yup.string().required('belum ada file yang ter-upload'),
    lhkp_notaris: Yup.string().required('Nama Notaris harus diisi'),
    lhkp_tanggal: Yup.date().required('Tanggal harus diisi'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      let message;
      if (isEdit) {
        response = await updateAkta(penyediaLhkpId, values);
        message = 'Update Sukses';
      } else {
        response = await postAkta(user.user_id, values);
        message = 'Izin Usaha ditambahakan';
      }
      if (response.success) {
        localStorage.removeItem('idContent');
        formik.resetForm();
        toastsuccess(message);
        navigate('/data-penyedia/akta');
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

  const handleCloseModal = (lhkpIdAttachment) => {
    setShowModal(false);
    setLhkpId(lhkpIdAttachment);
    formik.setFieldValue('lhkp_id_attachment', lhkpIdAttachment);
  };

  const handleBack = () => {
    history.back();
    localStorage.removeItem('idContent');
  };

  useEffect(() => {
    formik.setValues({
      lhkp_no: data.lhkp_no || '',
      lhkp_notaris: data.lhkp_notaris || '',
      lhkp_tanggal: data.lhkp_tanggal
        ? formatEditDate(new Date(data.lhkp_tanggal))
        : '',
      lhkp_id_attachment: data.lhkp_id_attachment || '',
    });
  }, [data]);

  useEffect(() => {
    return () => {
      localStorage.removeItem('idContent');
    };
  }, []);

  return loading ? (
    <div className="flex items-center justify-center h-[70vh]">
      <Spinner />
    </div>
  ) : (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputForm
            label="No Akta"
            type="text"
            {...formik.getFieldProps('lhkp_no')}
            error={formik.touched.lhkp_no && formik.errors.lhkp_no}
          />

          <InputForm
            label="Tanggal Akta"
            type="date"
            {...formik.getFieldProps('lhkp_tanggal')}
            error={formik.touched.lhkp_tanggal && formik.errors.lhkp_tanggal}
          />
        </div>
        <InputForm
          label="Nama Notaris"
          type="text"
          {...formik.getFieldProps('lhkp_notaris')}
          error={formik.touched.lhkp_notaris && formik.errors.lhkp_notaris}
        />
        <div className="my-10">
          <button
            type="button"
            onClick={handleOpenModal}
            className="w-full py-2 font-bold text-white duration-200 ease-in rounded-lg bg-violet-400 hover:bg-violet-500"
          >
            Upload File
          </button>
          {formik.touched.lhkp_id_attachment &&
            formik.errors.lhkp_id_attachment && (
              <p className="mt-2 text-sm text-center text-red-500 ">
                {formik.errors.lhkp_id_attachment}
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
          Id={isEdit ? data.lhkp_id_attachment : lhkpId}
        />
      )}
    </>
  );
};

export default FormAkta;
