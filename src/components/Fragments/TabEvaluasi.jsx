import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { evaluasiService } from '../../services/evaluasi.service';
import { useParams } from 'react-router-dom';
import TabInformasiPaket from './TabInformasiPaket';
import TabPenawaranPeserta from './TabPenawaranPeserta';
import TabEvaluasiPenawaran from './TabEvaluasiPenawaran';
import Spinner from '../Elements/Spinner';
import { toasterror } from '../../utils/ToastMessage';

const TabEvaluasi = () => {
  const { getEvaluasi } = evaluasiService();
  const { llsId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEvaluasi(llsId);
        setData(response.data);
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <TabInformasiPaket data={data} loading={loading} />;
      case 1:
        return <TabPenawaranPeserta data={data} loading={loading} />;
      case 2:
        return <TabEvaluasiPenawaran data={data} />;
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
      <div className="p-5 mb-10 bg-white rounded-lg shadow-md">
        <Tabs
          selectedIndex={currentStep}
          onSelect={(index) => setCurrentStep(index)}
          selectedTabClassName="bg-violet-600 text-white rounded-t"
        >
          <TabList>
            {['Informasi Paket', 'Penawaran Peserta', 'Evaluasi'].map(
              (title, index) => (
                <Tab key={index}>{title}</Tab>
              )
            )}
          </TabList>
          {Array.from({ length: 3 }, (_, index) => (
            <TabPanel key={index}>
              <div className="mb-6">{renderContent()}</div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default TabEvaluasi;
