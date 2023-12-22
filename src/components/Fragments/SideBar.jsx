import React from 'react';
import Footer from '../Elements/Footer';
import { NavItems } from '../Elements/NavItems';
import { useAuthContext } from '../../contexts/AuthContext';
import { SkeletonItem } from '../Elements/Skelekton';

const SideBar = () => {
  const { user, loading } = useAuthContext();

  const sidebarMenus = {
    ADM: [
      { label: 'dashboard', link: '/dashboard' },
      { label: 'daftar pegawai', link: '/daftar-pegawai' },
      { label: 'daftar penyedia', link: '/daftar-penyedia' },
    ],
    KIPBJ: [
      { label: 'dashboard', link: '/dashboard' },
      { label: 'daftar paket', link: '/paket' },
      { label: 'daftar panitia', link: '/daftar-panitia' },
      // { label: 'daftar pejabat pengadaan', link: '/daftar-pp' },
    ],
    PP: [{ label: 'dashboard', link: '/dashboard' }],
    PPK: [
      { label: 'dashboard', link: '/dashboard' },
      { label: 'daftar paket', link: '/daftar-paket' },
    ],
    RKN: [
      { label: 'dashboard', link: '/dashboard' },
      { label: 'data penyedia', link: '/data-penyedia' },
      // { label: 'daftar paket', link: '/daftar-paket' },
    ],
  };

  const displayMenu = sidebarMenus[user.role];
  return (
    <aside className="flex flex-col w-1/4 h-screen overflow-y-auto bg-gray-800">
      {loading ? (
        <div className="flex-grow pt-24 ">
          <SkeletonItem itemCount={4} cN="w-2/3 bg-gray-700 h-8" />
        </div>
      ) : (
        <div className="flex-grow pt-16">
          {displayMenu && <NavItems menuItems={displayMenu} />}
        </div>
      )}
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </aside>
  );
};

export default SideBar;
