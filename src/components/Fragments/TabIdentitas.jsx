import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { userProfile } from '../../services/profile.service';
import { penyediaService } from '../../services/penyedia.service';
import { Link } from 'react-router-dom';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import Spinner from '../Elements/Spinner';
import { toasterror } from '../../utils/ToastMessage';

const TabIdentitas = () => {
  const { user } = useAuthContext();
  const { getProfilePenyedia } = userProfile();
  const { btkUsaha } = penyediaService();
  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [bentukUsaha, setBentukUsaha] = useState([]);
  const [btuNama, setBtuNama] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfilePenyedia(user.user_id);
        const responseUsaha = await btkUsaha();
        const result = responseUsaha.data;
        setBentukUsaha(result);
        setDataUser(response.user);
        setLoading(false);
      } catch (error) {
        toasterror(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataUser && bentukUsaha.length > 0) {
      const matchingBtu = bentukUsaha.find(
        (item) => item.btu_id === dataUser.btu_id
      );
      if (matchingBtu) {
        setBtuNama(matchingBtu.btu_nama);
      }
    }
  }, [dataUser, bentukUsaha]);

  const statusConfig = {
    verif: {
      condition:
        dataUser.rkn_isactive === '1' &&
        dataUser.rkn_status === '1' &&
        dataUser.rkn_status_verifikasi === 'verif',
      render: (
        <p className="py-2 text-green-600">telah mendapatkan Verifikasi </p>
      ),
    },
    nonVerif: {
      condition: dataUser.rkn_status_verifikasi === 'non',
      render: <p className="py-2 text-red-400">Belum mendapatkan Verifikasi</p>,
    },
    nonAktif: {
      condition: dataUser.rkn_isactive === '0',
      render: <p className="py-2 text-red-800">di non-aktifkan</p>,
    },
  };

  const renderStatus = () => {
    const status = Object.keys(statusConfig).find(
      (key) => statusConfig[key].condition
    );
    return status ? statusConfig[status].render : null;
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="px-4 py-6 border-b-2">
            <div className="flex items-center justify-between">
              <h4 className="px-2 pb-4 text-lg font-bold text-gray-500 capitalize ">
                data perusahaan
              </h4>
              <Link
                className="flex items-center px-4 py-1 border border-violet-600 rounded-xl text-violet-600 hover:text-white hover:bg-violet-500"
                to="/profile"
              >
                <HiOutlinePencilSquare />
                <span className="ml-2 font-bold">Edit</span>
              </Link>
            </div>

            <div className="grid text-sm font-semibold lg:grid-cols-2">
              <table>
                <tbody>
                  <tr>
                    <td className="p-2 capitalize w-36">nama perusahaan</td>
                    <td>:</td>
                    <td className="p-2 text-gray-500 capitalize">
                      {dataUser.rkn_nama}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 capitalize w-36">No. Telp</td>
                    <td>:</td>
                    <td className="p-2 text-gray-500 capitalize">
                      {dataUser.rkn_telepon}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 capitalize w-36">No. PKP</td>
                    <td>:</td>
                    <td className="p-2 text-gray-500 capitalize">
                      {dataUser.rkn_pkp ? dataUser.rkn_pkp : '-'}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td className="p-2 capitalize w-36">bentuk usaha</td>
                    <td>:</td>
                    <td className="p-2 text-gray-500">{btuNama}</td>
                  </tr>
                  <tr>
                    <td className="p-2 capitalize w-36">e-mail</td>
                    <td>:</td>
                    <td className="p-2 text-gray-500 capitalize">
                      {dataUser.rkn_email}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 capitalize w-36">No. NPWP</td>
                    <td>:</td>
                    <td className="p-2 text-gray-500 capitalize">
                      {dataUser.rkn_npwp}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="px-4 py-6 border-b-2">
            <h4 className="px-2 py-4 text-lg font-bold text-gray-500 capitalize ">
              Alamat Perusahaan
            </h4>
            <div className="grid text-sm font-semibold lg:grid-cols-3">
              <div className="p-2">
                <label className="capitalize ">Provinsi</label>
                <p className="py-2 text-gray-500 capitalize">
                  {dataUser.rkn_prop}
                </p>
              </div>
              <div className="p-2">
                <label className="capitalize ">Kabupaten/kota</label>
                <p className="py-2 text-gray-500 capitalize">
                  {dataUser.rkn_kota}
                </p>
              </div>
              <div className="p-2">
                <label className="capitalize ">Kode Pos</label>
                <p className="py-2 text-gray-500 capitalize">
                  {dataUser.rkn_kodepos ? dataUser.rkn_kodepos : '-'}
                </p>
              </div>
            </div>
            <div className="p-2">
              <label className="font-semibold capitalize ">Alamat</label>
              <p className="py-2 text-gray-500 capitalize">
                {dataUser.rkn_alamat}
              </p>
            </div>
          </div>
          <div className="px-4 py-6">
            <h4 className="px-2 py-4 text-lg font-bold text-gray-500 capitalize ">
              status
            </h4>
            <div className="grid text-sm font-semibold lg:grid-cols-2">
              <div className="p-2">
                <label className="capitalize ">Tanggal Daftar</label>
                <p className="py-2 text-gray-500 capitalize">
                  {dataUser.rkn_tgl_daftar}
                </p>
              </div>
              <div className="p-2">
                <label className="capitalize ">Status</label>
                {renderStatus()}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TabIdentitas;
