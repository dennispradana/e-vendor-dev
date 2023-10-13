import React from 'react';
import Footer from '../Elements/Footer';
import { NavItems } from '../Elements/NavItems';
import { useAuthContext } from '../../contexts/AuthContext';
import { SkeletonItem } from '../Elements/Skelekton';

const SideBar = () => {
  const { user, loading } = useAuthContext();
  const adm = [
    { label: 'dashboard', link: '/dashboard' },
    { label: 'daftar pegawai', link: '/daftar-pegawai' },
    { label: 'daftar penyedia', link: '/daftar-penyedia' },
  ];
  const kipbj = [{ label: 'dashboard', link: '/dashboard' }];
  const pp = [{ label: 'dashboard', link: '/dashboard' }];
  const ppk = [{ label: 'dashboard', link: '/dashboard' }];

  const menuItems = () => {
    const role = user.usrgroup;
    switch (role) {
      case 'ADM':
        return <NavItems menuItems={adm} />;
      case 'KIPBJ':
        return <NavItems menuItems={kipbj} />;
      case 'PP':
        return <NavItems menuItems={pp} />;
      case 'PPK':
        return <NavItems menuItems={ppk} />;
      default:
        return null;
    }
  };

  return (
    <aside className="flex flex-col w-1/4 h-screen overflow-y-auto bg-gray-800">
      {loading ? (
        <div className="flex-grow pt-24 ">
          <SkeletonItem itemCount={4} cN="w-2/3 bg-gray-700 h-8" />
        </div>
      ) : (
        <div className="flex-grow pt-16">{menuItems()}</div>
      )}
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </aside>
  );
};

export default SideBar;
