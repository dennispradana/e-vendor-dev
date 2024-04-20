import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { penyediaService } from '../../services/penyedia.service';
import { useNavigate, useParams } from 'react-router-dom';
import FormSuratPenawaran from './FormSuratPenawaran';
import Spinner from '../Elements/Spinner';
import { FileDokKirimPenawaran } from '../Elements/Modal/penyedia';
import FormPenawaranTeknis from './FormPenawaranTeknis';
import TablePenawaranHargaRkn from './TablePenawaranHargaRkn';

const TablePenawaranRkn = () => {
  const { llsId } = useParams();
  const { getKirimPenawaran } = penyediaService();
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalHarga, setShowModalHarga] = useState(false);
  const [selectedTeknisIndex, setSelectedTeknisIndex] = useState(null);
  const [selectedHargaIndex, setSelectedHargaIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getKirimPenawaran(llsId);
        setData(response.data);
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNext = async () => {
    if (currentStep === 2) {
      navigate(`/penawaran/${llsId}`);
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleOpenModal = (index) => {
    setSelectedTeknisIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModalHarga = (index) => {
    setSelectedHargaIndex(index);
    setShowModalHarga(true);
  };

  const handleCloseModalHarga = () => {
    setShowModalHarga(false);
  };

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <FormSuratPenawaran data={data} type="readOnly" />;
      case 1:
        return (
          <FormPenawaranTeknis
            data={data}
            modal={(index) => handleOpenModal(index)}
            type="readOnly"
          />
        );
      case 2:
        return (
          <TablePenawaranHargaRkn
            data={data}
            modal={(index) => handleOpenModalHarga(index)}
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
      <div className="mb-10">
        <Tabs
          selectedIndex={currentStep}
          onSelect={(index) => setCurrentStep(index)}
          selectedTabClassName="bg-violet-600 text-white rounded-t"
        >
          <TabList>
            {['Surat Penawaran', 'Penawaran Teknis', 'Penawaran Harga'].map(
              (title, index) => (
                <Tab key={index}>{title}</Tab>
              )
            )}
          </TabList>
          {Array.from({ length: 3 }, (_, index) => (
            <TabPanel key={index}>
              <div className="mb-6">{renderContent()}</div>
              <div className="flex items-center justify-between px-6">
                {currentStep === 0 && (
                  <button
                    className="px-2 py-2 text-white bg-gray-400 rounded w-[10rem]"
                    onClick={handlePrev}
                    disabled
                  >
                    Sebelumnya
                  </button>
                )}
                {currentStep > 0 && (
                  <button
                    type="button"
                    className="px-3 py-2 text-white bg-gray-400 hover:bg-gray-600 rounded w-[10rem]"
                    onClick={handlePrev}
                  >
                    Sebelumnya
                  </button>
                )}
                {currentStep <= 2 && (
                  <button
                    type="submit"
                    className="px-4 py-2 font-semibold text-white capitalize transition duration-200 ease-in-out bg-blue-500 rounded cursor-pointer hover:bg-blue-700 hover:text-white"
                    onClick={handleNext}
                  >
                    {currentStep === 2 ? 'Selesai' : 'Selanjutnya'}
                  </button>
                )}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
      {showModal && (
        <FileDokKirimPenawaran
          Id={data.checklist?.teknis?.[selectedTeknisIndex]?.dok_id_attachment}
          data={data.checklist?.teknis?.[selectedTeknisIndex]?.chk_nama}
          close={handleCloseModal}
        />
      )}
      {showModalHarga && (
        <FileDokKirimPenawaran
          data={data.checklist?.harga?.[selectedHargaIndex]?.chk_nama}
          Id={data.checklist?.harga?.[selectedHargaIndex]?.dok_id_attachment}
          close={handleCloseModalHarga}
        />
      )}
    </>
  );
};

export default TablePenawaranRkn;
