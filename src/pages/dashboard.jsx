import React from 'react';
import MainLayouts from '../components/Layouts/MainLayouts';
import { useAuthContext } from '../contexts/AuthContext';
import DashboardAdm from '../components/Fragments/DashboardAdm';
import DashboardKipbj from '../components/Fragments/DashboardKipbj';
import DashboardPp from '../components/Fragments/DashboardPp';
import DashboardPpk from '../components/Fragments/DashboardPpk';
import { SkeletonItem } from '../components/Elements/Skelekton';
import DashboardRkn from '../components/Fragments/DashboardRkn';

const Dashboard = () => {
  const { user, loading } = useAuthContext();

  const dashboardComponents = {
    ADM: <DashboardAdm />,
    KIPBJ: <DashboardKipbj />,
    PP: <DashboardPp />,
    PPK: <DashboardPpk />,
    RKN: <DashboardRkn />,
  };

  const dasboardDisplay = dashboardComponents[user.role];

  return (
    <MainLayouts type={user.role}>
      {loading ? (
        <>
          <SkeletonItem itemCount={1} cN="bg-gray-200 h-6 w-1/4" />
          <div className="py-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
            <SkeletonItem itemCount={10} cN="bg-gray-200 h-8" />
          </div>
        </>
      ) : (
        <>
          <h1 className="mb-5 text-xl font-bold text-black capitalize">
            Selamat datang {user.nama}
          </h1>
          <div className="py-10 my-5 rounded-md shadow-lg page-padding">
            {dasboardDisplay}
          </div>
        </>
      )}
    </MainLayouts>
  );
};

export default Dashboard;
