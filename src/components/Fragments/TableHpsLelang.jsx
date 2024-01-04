import React from 'react';
import { formatRp } from '../../utils/formatRupiah';
import Spinner from '../Elements/Spinner';

const TableHpsLelang = ({ data, loading, formik }) => {
  return loading ? (
    <div className="h-[60vh] flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <>
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
            {data.content?.dll_dkh?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="px-4 py-2 border">{row.item}</td>
                <td className="px-4 py-2 border">{row.unit}</td>
                <td className="px-4 py-2 border">{row.vol}</td>
                <td className="px-4 py-2 border">{formatRp(row.harga)}</td>
                <td className="px-4 py-2 border">{row.pajak}</td>
                <td className="px-4 py-2 border">
                  {formatRp(row.total_harga)}
                </td>
                <td className="px-4 py-2 border"></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className="pr-2 font-bold text-right border">
                Total Harga:
              </td>
              <td colSpan="2" className="px-3 py-2 border">
                {formatRp(formik.values.nonLel?.pkt_hps)}
              </td>
            </tr>
          </tfoot>
        </table>
        {formik.errors.nonLel?.pkt_hps && (
          <p className="mt-2 text-sm italic text-red-500 ">
            {formik.errors.nonLel.pkt_hps}
          </p>
        )}
      </div>
    </>
  );
};

export default TableHpsLelang;
