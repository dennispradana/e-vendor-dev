import React from 'react';
import Navbar from '../Fragments/Navbar';
import SideBar from '../Fragments/SideBar';

const SettingRknLayout = ({ children }) => {
  return (
    <div className="container">
      <Navbar />
      <div className="flex w-full h-screen">
        <SideBar />
        <main className="w-3/4 pt-20 overflow-y-auto page-padding">
          <div className="p-6 mb-6 border rounded-lg shadow-lg">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default SettingRknLayout;
