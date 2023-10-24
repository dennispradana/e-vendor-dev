import React from 'react';
import Navbar from '../Fragments/Navbar';
import Footer from '../Elements/Footer';

const SettingPegLayout = ({ children }) => {
  return (
    <div className="container bg-slate-50">
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow w-1/2 pt-16 mx-auto page-padding ">
          {children}
        </div>
        <div className="flex-shrink-0">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SettingPegLayout;
