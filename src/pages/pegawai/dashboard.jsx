import React from 'react';
import MainLayouts from '../../components/Layouts/MainLayouts';
import Breadcrumb from '../../components/Elements/Breadcrumb';
import { useAuthContext } from '../../contexts/AuthContext';
import DashboardAdm from '../../components/Fragments/DashboardAdm';
import DashboardKipbj from '../../components/Fragments/DashboardKipbj';
import DashboardPp from '../../components/Fragments/DashboardPp';
import DashboardPpk from '../../components/Fragments/DashboardPpk';
import { SkeletonItem } from '../../components/Elements/Skelekton';

const breadcrumbItems = [{ label: 'Dashboard', url: '/' }];

const Dashboard = () => {
  const { user, loading } = useAuthContext();

  const dasboardDisplay = () => {
    const role = user.usrgroup;
    switch (role) {
      case 'ADM':
        return <DashboardAdm />;
      case 'KIPBJ':
        return <DashboardKipbj />;
      case 'PP':
        return <DashboardPp />;
      case 'PPK':
        return <DashboardPpk />;
      default:
        return null;
    }
  };
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
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
            Selamat datang {user.peg_nama}
          </h1>
          <div className="py-10 rounded-md shadow-lg bg-slate-200 page-padding">
            {dasboardDisplay()}
          </div>
        </>
      )}
    </MainLayouts>
  );
};

export default Dashboard;
