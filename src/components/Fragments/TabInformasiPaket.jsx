import React from 'react';
import { SkeletonItem } from '../Elements/Skelekton';
import { Link } from 'react-router-dom';

const TabInformasiPaket = ({ data, loading }) => {
  console.log(data);

  const RenderTable = () => {
    return loading ? (
      <>
        <table className="w-full text-sm text-left border border-collapse">
          <tbody>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">
                <SkeletonItem itemCount={10} cN="bg-gray-200 h-4" />
              </th>
              <td className="px-4 py-2 border-b">
                <SkeletonItem itemCount={10} cN="bg-gray-200 h-4" />
              </td>
            </tr>
          </tbody>
        </table>
      </>
    ) : (
      <table className="w-full text-sm text-left border border-collapse">
        <tbody>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">
              Kode Pengadaan
            </th>
            <td className="px-4 py-2 border-b">{data.lelang?.lls_id}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">Nama Paket</th>
            <td className="px-4 py-2 border-b">{data.lelang?.pkt_nama}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">
              Tahap Paket Saat Ini
            </th>
            <td className="px-4 py-2 border-b">{data.lelang?.tahapan}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Dokumen Pemilihan
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">Dokumen Pemilihan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-collapse border-blue-200">
                    <td className="p-2">
                      <Link
                        className="hover:text-blue-500"
                        to={`/dokumen-evaluasi/${data.lelang?.lls_id}`}
                      >
                        {data.dokumen?.dll_nama_dokumen}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Hasil Evaluasi
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">Nama Penyedia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-collapse border-blue-200">
                    <td className="p-2">{data.peserta?.rkn_nama}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Berita Acara
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full mb-4 text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">
                      Berita Acara Hasil Evaluasi Penawaraan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-collapse border-blue-200">
                    <td className="p-2"></td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">Berita Acara Hasil Non Tender</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-collapse border-blue-200">
                    <td className="p-2"></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
  return <RenderTable />;
};

export default TabInformasiPaket;
