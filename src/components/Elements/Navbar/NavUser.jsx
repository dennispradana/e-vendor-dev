import React from 'react';
import { GrLogout, GrUserSettings } from 'react-icons/gr';
import { UserAvatar } from '../UserAvatar';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo.png';

const NavUser = () => {
  const { logout, user } = useAuthContext();

  return (
    <nav className="container fixed top-0 z-10 h-20 p-4 bg-slate-600">
      <div className="flex items-center justify-between w-full px-4">
        <Link to="/dashboard">
          <div className="p-1 bg-white rounded-sm">
            <img src={Logo} alt="logo" className="h-10" />
          </div>
        </Link>
        <UserAvatar
          user={user.nama}
          emailUser={user.email}
          dropdownContent={(closeDropdown) => (
            <ul>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 "
                onClick={() => closeDropdown()}
              >
                <p className="flex items-center ">
                  <span className="mr-2">
                    <GrUserSettings />
                  </span>
                  Pengaturan Akun
                </p>
              </Link>
              <Link
                className="block px-4 py-2 text-red-500 hover:bg-gray-200"
                onClick={() => {
                  closeDropdown();
                  logout();
                }}
              >
                <p className="flex items-center ">
                  <span className="mr-2">
                    <GrLogout />
                  </span>
                  Keluar
                </p>
              </Link>
            </ul>
          )}
        />
      </div>
    </nav>
  );
};

export default NavUser;
