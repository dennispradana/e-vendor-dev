import React from 'react';
import { SkeletonItem } from '../Elements/Skelekton';

const TabPenawaranPeserta = ({ data, loading }) => {
  const TablePaket = () => {
    return (
      <>
        <div className="relative flex flex-col overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-xs text-left border border-collapse rounded-lg">
              <thead>
                <tr>
                  <th
                    scope="col"
                    rowSpan="2"
                    className="px-6 py-2 text-center bg-gray-100 border"
                  >
                    Nama Penyedia
                  </th>
                  <th
                    scope="col"
                    rowSpan="2"
                    className="px-6 py-2 text-center bg-gray-100 border"
                  >
                    Dokumen Kualifikasi
                  </th>
                  <th
                    scope="col"
                    colSpan="3"
                    className="px-6 py-2 text-center bg-gray-100 border "
                  >
                    Dokumen Penawaran
                  </th>
                </tr>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-2 text-center bg-gray-100 border "
                  >
                    Surat Penawaran
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-center bg-gray-100 border"
                  >
                    Administrasi dan Teknis
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-2 text-center bg-gray-100 border"
                  >
                    Harga
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-center capitalize border">
                    {data.peserta?.rkn_nama}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    <button className="px-3 py-1 text-white bg-gray-500 rounded hover:bg-gray-600">
                      Kualifikasi
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center border">
                    <button className="px-3 py-1 text-white bg-gray-500 rounded hover:bg-gray-600">
                      Cetak
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center border">
                    <button className="px-3 py-1 text-white bg-gray-500 rounded hover:bg-gray-600">
                      Detail
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center border">
                    <button className="px-3 py-1 text-white bg-gray-500 rounded hover:bg-gray-600">
                      Detail
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  const RenderContent = () => {
    return loading ? (
      <>
        <SkeletonItem itemCount={1} cN="bg-gray-200 h-6 w-1/4" />
        <div className="py-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
          <SkeletonItem itemCount={10} cN="bg-gray-200 h-8" />
        </div>
      </>
    ) : (
      <>
        <TablePaket />
      </>
    );
  };
  return <RenderContent />;
};

export default TabPenawaranPeserta;
