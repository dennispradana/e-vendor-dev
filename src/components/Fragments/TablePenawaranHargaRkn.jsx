import React from 'react';
import Spinner from '../Elements/Spinner';
import { formatRp } from '../../utils/formatRupiah';

const TablePenawaranHargaRkn = ({ data, modal, loading }) => {
  const RenderUploadFile = () => {
    return (
      <>
        {data.checklist?.harga?.map((item, index) => (
          <div key={item.chk_id} className="my-6 border border-black rounded">
            <div className="bg-gray-600 border-b rounded">
              <p className="px-3 py-2 text-white">{item.chk_nama}</p>
            </div>
            <div className="flex items-center h-20 px-3">
              <button
                type="button"
                onClick={() => modal(index)}
                className="w-[10rem] px-3 py-2 font-bold text-white duration-200 ease-in rounded bg-violet-400 hover:bg-violet-500"
              >
                Lihat dokumen
              </button>
            </div>
          </div>
        ))}
      </>
    );
  };

  return loading ? (
    <div className="h-[60vh] flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <>
      <RenderUploadFile />
      <div className="relative overflow-x-auto">
        <table className="w-full text-xs text-left border border-collapse rounded-lg">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-2 text-center bg-gray-100 border"
              >
                Jenis Barang/Jasa
              </th>
              <th
                scope="col"
                className="w-[5rem] px-6 py-2 border bg-gray-100 text-center"
              >
                Satuan
              </th>
              <th
                scope="col"
                className="w-[5rem] px-6 py-2 border bg-gray-100 text-center"
              >
                Vol
              </th>
              <th
                scope="col"
                className="px-6 py-2 text-center bg-gray-100 border"
              >
                Harga/Biaya
              </th>
              <th
                scope="col"
                className="px-6 py-2 border w-[7rem] bg-gray-100 text-center"
              >
                Pajak (%)
              </th>
              <th
                scope="col"
                className="px-6 py-2 border w-[14rem] bg-gray-100 text-center"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-6 py-2 text-center bg-gray-100 border"
              >
                Keterangan
              </th>
            </tr>
          </thead>
          <tbody>
            {data.peserta?.psr_dkh?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="px-4 py-2 border">{row.item}</td>
                <td className="px-4 py-2 border">{row.unit}</td>
                <td className="px-4 py-2 border">{row.vol}</td>
                <td className="px-4 py-2 border">{formatRp(row.harga)}</td>
                <td className="px-4 py-2 border">{row.pajak}</td>
                <td className="px-4 py-2 border">
                  {formatRp(row.total_harga)}
                </td>
                <td className="px-4 py-2 border">{row.keteragan}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className="pr-2 font-bold text-right border">
                Total Harga:
              </td>
              <td colSpan="2" className="px-3 py-2 border">
                {formatRp(data.peserta?.psr_harga)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default TablePenawaranHargaRkn;
