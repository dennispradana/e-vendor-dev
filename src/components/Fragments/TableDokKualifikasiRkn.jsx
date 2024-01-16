import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { penyediaService } from '../../services/penyedia.service';
import { toasterror } from '../../utils/ToastMessage';
import { useNavigate, useParams } from 'react-router-dom';
import { formatRp } from '../../utils/formatRupiah';
import { useFormik } from 'formik';
import TabIzinUsaha from './TabIzinUsaha';
import TabAkta from './TabAkta';
import TabManajerial from './TabManajerial';
import TabTenagaAhli from './TabTenagaAhli';
import TabPengalaman from './TabPengalaman';
import TabPeralatan from './TabPeralatan';
import TabPajak from './TabPajak';
import Spinner from '../Elements/Spinner';
import { ModalUploadFile } from '../Elements/Modal/penyedia';

const TableDokKualifikasiRkn = () => {
  const { llsId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const { getDokKualifikasi } = penyediaService();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getDokKualifikasi(llsId);
      setData(response.data);
    } catch (error) {
      toasterror(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initialValues = {
    izinusaha: data.izinusaha?.map((item) => ({
      ius_id: item.ius_id || '',
    })),
    landasanhukum: data.landasanhukum?.map((item) => ({
      lhkp_id: item.lhkp_id || '',
    })),
    manajerial: data.manajerial?.map((item) => ({
      id_manajerial: item.id_manajerial || '',
    })),
    stafahli: data.stafahli?.map((item) => ({
      stp_id: item.stp_id || '',
    })),
    pengalaman: data.pengalaman?.map((item) => ({
      pen_id: item.pen_id || '',
    })),
    peralatan: data.peralatan?.map((item) => ({
      id_prl: item.id_prl || '',
    })),
    pajak: data.pajak?.map((item) => ({
      pjk_id: item.pjk_id || '',
    })),
    lainya: data.lainya?.dok_id_attachment || '',
  };

  const formik = useFormik({
    initialValues: initialValues,
  });

  useEffect(() => {
    formik.setValues({
      izinusaha: data.izinusaha?.map((item) => ({
        ius_id: item.ius_id || '',
      })),
      landasanhukum: data.landasanhukum?.map((item) => ({
        lhkp_id: item.lhkp_id || '',
      })),
      manajerial: data.manajerial?.map((item) => ({
        id_manajerial: item.id_manajerial || '',
      })),
      stafahli: data.stafahli?.map((item) => ({
        stp_id: item.stp_id || '',
      })),
      pengalaman: data.pengalaman?.map((item) => ({
        pen_id: item.pen_id || '',
      })),
      peralatan: data.peralatan?.map((item) => ({
        id_prl: item.id_prl || '',
      })),
      pajak: data.pajak?.map((item) => ({
        pjk_id: item.pjk_id || '',
      })),
      lainya: data.lainya?.dok_id_attachment || '',
    });
  }, [data]);

  const handleNext = async () => {
    if (currentStep === 7) {
      navigate(`/penawaran/${llsId}`);
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const RenderDataLelang = () => {
    return (
      <table className="w-full mb-10 text-sm text-left border border-collapse">
        <tbody>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">Kode Paket</th>
            <td className="px-4 py-2 border-b">{data.lelang?.lls_id}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">Nama Paket</th>
            <td className="px-4 py-2 border-b">{data.lelang?.pkt_nama}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">Nilai HPS</th>
            <td className="px-4 py-2 border-b">
              {formatRp(data.lelang?.pkt_hps)}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <TabIzinUsaha type="readOnly" formik={formik} />;
      case 1:
        return <TabAkta type="readOnly" formik={formik} />;
      case 2:
        return <TabManajerial type="readOnly" formik={formik} />;
      case 3:
        return <TabTenagaAhli type="readOnly" formik={formik} />;
      case 4:
        return <TabPengalaman type="readOnly" formik={formik} />;
      case 5:
        return <TabPeralatan type="readOnly" formik={formik} />;
      case 6:
        return <TabPajak type="readOnly" formik={formik} />;
      case 7:
        return (
          <div className="my-10 min-h-[40vh]">
            <button
              type="button"
              onClick={handleModal}
              className="w-full py-2 font-bold text-white duration-200 ease-in rounded-lg bg-violet-400 hover:bg-violet-500"
            >
              Lihat File
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return loading ? (
    <div className="flex items-center justify-center h-[70vh]">
      <Spinner />
    </div>
  ) : (
    <>
      <div className="mb-10">
        <RenderDataLelang />
        <Tabs
          selectedIndex={currentStep}
          onSelect={(index) => setCurrentStep(index)}
          selectedTabClassName="bg-violet-600 text-white rounded-t"
        >
          <TabList>
            {[
              'Izin Usaha',
              'Akta',
              'Manajerial',
              'Tenaga Ahli',
              'Pengalaman',
              'Peralatan',
              'Pajak',
              'Kualifikasi Lainya',
            ].map((title, index) => (
              <Tab key={index}>{title}</Tab>
            ))}
          </TabList>
          {Array.from({ length: 8 }, (_, index) => (
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
                {currentStep <= 7 && (
                  <button
                    type="submit"
                    className={`px-4 py-2 font-semibold text-white capitalize transition duration-200 ease-in-out bg-blue-500 cursor-pointer rounded hover:bg-blue-700 hover:text-white `}
                    onClick={handleNext}
                  >
                    {currentStep === 7 ? 'Selesai' : 'Selanjutnya'}
                  </button>
                )}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
      {showModal && <ModalUploadFile close={handleModal} data={data} />}
    </>
  );
};

export default TableDokKualifikasiRkn;
