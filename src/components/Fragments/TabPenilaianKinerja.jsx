import React, { useEffect, useState } from 'react';
import { ppkService } from '../../services/ppk.service';
import { Link, useParams } from 'react-router-dom';
import { toasterror } from '../../utils/ToastMessage';
import { SkeletonItem } from '../Elements/Skelekton';

const TabPenilaianKinerja = () => {
  const { llsId } = useParams();
  const { getPenilaian } = ppkService();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getPenilaian(llsId);
      setData(response.data);
    } catch (error) {
      toasterror(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <SkeletonItem itemCount={1} cN="bg-gray-200 h-36" />
  ) : (
    <>
      <table className="w-full mb-4 text-sm text-left">
        <tbody>
          <tr>
            <th className="w-1/4 px-4 py-2">Kode Pengadaan</th>
            <td className="px-4 py-2">{data.lelang?.lls_id}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2">Kategori Pengadaan</th>
            <td className="px-4 py-2">{data.lelang?.jenis}</td>
          </tr>
        </tbody>
      </table>
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="uppercase bg-gray-800 rounded-lg text-gray-50">
          <tr role="row" className="text-center border border-gray-200">
            <th className="px-4 py-3 border border-gray-200">No</th>
            <th className="px-4 py-3 border border-gray-200">
              Indikator Penilaian
            </th>
            <th className="px-4 py-3 border border-gray-200">Nilai</th>
            <th className="px-4 py-3 border border-gray-200">Nilai Bobot</th>
            <th className="px-4 py-3 border border-gray-200">Nilai Akhir</th>
            <th className="px-4 py-3 border border-gray-200">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.nilai?.map((item, index) => (
            <tr
              key={item.ktr_id}
              className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
            >
              <th
                scope="row"
                className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
              >
                {index + 1}
              </th>
              <td className="px-3 py-4 capitalize">{item.ktr_nama}</td>
              <td className="px-3 py-4 text-center">
                {item.base_nilai === null ? '-' : item.base_nilai}
              </td>
              <td className="px-3 py-4 text-center">{item.base_bobot}%</td>
              <td className="px-3 py-4 text-center">
                {item.nilai ? item.nilai : '-'}
              </td>
              <td className="px-6 py-4 text-center">
                <Link to={`/detail-nilai/${llsId}/${item.ktr_id}`}>
                  <button className="px-3 py-1 text-white capitalize rounded bg-emerald-600 hover:bg-emerald-700">
                    berikan penilaian
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            {data.total?.ttl_bobot === null ? (
              <>
                <th colSpan="3" className="px-3 py-4">
                  Nilai Total
                </th>
                <td className="px-3 py-4 font-bold text-center">
                  Penilaian Belum Lengkap
                </td>
              </>
            ) : (
              <>
                <th colSpan="2" className="px-3 py-4">
                  Nilai Total
                </th>
                <td className="px-3 py-4 text-center ">
                  {data.total?.ttl_bobot}
                </td>
                <td className="px-3 py-4 text-center ">
                  {data.total?.ttl_nilai}
                </td>
              </>
            )}
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default TabPenilaianKinerja;
