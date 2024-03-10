import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TabKontrak from './TabKontrak';
import TabPenilaianKinerja from './TabPenilaianKinerja';
import TableDetaiLelang from './TableDetaiLelang';
import { ppkService } from '../../services/ppk.service';
import { useParams } from 'react-router-dom';
import Spinner from '../Elements/Spinner';

const TabLelangPPK = () => {
  const { getDatalLelangPpk } = ppkService();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState('');
  const { llsId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDatalLelangPpk(llsId);
        setData(response.data.evaluasi);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <TableDetaiLelang type="ppk" />;
      case 1:
        return <TabKontrak />;
      case 2:
        return <TabPenilaianKinerja />;
      default:
        return null;
    }
  };

  return loading ? (
    <div className="h-[60vh] flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="p-5 mb-10 bg-white rounded-lg shadow-md">
      {data.pemenang !== null ? (
        <Tabs
          selectedIndex={currentStep}
          onSelect={(index) => setCurrentStep(index)}
          selectedTabClassName="bg-violet-600 text-white rounded-t"
        >
          <TabList>
            {['Informasi Paket', 'e-Kontrak', 'Penilaian Kinerja'].map(
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
      ) : (
        <Tabs
          selectedIndex={currentStep}
          onSelect={(index) => setCurrentStep(index)}
          selectedTabClassName="bg-violet-600 text-white rounded-t"
        >
          <TabList>
            <Tab>Informasi Paket</Tab>
          </TabList>
          <TabPanel>
            <div className="mb-6">
              <TableDetaiLelang type="ppk" />;
            </div>
          </TabPanel>
        </Tabs>
      )}
    </div>
  );
};

export default TabLelangPPK;
