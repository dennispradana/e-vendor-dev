import React from 'react';
import { GrLogout, GrUserSettings } from 'react-icons/gr';
import { UserAvatar } from '../UserAvatar';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const NavPeg = () => {
  const { logout, user } = useAuthContext();

  return (
    <nav className="container fixed top-0 z-10 p-4 h-14 bg-slate-600">
      <div className="flex items-center justify-between w-full px-4">
        <Link to="/dashboard">
          <div className="px-8 text-xl font-bold text-white uppercase">
            Logo
          </div>
        </Link>
        <UserAvatar
          user={user.peg_nama}
          emailUser={user.peg_email}
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

export default NavPeg;
