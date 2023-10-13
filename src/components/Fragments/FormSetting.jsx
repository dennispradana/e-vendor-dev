import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../Elements/Button';
import Modal from '../Elements/Modal';
import Avatar from '../../assets/avatar.svg';
import { userProfile } from '../../services/profile.service';
import { useAuthContext } from '../../contexts/AuthContext';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import Spinner from '../Elements/Spinner';

const FormSetting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState({});
  const { getProfilePegawai, updateProfilePegawai } = userProfile();
  const { user } = useAuthContext();

  const initialValues = {
    peg_nik: '',
    peg_nip: '',
    peg_nama: '',
    peg_alamat: '',
    peg_telepon: '',
    peg_email: '',
  };

  const validation = Yup.object({
    peg_nama: Yup.string().required('Nama Pegawai harus diisi'),
    peg_nik: Yup.string()
      .matches(/^\d{16}$/, 'NIK tidak valid')
      .required('NIK harus diisi'),
    peg_nip: Yup.string()
      .matches(/^\d{18}$/, 'NIP tidak valid')
      .required('NIP Harus diisi'),
    peg_alamat: Yup.string().required('Alamat harus diisi'),
    peg_telepon: Yup.string()
      .matches(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, 'Nomor telepon tidak valid')
      .required('No Telepone harus diisi'),
    peg_email: Yup.string()
      .required('Alamat harus diisi')
      .email('Format e-mail tidak valid'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateProfilePegawai(user.peg_id, values);
      toastsuccess('Update Successful');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfilePegawai(user.peg_id);
        setDataUser(response);
        setLoading(false);
      } catch (error) {
        toasterror(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    formik.setValues({
      peg_nik: dataUser.peg_nik || '',
      peg_nip: dataUser.peg_nip || '',
      peg_nama: dataUser.peg_nama || '',
      peg_alamat: dataUser.peg_alamat || '',
      peg_telepon: dataUser.peg_telepon || '',
      peg_email: dataUser.peg_email || '',
    });
  }, [dataUser]);

  const handleBack = () => {
    history.back();
    setIsModalOpen(false);
  };

  const handleContinue = () => {
    setIsModalOpen(false);
  };

  return loading ? (
    <div className="flex items-center justify-center h-[80vh]">
      <Spinner />
    </div>
  ) : (
    <div className="py-10">
      <div className="flex items-center justify-center">
        <div className="p-4 mr-4 bg-gray-300 rounded-full">
          <img className=" w-[4rem] h-[4rem]" src={Avatar} alt="profile" />
        </div>
        <div>
          <h1 className="text-2xl uppercase">{dataUser.peg_namauser}</h1>
          <p className="text-sm italic cursor-pointer text-sky-500">
            {dataUser.usrgroup}-{dataUser.peg_id}
          </p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-row items-start mt-5">
          <label className="w-32 pt-[5px] pr-4 font-bold text-right text-gray-700">
            Nama
          </label>
          <div className="flex-1">
            <input
              type="text"
              className="w-full p-1 px-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
              {...formik.getFieldProps('peg_nama')}
            />
            {formik.errors && (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.peg_nama}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row items-start mt-5">
          <label className="w-32 pt-[5px] pr-4 font-bold text-right text-gray-700">
            E-Mail
          </label>
          <div className="flex-1">
            <input
              type="email"
              className="w-full p-1 px-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
              {...formik.getFieldProps('peg_email')}
            />
            {formik.errors && (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.peg_email}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row items-start mt-5">
          <label className="w-32 pt-[5px] pr-4 font-bold text-right text-gray-700">
            NIK
          </label>
          <div className="flex-1">
            <input
              type="text"
              className="w-full p-1 px-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
              {...formik.getFieldProps('peg_nik')}
            />
            {formik.errors && (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.peg_nik}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row items-start mt-5">
          <label className="w-32 pt-[5px] pr-4 font-bold text-right text-gray-700">
            NIP
          </label>
          <div className="flex-1">
            <input
              type="text"
              className="w-full p-1 px-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
              {...formik.getFieldProps('peg_nip')}
            />
            {formik.errors && (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.peg_nip}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row items-start mt-5">
          <label className="w-32 pt-1 pr-4 font-bold text-right text-gray-700">
            No. Telepon
          </label>
          <div className="flex-1">
            <input
              type="text"
              className="w-full p-1 px-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
              {...formik.getFieldProps('peg_telepon')}
            />
            {formik.errors && (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.peg_telepon}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row items-start mt-5">
          <label className="w-32 pt-1 pr-4 font-bold text-right text-gray-700">
            Alamat
          </label>
          <div className="flex-1">
            <textarea
              className="w-full p-1 px-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
              rows="3"
              {...formik.getFieldProps('peg_alamat')}
            />
            {formik.errors && (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.peg_alamat}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row items-start mt-5">
          <label className="w-32 pr-4" />
          <div className="flex-1 ">
            <Button
              cN={` text-blue-500 font-bold capitalize hover:underline hover:text-blue-600 ease-in duration-200 mr-4  ${
                formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              type="submit"
              disabled={formik.isSubmitting}
            >
              simpan
            </Button>
            <Button
              cN={` text-red-500 font-bold capitalize hover:underline hover:text-red-600 ease-in duration-200  ${
                formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              type="button"
              disabled={formik.isSubmitting}
              onClick={() => setIsModalOpen(true)}
            >
              kembali
            </Button>
          </div>
        </div>
      </form>
      {isModalOpen && (
        <Modal
          onBack={handleBack}
          onContinue={handleContinue}
          modalText=" Perbuahan belum tersimpan"
          onBackText="keluar"
          onContinueText="lanjutkan"
          showBackButton={true}
          showContinueButton={true}
        />
      )}
    </div>
  );
};

export default FormSetting;
