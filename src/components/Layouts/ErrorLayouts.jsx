import React from 'react';
import Navbar from '../Fragments/Navbar';

const ErrorLayouts = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-50">
      <Navbar />
      <div className="pt-16 page-padding">{children}</div>
    </div>
  );
};

export default ErrorLayouts;
