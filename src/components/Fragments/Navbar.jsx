import React from 'react';
import NavAuth from '../Elements/Navbar/NavAuth';
import NavUser from '../Elements/Navbar/NavUser';

const Navbar = ({ type }) => {
  const handleBack = () => {
    history.back();
  };

  const navbarComponents = {
    auth: <NavAuth />,
    user: <NavUser />,
  };

  const selectedComponent = navbarComponents[type] || (
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

  return selectedComponent;
};

export default Navbar;
