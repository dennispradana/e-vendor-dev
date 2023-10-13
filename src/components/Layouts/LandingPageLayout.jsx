import React from 'react';

const LandingPageLayout = ({ children }) => {
  return (
    <div className="min-h-screen landingpage-bg">
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none max-md:flex-col md:justify-between focus:outline-none">
        <div className="w-full p-4 bg-gradient-to-r from-violet-500/50 via-pink-400/50 to-transparent backdrop-blur-sm">
          <div className="text-sm font-extrabold text-white md:text-4xl page-padding">
            <p>E-Procurement & Vendor Management System</p>
            <p>RSUD GAMBIRAN KOTA KEDIRI</p>
          </div>
        </div>
        <div className="md:pr-9">
          <div className="md:w-[25rem] w-full flex flex-col justify-center min-h-[20rem] px-4 border rounded-xl backdrop-blur-sm bg-white/20 shadow-xl py-6 gap-5">
            {children}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </div>
  );
};

export default LandingPageLayout;
