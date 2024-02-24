import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TabKontrak from './TabKontrak';
import TabPenilaianKinerja from './TabPenilaianKinerja';
import TableDetaiLelang from './TableDetaiLelang';

const TabLelangPPK = () => {
  const [currentStep, setCurrentStep] = useState(0);

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

  return (
    <div className="p-5 mb-10 bg-white rounded-lg shadow-md">
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
    </div>
  );
};

export default TabLelangPPK;
