import React from 'react';
import Navbar from '../Fragments/Navbar';
import SideBar from '../Fragments/SideBar';

const MainLayouts = ({ children, type }) => {
  return (
    <div className="container">
      <Navbar type="user" />
      <div
        className={`flex h-screen ${
          type === 'RKN' ? 'bg-white' : 'bg-sky-50'
        } `}
      >
        <SideBar />
        <main className="flex-1 pt-24 overflow-y-auto page-padding">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayouts;
