import React from 'react';
import NavAuth from '../Elements/Navbar/NavAuth';
import NavPeg from '../Elements/Navbar/NavPeg';

const Navbar = ({ type }) => {
  const handleBack = () => {
    history.back();
  };
  const isAuth = type === 'auth';
  const isPgawai = type === 'pegawai';
  switch (true) {
    case isAuth:
      return <NavAuth />;
    case isPgawai:
      return <NavPeg />;
    default:
      return (
        <nav className="container fixed top-0 z-10 p-4 shadow-xl h-18 bg-slate-600">
          <div className="flex items-center justify-between w-full px-4">
            <button onClick={() => handleBack()}>
              <div className="px-8 text-xl font-bold text-white uppercase">
                Logo
              </div>
            </button>
          </div>
        </nav>
      );
  }
};

export default Navbar;
