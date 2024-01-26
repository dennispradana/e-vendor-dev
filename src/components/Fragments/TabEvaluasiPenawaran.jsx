import React from 'react';
import { formatRp } from '../../utils/formatRupiah';
import { Link } from 'react-router-dom';

const TabEvaluasiPenawaran = ({ data }) => {
  const RenderDataLelang = () => {
    return (
      <table className="w-full mb-10 text-sm text-left border border-collapse">
        <tbody>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">Kode Paket</th>
            <td className="px-4 py-2 border-b">{data.lelang?.lls_id}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">Nama Paket</th>
            <td className="px-4 py-2 border-b">{data.lelang?.pkt_nama}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">Nilai HPS</th>
            <td className="px-4 py-2 border-b">
              {formatRp(data.lelang?.pkt_hps)}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const Table = () => {
    return (
      <div className="relative flex flex-col overflow-x-auto rounded-lg">
        <div className="flex-grow">
          <table className="w-full text-xs text-left border border-collapse rounded-lg">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-2 text-center bg-gray-100 border"
                >
                  Nama Penyedia
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center bg-gray-100 border"
                >
                  Harga Penawaran
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center bg-gray-100 border "
                >
                  Harga Terkoreksi
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center text-white bg-gray-100 border"
                >
                  <span className="px-2 py-1 bg-red-500 rounded">K</span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center text-white bg-gray-100 border"
                >
                  <span className="px-2 py-1 bg-green-500 rounded">A</span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center text-white bg-gray-100 border"
                >
                  <span className="px-2 py-1 bg-green-700 rounded">T</span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center text-white bg-gray-100 border"
                >
                  <span className="px-2 py-1 bg-blue-500 rounded">H</span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center text-white bg-gray-100 border"
                >
                  <span className="px-2 py-1 bg-yellow-500 rounded">P</span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center bg-gray-100 border "
                >
                  Veiifikasi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-center capitalize border">
                  <Link
                    to={`/evaluasi/peserta/${data.peserta?.psr_id}`}
                    className="hover:text-blue-500"
                  >
                    {data.peserta?.rkn_nama}
                  </Link>
                </td>
                <td className="px-4 py-2 text-center border">
                  {formatRp(data.peserta?.psr_harga)}
                </td>
                <td className="px-4 py-2 text-center border">
                  {data.peserta?.psr_harga_terkoreksi !== null &&
                    formatRp(data.peserta?.psr_harga_terkoreksi)}
                </td>
                <td className="px-2 py-1 text-center border"></td>
                <td className="px-2 py-1 text-center border"></td>
                <td className="px-2 py-1 text-center border"></td>
                <td className="px-2 py-1 text-center border"></td>
                <td className="px-2 py-1 text-center border"></td>
                <td className="px-4 py-2 text-center border">
                  <button className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Verifikasi
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  return (
    <>
      <RenderDataLelang />
      <Table />
      <div className="flex flex-wrap gap-4 my-6 text-xs">
        <p>
          <span className="px-2 py-1 mx-2 font-semibold text-white bg-red-500 rounded">
            K
          </span>
          Evaluasi Kualifikasi
        </p>
        <p>
          <span className="px-2 py-1 mx-2 font-semibold text-white bg-green-500 rounded">
            A
          </span>
          Evaluasi Administrasi
        </p>
        <p>
          <span className="px-2 py-1 mx-2 font-semibold text-white bg-green-700 rounded">
            T
          </span>
          Evaluasi Teknis
        </p>
        <p>
          <span className="px-2 py-1 mx-2 font-semibold text-white bg-blue-500 rounded">
            H
          </span>
          Evaluasi Harga/Biaya
        </p>
        <p>
          <span className="px-2 py-1 mx-2 font-semibold text-white bg-yellow-500 rounded">
            P
          </span>
          Pemenang
        </p>
      </div>
    </>
  );
};

export default TabEvaluasiPenawaran;
