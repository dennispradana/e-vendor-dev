import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { paketService } from '../../services/paket.service';
import { DownloadHarga } from '../Elements/Button/DownloadButton';
import { formatRp } from '../../utils/formatRupiah';
import Spinner from '../Elements/Spinner';
import { IoArrowBackOutline } from 'react-icons/io5';

const TableHarga = () => {
  const { psrId } = useParams();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const { getDataEvaluasiPen } = paketService();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataEvaluasiPen(psrId);
        const responseData = response.data;
        setData(responseData);
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const RenderHarga = () => {
    return (
      <div className="my-6 border-b ">
        <p className="mb-1 text-sm font-semibold">Teknis</p>
        {data.teknis?.length === 0 ? (
          <p className="text-xs text-justify">Tidak ada Persyaratan Teknis</p>
        ) : (
          data.harga?.map((item, index) => (
            <div key={item.chk_id} className="mb-6">
              <div className="flex gap-2 p-1">
                <p className="text-xs text-justify align-top">
                  {index + 1 + '.'}
                </p>
                <p className="text-xs text-justify">{item.chk_nama}</p>
              </div>
              <DownloadHarga data={item.dok_id_attachment} />
            </div>
          ))
        )}
      </div>
    );
  };

  const RenderHps = () => {
    return (
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
                {formatRp(data.peserta?.psr_harga)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  const RenderContent = () => {
    return loading ? (
      <div className="h-[60vh] flex justify-center items-center">
        <Spinner />
      </div>
    ) : (
      <>
        <RenderHarga />
        <RenderHps />
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mt-6 text-black hover:text-blue-600 hover:underline"
        >
          <IoArrowBackOutline />
          Kembali
        </button>
      </>
    );
  };

  return (
    <div className="p-5 mb-10 bg-white rounded shadow-md">
      <RenderContent />
    </div>
  );
};

export default TableHarga;
