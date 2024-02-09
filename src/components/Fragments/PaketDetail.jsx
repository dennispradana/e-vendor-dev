import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toasterror } from '../../utils/ToastMessage';
import TableHPS from './TableHPS';
import { ModalIL, ModalKAK, ModalRK } from '../Elements/Modal/kipjb';
import DetailDataPaket from './DetailDataPaket';
import DetailDokumenPaket from './DetailDokumenPaket';
import Spinner from '../Elements/Spinner';
import Stepper from '../Elements/Stepper';
import { panitiaService } from '../../services/panitia.service';

const PaketDetail = ({ type }) => {
  const { getDataPaket } = panitiaService();
  const { paketId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [dataPaket, setDataPaket] = useState('');
  const [loading, setLoading] = useState(false);
  const steps = ['Data Paket', 'HPS', 'Dokumen Persiapan'];
  const navigate = useNavigate();
  const [showModalKAK, setShowModalKAK] = useState(false);
  const [showModalRK, setShowModalRK] = useState(false);
  const [showModalIL, setShowModalIL] = useState(false);

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

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleFinish = () => {
    switch (type) {
      case 'kipjb':
        return (
          <button
            type="button"
            className="px-4 py-2 font-semibold text-white capitalize transition duration-200 ease-in-out bg-blue-500 cursor-pointer rounded-xl hover:bg-blue-700 hover:text-white"
            onClick={() => navigate('/paket')}
          >
            Selanjutnya
          </button>
        );
      case 'ppk':
        return (
          <button
            type="button"
            className="px-4 py-2 font-semibold text-white capitalize transition duration-200 ease-in-out bg-blue-500 cursor-pointer rounded-xl hover:bg-blue-700 hover:text-white"
            onClick={() => navigate('/daftar-paket')}
          >
            Selanjutnya
          </button>
        );
      default:
        return null;
    }
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

  const displayStep = () => {
    switch (currentStep) {
      case 1:
        return <DetailDataPaket datas={dataPaket} loading={loading} />;
      case 2:
        return <TableHPS data={dataPaket} loading={loading} />;
      case 3:
        return (
          <DetailDokumenPaket
            data={dataPaket}
            handleModalKAK={handleModalKAK}
            handleModalRK={handleModalRK}
            handleModalIL={handleModalIL}
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
        {displayStep()}
        <div className="flex gap-5 mt-6">
          {currentStep === 1 && (
            <button
              type="button"
              className="px-4 py-2 font-semibold capitalize transition duration-200 ease-in-out bg-white border-2 cursor-not-allowed text-slate-400 rounded-xl border-slate-300"
            >
              Kembali
            </button>
          )}
          {currentStep > 1 && (
            <button
              type="button"
              className="px-4 py-2 font-semibold capitalize transition duration-200 ease-in-out bg-white border-2 cursor-pointer text-slate-400 rounded-xl border-slate-300 hover:bg-slate-700 hover:text-white"
              onClick={handlePrevious}
            >
              Kembali
            </button>
          )}
          {currentStep < 3 && (
            <button
              type="button"
              className="px-4 py-2 font-semibold text-white capitalize transition duration-200 ease-in-out bg-blue-500 cursor-pointer rounded-xl hover:bg-blue-700 hover:text-white"
              onClick={handleNext}
            >
              Selanjutnya
            </button>
          )}
          {currentStep === 3 && handleFinish()}
        </div>
      </div>
      {showModalKAK && <ModalKAK close={handleModalKAK} data={dataPaket} />}
      {showModalRK && <ModalRK close={handleModalRK} data={dataPaket} />}
      {showModalIL && <ModalIL close={handleModalIL} data={dataPaket} />}
    </>
  );
};

export default PaketDetail;
