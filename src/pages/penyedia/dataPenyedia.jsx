import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayouts from '../../components/Layouts/MainLayouts';
import { TabsBar } from '../../components/Elements/Tabsbar';
import {
  FaUserEdit,
  FaTools,
  FaFileInvoiceDollar,
  FaUserTie,
  FaRegPaperPlane,
} from 'react-icons/fa';
import { FaPersonDigging, FaLandmark, FaCalendarCheck } from 'react-icons/fa6';

const DataPenyedia = () => {
  const tabLists = [
    {
      label: 'identitas',
      url: '/data-penyedia/identitas',
      icon: <FaUserEdit size="1rem" className="hidden 2xl:block" />,
    },
    {
      label: 'Izin usaha',
      url: '/data-penyedia/izin-usaha',
      icon: <FaLandmark size="1rem" className="hidden 2xl:block" />,
    },
    {
      label: 'Akta',
      url: '/data-penyedia/akta',
      icon: <FaCalendarCheck size="1rem" className="hidden 2xl:block" />,
    },
    {
      label: 'Manajerial',
      url: '/data-penyedia/manajerial',
      icon: <FaUserTie size="1rem" className="hidden 2xl:block" />,
    },
    {
      label: 'Tenaga ahli',
      url: '/data-penyedia/sdm',
      icon: <FaPersonDigging size="1.2rem" className="hidden 2xl:block" />,
    },
    {
      label: 'pengalaman',
      url: '/data-penyedia/pengalaman',
      icon: <FaRegPaperPlane size="1rem" className="hidden 2xl:block" />,
    },
    {
      label: 'peralatan',
      url: '/data-penyedia/peralatan',
      icon: <FaTools size="1rem" className="hidden 2xl:block" />,
    },
    {
      label: 'pajak',
      url: '/data-penyedia/pajak',
      icon: <FaFileInvoiceDollar className="hidden 2xl:block" />,
    },
  ];

  return (
    <MainLayouts type="RKN">
      <TabsBar items={tabLists} />
      <div className="pb-10">
        <Outlet />
      </div>
    </MainLayouts>
  );
};

export default DataPenyedia;
