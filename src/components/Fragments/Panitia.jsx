import React, { useEffect, useState } from 'react';
import { panitiaService } from '../../services/panitia.service';
import { Link, useParams } from 'react-router-dom';
import { toasterror } from '../../utils/ToastMessage';
import { SkeletonItem } from '../Elements/Skelekton';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import TabelDaftarAnggota from './TabelDaftarAnggota';

const Panitia = () => {
  const [data, setData] = useState('');
  const { editPanitia } = panitiaService();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { panitiaId } = useParams();

  const fetchData = async () => {
    try {
      const response = await editPanitia(panitiaId);
      const dataPanitia = response.data;
      setData(dataPanitia);
    } catch (error) {
      toasterror(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDataUpadate = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  console.log(data);

  const PanitiaData = () => {
    return (
      <>
        <div className="flex justify-end mb-6">
          <Link
            className="flex items-center px-4 py-1 border border-violet-600 rounded-xl text-violet-600 hover:text-white hover:bg-violet-500"
            to={`/daftar-panitia/edit/${data.pnt_id}`}
          >
            <HiOutlinePencilSquare />
            <span className="ml-2 font-bold">Edit</span>
          </Link>
        </div>
        <div className="grid lg:grid-cols-2">
          <table>
            <tbody>
              <tr>
                <td className="p-2 capitalize w-36">nama panitia</td>
                <td>:</td>
                <td className="p-2 text-gray-500 capitalize">
                  {data.pnt_nama}
                </td>
              </tr>
              <tr>
                <td className="p-2 capitalize w-36">No. SK</td>
                <td>:</td>
                <td className="p-2 text-gray-500 capitalize">
                  {data.pnt_no_sk}
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td className="p-2 capitalize w-36">Status</td>
                <td>:</td>
                <td className="p-2 text-gray-500">
                  {data.is_active === '1' ? 'aktif' : 'non Aktif'}
                </td>
              </tr>
              <tr>
                <td className="p-2 capitalize w-36">Tahun</td>
                <td>:</td>
                <td className="p-2 text-gray-500 capitalize">
                  {data.pnt_tahun}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <table>
          <tbody>
            <tr>
              <td className="p-2 capitalize w-36">No. telp</td>
              <td>:</td>
              <td className="p-2 text-gray-500 capitalize">{data.pnt_telp}</td>
            </tr>
            <tr>
              <td className="p-2 capitalize w-36">E-mail</td>
              <td>:</td>
              <td className="p-2 text-gray-500 capitalize">{data.pnt_email}</td>
            </tr>
            <tr>
              <td className="p-2 capitalize w-36">alamat</td>
              <td>:</td>
              <td className="p-2 text-gray-500 capitalize">
                {data.pnt_alamat}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };

  const TableAnggota = () => {
    return (
      <>
        <div className="pb-4">
          <button
            type="button"
            onClick={handleModal}
            className="px-4 py-3 font-semibold capitalize transition duration-200 ease-in-out rounded-lg cursor-pointer text-gray-50 bg-violet-400 hover:bg-slate-800 hover:text-white"
          >
            Tambah Anggota
          </button>
        </div>
        <div className="relative flex flex-col overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-sm text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-4 py-3 border border-gray-200">No</th>
                  <th className="px-4 py-3 border border-gray-200">Nama</th>
                  <th className="px-4 py-3 border border-gray-200">User ID</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto ">
                {data.pegawai.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="3"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      belum ada anggota
                    </td>
                  </tr>
                ) : (
                  data.pegawai.map((item, index) => (
                    <tr
                      key={item.peg_id}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-3 py-4 capitalize">{item.peg_nama}</td>
                      <td className="px-3 py-4 capitalize">
                        {item.peg_namauser}
                      </td>
                    </tr>
                  ))
                )}
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
        <SkeletonItem itemCount={10} cN="bg-gray-200 h-8" />
      </>
    ) : (
      <>
        <div className="pb-6 mb-6 border-b">
          <PanitiaData />
        </div>
        <div className="relative">
          <TableAnggota />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="py-4 page-padding">
          <RenderContent />
        </div>
      </div>
      {showModal && (
        <TabelDaftarAnggota
          close={handleModal}
          pntId={data.pnt_id}
          onUpdate={handleDataUpadate}
        />
      )}
    </>
  );
};

export default Panitia;
