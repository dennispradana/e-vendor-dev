import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ppkService } from '../../services/ppk.service';
import { formatRp } from '../../utils/formatRupiah';
import { SkeletonItem } from '../Elements/Skelekton';
import { FiFileText } from 'react-icons/fi';
import FormEKontrak from '../Elements/Modal/formEKontrak';

const TabKontrak = () => {
  const { llsId } = useParams();
  const { getKontrakPPK } = ppkService();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalKontrak, setModalKontrak] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getKontrakPPK(llsId);
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    await fetchData();
  };

  const handleModal = () => {
    setModalKontrak(!modalKontrak);
  };

  const renderButton = () => {
    const mtd = data.lelang?.mtd_pemilihan;
    switch (mtd) {
      case '0':
        return (
          <button className="px-3 py-1 mx-4 text-xs text-white bg-gray-500 rounded hover:bg-gray-600">
            SPK
          </button>
        );
      case '1':
        return (
          <button className="px-3 py-1 mx-4 text-xs text-white bg-gray-500 rounded hover:bg-gray-600">
            Kontrak
          </button>
        );
      default:
        return null;
    }
  };

  const renderNilai = () => {
    const mtd = data.lelang?.mtd_pemilihan;
    switch (mtd) {
      case '0':
        return <p>{formatRp(data.spk?.spk_nilai)}</p>;
      case '1':
        return <p>{formatRp(data.kontrak?.kontrak_nilai)}</p>;
      default:
        return null;
    }
  };

  const renderDataEmpty = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <FiFileText size="10rem" className="mb-4 text-gray-400" />
        <h1 className="mb-4 italic font-semibold text-gray-500">
          Belum ada e-Kontrak yang tersimpan
        </h1>
        <button
          onClick={handleModal}
          className="px-4 py-3 font-semibold capitalize transition duration-200 ease-in-out bg-green-600 rounded-lg cursor-pointer text-gray-50 hover:bg-green-800 hover:text-white"
        >
          Buat SPPBJ
        </button>
      </div>
    );
  };

  const Table = () => {
    return (
      <div className="relative flex flex-col overflow-x-auto">
        <div className="flex-grow">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-2 text-center bg-gray-100 border"
                >
                  Nomor SPPBJ
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center bg-gray-100 border"
                >
                  Penyedia
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center bg-gray-100 border "
                >
                  {data.lelang?.mtd_pemilihan === '0' ? 'SPK' : 'Kontrak'}
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center bg-gray-100 border"
                >
                  Nilai Kontrak
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center bg-gray-100 border"
                >
                  SSKK
                </th>
              </tr>
            </thead>
            <tbody>
              {data.sppbj?.sppbj_id !== null ? (
                <tr>
                  <td className="px-4 py-2 text-center capitalize border">
                    <Link
                      to={`/sppbj/${data.sppbj?.sppbj_id}`}
                      className="hover:text-blue-500"
                    >
                      {data.sppbj?.sppbj_id}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-center uppercase border">
                    {data.sppbj?.rkn_nama}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    {renderButton()}
                  </td>
                  <td className="px-2 py-1 text-center border">
                    {renderNilai()}
                  </td>
                  <td className="px-2 py-1 text-center border">
                    <button className="px-3 py-1 mx-4 text-xs text-white bg-gray-500 rounded hover:bg-gray-600">
                      Lihat
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-2 text-center border h-[30vh]"
                  >
                    {renderDataEmpty()}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return loading ? (
    <div className="min-h-[50vh]">
      <table className="w-full text-sm text-left border border-collapse ">
        <thead>
          <tr>
            {Array.from({ length: 5 }, (_, index) => (
              <th key={index} className="px-4 border-b border-r">
                <SkeletonItem itemCount={1} cN="bg-gray-200 h-4" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Array.from({ length: 5 }, (_, index) => (
              <td key={index} className="px-4 py-2 border-b border-r">
                <SkeletonItem itemCount={1} cN="bg-gray-200 h-4" />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <>
      <div className="min-h-[50vh]">
        <Table />
      </div>
      {modalKontrak && (
        <FormEKontrak
          close={handleModal}
          llsId={llsId}
          updated={handleUpdate}
        />
      )}
    </>
  );
};

export default TabKontrak;
