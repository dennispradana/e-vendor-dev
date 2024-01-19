import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TableListPaketDown from './TableListPaketDown';
import TableListPaketUp from './TableListPaketUp';

const DashboardPp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <TableListPaketDown type="evaluasi" />;
      case 1:
        return <TableListPaketUp type="evaluasi" />;
      default:
        return null;
    }
  };
  return (
    <>
      <Tabs
        selectedIndex={currentStep}
        onSelect={(index) => setCurrentStep(index)}
        selectedTabClassName="bg-violet-600 text-white rounded-t"
      >
        <TabList>
          {['Kurang Dari 200 Juta', 'Lebih Dari 200 Juta'].map(
            (title, index) => (
              <Tab key={index}>{title}</Tab>
            )
          )}
        </TabList>
        {Array.from({ length: 2 }, (_, index) => (
          <TabPanel key={index}>
            <div className="mb-6">{renderContent()}</div>
          </TabPanel>
        ))}
      </Tabs>
    </>
  );
};

export default DashboardPp;
