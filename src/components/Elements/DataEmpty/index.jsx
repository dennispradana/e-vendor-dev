import React from 'react';

const DataEmpty = ({ title, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full mb-5">
      {icon}
      <h1 className="italic font-semibold text-gray-500 capitalize lg:text-xl">
        Belum ada data {title} yang tersimpan
      </h1>
    </div>
  );
};

export default DataEmpty;
