import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import Button from '../Elements/Button';
import Spinner from '../Elements/Spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { paketService } from '../../services/paket.service';
import FormAddAnggaran from './FormAddAnggaran';

const FormAnggaran = ({ close, onUpdate, mode }) => {
  const { postRupForAnggaran } = paketService();
  const [showModal, setShowModal] = useState(false);
  const [detailPaket, setDetailPaket] = useState({});
  const initialValues = {
    rup: '',
  };

  const validation = Yup.object({
    rup: Yup.string().required('Kode RUP Harus diisi'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await postRupForAnggaran(values);
      if (result.success) {
        setDetailPaket(result.data);
      }
    } catch (error) {
      setDetailPaket(error.message);
    } finally {
      formik.resetForm();
      setSubmitting(false);
      setShowModal(!showModal);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: handleSubmit,
  });

  const handleModal = () => {
    setShowModal(!showModal);
    close();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[40vw] mx-auto my-6">
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="p-5 border-b border-solid rounded-t border-blueGray-200">
              <div className="flex justify-end">
                <button
                  className="p-1 bg-gray-200 rounded-full hover:bg-red-500 hover:text-white"
                  onClick={close}
                >
                  <IoIosClose />
                </button>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold uppercase">Masukkan Kode RUP</p>
              </div>
            </div>
            <div className="px-6 my-6">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex items-center w-full gap-4">
                  <input
                    type="text"
                    className="w-3/4 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-violet-300"
                    placeholder="Kode RUP"
                    {...formik.getFieldProps('rup')}
                  />
                  <div>
                    <Button
                      cN={`btn text-sm bg-sky-500 text-white hover:bg-blue-600 ease-in duration-200 ${
                        formik.isSubmitting
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? (
                        <Spinner />
                      ) : mode === 'add' ? (
                        'submit'
                      ) : (
                        'update'
                      )}
                    </Button>
                  </div>
                </div>
                {formik.errors && (
                  <p className="mt-2 text-sm italic text-red-500">
                    {formik.errors.rup}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
      {showModal && (
        <FormAddAnggaran
          close={handleModal}
          detail={detailPaket}
          onUpdate={onUpdate}
          mode={mode}
        />
      )}
    </>
  );
};

export default FormAnggaran;
