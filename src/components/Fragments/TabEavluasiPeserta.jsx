import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { evaluasiService } from '../../services/evaluasi.service';
import TabEvaluasiKualifikasi from './TabEvaluasiKualifikasi';
import TabEvaluasiAdministrasi from './TabEvaluasiAdministrasi';
import TabEvaluasiTeknis from './TabEvaluasiTeknis';
import TabEvaluasiHargaBiaya from './TabEvaluasiHargaBiaya';
import Spinner from '../Elements/Spinner';
import { IoArrowBackOutline } from 'react-icons/io5';

const TabEavluasiPeserta = () => {
  const { psrId } = useParams();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const { getDokEvaluasiPeserta } = evaluasiService();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getDokEvaluasiPeserta(psrId);
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

  const handleUpdate = async () => {
    await fetchData();
  };

  const handleBack = () => navigate(-1);

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <TabEvaluasiKualifikasi data={data} onUpdate={handleUpdate} />;
      case 1:
        return <TabEvaluasiAdministrasi data={data} onUpdate={handleUpdate} />;
      case 2:
        return <TabEvaluasiTeknis data={data} onUpdate={handleUpdate} />;
      case 3:
        return <TabEvaluasiHargaBiaya data={data} onUpdate={handleUpdate} />;
      default:
        return null;
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between">
        <p>{data.peserta?.rkn_nama}</p>
        <button
          className="flex items-center gap-2 px-2 py-1 text-white bg-gray-500 rounded hover:bg-gray-600"
          onClick={() => handleBack()}
        >
          <IoArrowBackOutline />
          kembali
        </button>
      </div>
    );
  };

  return loading ? (
    <div className="h-[60vh] flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <>
      <div className="p-5 mb-10 bg-white rounded-lg shadow-md">
        <div className="my-4">
          <table className="w-full text-sm text-left border border-collapse">
            <tbody>
              <tr>
                <th className="w-1/4 px-4 py-2 font-normal bg-yellow-100 border-r">
                  Nama Peserta
                </th>
                <td className="px-4 py-2 capitalize">{renderHeader()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Tabs
          selectedIndex={currentStep}
          onSelect={(index) => setCurrentStep(index)}
          selectedTabClassName="bg-violet-600 text-white rounded-t"
        >
          <TabList>
            {[
              'Evaluasi Kualifikasi',
              'Evaluasi Administrasi',
              'Evaluasi Teknis',
              'Evaluasi Harga Biaya',
            ].map((title, index) => (
              <Tab key={index}>{title}</Tab>
            ))}
          </TabList>

          {Array.from({ length: 4 }, (_, index) => (
            <TabPanel key={index}>
              <div className="px-4 py-2 mb-6 ">{renderContent()}</div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default TabEavluasiPeserta;
