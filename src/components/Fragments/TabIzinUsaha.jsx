import React from 'react';
import { Link } from 'react-router-dom';

const TabIzinUsaha = () => {
  return (
    <>
      <div className="flex items-center justify-between pb-4 ">
        <div className="relative">
          <label htmlFor="table-search" className="sr-only">
            Cari
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 md:w-80 bg-gray-50 focus:outline-violet-300"
              placeholder="Cari Data Pegawai"
              //   value={searchTerm}
              //   onChange={handleSearch}
              //   autoFocus
            />
          </div>
        </div>
        <div>
          <Link
            to="tambah-izin-usaha"
            className="px-4 py-3 font-semibold capitalize transition duration-200 ease-in-out rounded-lg cursor-pointer text-gray-50 bg-violet-400 hover:bg-slate-800 hover:text-white"
          >
            tambah data
          </Link>
        </div>
      </div>
      <div className="relative flex flex-col h-[60vh] overflow-x-auto rounded-lg">
        <div className="flex-grow">
          <table className="w-full text-sm text-left text-gray-600 md:text-base">
            <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
              <tr role="row" className="text-center border border-gray-200">
                <th className="px-4 py-3 border border-gray-200">No</th>
                <th className="px-4 py-3 border border-gray-200">Izin Usaha</th>
                <th className="px-4 py-3 border border-gray-200">
                  Nomor Surat
                </th>
                <th className="px-4 py-3 border border-gray-200">
                  Berlaku Sampai
                </th>
                <th className="px-4 py-3 border border-gray-200">
                  Instansi Pemberi
                </th>
                <th className="px-4 py-3 border border-gray-200">Kualfikasi</th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto ">
              <tr className="capitalize bg-gray-200 border-b">
                <td
                  colSpan="6"
                  className="px-6 py-4 italic font-semibold text-center"
                >
                  Data Pegawai tidak ditemukan
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TabIzinUsaha;
