import React from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import { TabsBar } from '../../../components/Elements/Tabsbar';
import { Outlet } from 'react-router';

const DataPaket = () => {
  const tabLists = [
    {
      label: 'Kurang Dari 200 Juta',
      url: '/data-paket/down',
    },
    {
      label: 'Lebih Dari 200 Juta',
      url: '/data-paket/up',
    },
  ];
  return (
    <MainLayouts>
      <TabsBar items={tabLists} />
      <div className="pb-10">
        <Outlet />
      </div>
    </MainLayouts>
  );
};

export default DataPaket;
