import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { paketService } from '../../services/paket.service';
import TableDataPaket from './TableDataPaket';
import TableHPS from './TableHPS';
import TableDokumenPaket from './TableDokumenPaket';
import Stepper from '../Elements/Stepper';
import Spinner from '../Elements/Spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  ModalIL,
  ModalKAK,
  ModalPanita,
  ModalPegawai,
  ModalRK,
} from '../Elements/Modal/kipjb';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { panitiaService } from '../../services/panitia.service';

const FormPaketPJB = () => {
  const { inisiasiLelang } = paketService();
  const { getDataPaket, updateDataPaket } = panitiaService();
  const { paketId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [dataPaket, setDataPaket] = useState('');
  const [loading, setLoading] = useState(false);
  const steps = ['Data Paket', 'HPS', 'Dokumen Persiapan'];
  const navigate = useNavigate();
  const [showModalKAK, setShowModalKAK] = useState(false);
  const [showModalRK, setShowModalRK] = useState(false);
  const [showModalIL, setShowModalIL] = useState(false);
  const [showModalPnt, setShowModalPnt] = useState(false);
  const [showModalPeg, setShowModalPeg] = useState(false);

  const initialStepValues = {
    paket: {
      mtd_pemilihan: '',
    },
  };

  const validation = Yup.object({
    paket: Yup.object({
      mtd_pemilihan: Yup.string().required('harus di isi'),
    }),
  });

  const fetchDataPaket = async () => {
    try {
      const response = await getDataPaket(paketId);
      const paket = response.data;
      setLoading(true);
      setDataPaket(paket);
    } catch (error) {
      toasterror(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataPaket();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateDataPaket(paketId, values);
      setCurrentStep((prevStep) => prevStep + 1);
    } catch (error) {
      toasterror(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: initialStepValues,
    validationSchema: validation,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.setValues({
      paket: {
        mtd_pemilihan: dataPaket.paket?.mtd_pemilihan || '',
      },
    });
  }, [dataPaket]);

  const handleDataPaketUpadate = async () => {
    await fetchDataPaket();
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleModalKAK = () => {
    setShowModalKAK(!showModalKAK);
  };
  const handleModalRK = () => {
    setShowModalRK(!showModalRK);
  };
  const handleModalIL = () => {
    setShowModalIL(!showModalIL);
  };
  const handleModalPnt = async () => {
    await fetchDataPaket();
    setShowModalPnt(!showModalPnt);
  };
  const handleModalPeg = async () => {
    await fetchDataPaket();
    setShowModalPeg(!showModalPeg);
  };

  const handleLelang = async () => {
    try {
      const response = await inisiasiLelang(paketId);
      if (response) {
        toastsuccess('Paket Berhasil di Proses');
        navigate('/paket');
      } else {
        toasterror('terjadi kesalahan');
      }
    } catch (error) {
      toasterror(error.message);
    } finally {
      setLoading(false);
    }
  };

  const displayStep = () => {
    switch (currentStep) {
      case 1:
        return <TableDataPaket datas={dataPaket} formik={formik} />;
      case 2:
        return <TableHPS data={dataPaket} loading={loading} />;
      case 3:
        return (
          <TableDokumenPaket
            data={dataPaket}
            handleModalKAK={handleModalKAK}
            handleModalRK={handleModalRK}
            handleModalIL={handleModalIL}
            handlePilihPanitia={handleModalPnt}
            handlePilihPegawai={handleModalPeg}
            loading={loading}
          />
        );

      default:
        return null;
    }
  };

  return loading ? (
    <div className="h-[60vh] flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <>
      <div className="py-10 mb-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
        <Stepper steps={steps} currentStep={currentStep} />
        <form onSubmit={formik.handleSubmit}>
          {displayStep()}
          <div className="flex gap-5 mt-6">
            {currentStep === 1 && (
              <button
                type="button"
                className={`px-4 py-2 font-semibold capitalize transition duration-200 ease-in-out bg-white border-2 cursor-not-allowed text-slate-400 rounded-xl border-slate-300 ${
                  formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={formik.isSubmitting}
              >
                Kembali
              </button>
            )}
            {currentStep > 1 && (
              <button
                type="button"
                className={`px-4 py-2 font-semibold capitalize transition duration-200 ease-in-out bg-white border-2 cursor-pointer text-slate-400 rounded-xl border-slate-300 hover:bg-slate-700 hover:text-white ${
                  formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handlePrevious}
                disabled={formik.isSubmitting}
              >
                Kembali
              </button>
            )}
            {currentStep === 1 && (
              <button
                type="submit"
                className={`px-4 py-2 font-semibold text-white capitalize transition duration-200 ease-in-out bg-blue-500 cursor-pointer rounded-xl hover:bg-blue-700 hover:text-white ${
                  formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={formik.isSubmitting}
                onClick={handleDataPaketUpadate}
              >
                Selanjutnya
              </button>
            )}
            {currentStep === 2 && (
              <button
                type="button"
                className={`px-4 py-2 font-semibold text-white capitalize transition duration-200 ease-in-out bg-blue-500 cursor-pointer rounded-xl hover:bg-blue-700 hover:text-white ${
                  formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => {
                  handleNext();
                  handleDataPaketUpadate();
                }}
                disabled={formik.isSubmitting}
              >
                Selanjutnya
              </button>
            )}
            {currentStep === 3 && (
              <button
                type="button"
                className={`px-4 py-2 font-semibold text-white capitalize transition duration-200 ease-in-out bg-blue-500 cursor-pointer rounded-xl hover:bg-blue-700 hover:text-white ${
                  dataPaket.pp === null && dataPaket.panitia === null
                    ? 'opacity-50'
                    : ''
                }`}
                onClick={handleLelang}
                disabled={dataPaket.pp === null && dataPaket.panitia === null}
              >
                Selesai
              </button>
            )}
          </div>
        </form>
      </div>
      {showModalKAK && <ModalKAK close={handleModalKAK} data={dataPaket} />}
      {showModalRK && <ModalRK close={handleModalRK} data={dataPaket} />}
      {showModalIL && <ModalIL close={handleModalIL} data={dataPaket} />}
      {showModalPnt && (
        <ModalPanita
          close={handleModalPnt}
          data={dataPaket}
          paket={paketId}
          updateData={handleDataPaketUpadate}
        />
      )}
      {showModalPeg && (
        <ModalPegawai
          close={handleModalPeg}
          data={dataPaket}
          paket={paketId}
          updateData={handleDataPaketUpadate}
        />
      )}
    </>
  );
};

export default FormPaketPJB;
