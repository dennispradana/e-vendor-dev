import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { paketService } from '../../services/paket.service';
import { formatDate, getColorClass } from '../../utils/formatDate';
import { toasterror } from '../../utils/ToastMessage';
import { Download } from '../Elements/Button/DownloadButton';
import { formatRp } from '../../utils/formatRupiah';
import { SkeletonItem } from '../Elements/Skelekton';

const initialState = {
  akta: [],
  izinUsaha: [],
  pajak: [],
  stafAhli: [],
  pengalaman: [],
  lainya: '',
};

const TableDokKualifikasiPen = () => {
  const { psrId } = useParams();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const { getDokKualifikasiPen } = paketService();
  const [file, setFiles] = useState(initialState);
  const { akta, izinUsaha, pajak, stafAhli, pengalaman, lainya } = file;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDokKualifikasiPen(psrId);
        const responseData = response.data;
        setData(responseData);
        setFiles((prev) => ({
          ...prev,
          akta: responseData.landasanhukum,
          izinUsaha: responseData.izinusaha,
          pajak: responseData.pajak,
          stafAhli: responseData.stafahli,
          pengalaman: responseData.pengalaman,
          lainya: responseData.lainya.dok_id_attachment,
        }));
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const TableIdentitas = () => {
    return (
      <div className="grid text-sm lg:grid-cols-2">
        <table>
          <tbody>
            <tr className="border-b">
              <td className="w-32 p-2 capitalize">Nama</td>
              <td>:</td>
              <td className="p-2 text-gray-500 capitalize">
                {data.identitas?.rkn_nama}
              </td>
            </tr>
            <tr className="border-b">
              <td className="w-32 p-2 capitalize">NPWP</td>
              <td>:</td>
              <td className="p-2 text-gray-500 capitalize">
                {data.identitas?.rkn_npwp}
              </td>
            </tr>
            <tr className="border-b">
              <td className="w-32 p-2 capitalize">Telepon</td>
              <td>:</td>
              <td className="p-2 text-gray-500 capitalize">
                {data.identitas?.rkn_telepon}
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr className="border-b">
              <td className="w-32 p-2 capitalize">Email</td>
              <td>:</td>
              <td className="p-2 text-gray-500">{data.identitas?.rkn_email}</td>
            </tr>
            <tr className="border-b">
              <td className="w-32 p-2 capitalize">Alamat</td>
              <td>:</td>
              <td className="p-2 text-gray-500 capitalize">
                {data.identitas?.rkn_alamat}
              </td>
            </tr>
            <tr className="border-b">
              <td className="w-32 p-2 capitalize">Asal</td>
              <td>:</td>
              <td className="p-2 text-gray-500 capitalize">
                {data.identitas?.rkn_kota},
                <span className="mx-2">{data.identitas?.rkn_prop}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const TableManajerial = () => {
    return (
      <div className="relative flex flex-col overflow-x-auto rounded-lg">
        <div className="flex-grow">
          <table className="w-full text-sm text-left text-gray-600 md:text-base">
            <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
              <tr role="row" className="text-center border border-gray-200">
                <th className="px-4 py-3 border border-gray-200">No</th>
                <th className="px-4 py-3 border border-gray-200">Nama</th>
                <th className="px-4 py-3 border border-gray-200">NPWP</th>
                <th className="px-4 py-3 border border-gray-200">Alamat</th>
                <th className="px-4 py-3 border border-gray-200">
                  Kepemilikan
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto ">
              {data.manajerial?.length === 0 ? (
                <tr className="capitalize bg-gray-200 border-b">
                  <td
                    colSpan="6"
                    className="px-6 py-4 italic font-semibold text-center"
                  >
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                data.manajerial?.map((item, index) => (
                  <tr
                    key={index}
                    className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-3 py-4 capitalize">{item.mjr_nama}</td>
                    <td className="px-3 py-4">{item.mjr_npwp}</td>
                    <td className="px-3 py-4 text-center">{item.mjr_alamat}</td>
                    <td className="px-3 py-4 text-center">
                      {item.mjr_jenis === '0' ? 'Pengurus' : 'Pemilik'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const TableAkta = () => {
    return (
      <>
        <div className="relative flex flex-col overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-sm text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-4 py-3 border border-gray-200">No</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Nomor Akta
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Tanggal Akta
                  </th>
                  <th className="px-4 py-3 border border-gray-200">Notaris</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto ">
                {data.landasanhukum?.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="4"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      Data tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  data.landasanhukum?.map((item, index) => (
                    <tr
                      key={index}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-3 py-4 text-center capitalize">
                        {item.lhkp_no}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {formatDate(new Date(item.lhkp_tanggal))}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {item.lhkp_notaris}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {akta.map((item, index) => (
          <div key={index}>
            <Download data={item.lhkp_id_attachment} />
          </div>
        ))}
      </>
    );
  };

  const TableIzinUsaha = () => {
    return (
      <>
        <div className="relative flex flex-col overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-sm text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-4 py-3 border border-gray-200">No</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Izin Usaha
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Nomor Surat
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Berlaku Sampai
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Instansi Pemberi
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Kualfikasi
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto ">
                {data.izinusaha?.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="6"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      Data tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  data.izinusaha?.map((item, index) => (
                    <tr
                      key={index}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-3 py-4 capitalize">{item.jni_nama}</td>
                      <td className="px-3 py-4">{item.ius_no}</td>
                      <td
                        className={`px-3 py-4 text-center ${getColorClass(
                          item.ius_berlaku
                        )}`}
                      >
                        {item.ius_berlaku !== null
                          ? formatDate(new Date(item.ius_berlaku))
                          : 'Seumur Hidup'}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {item.ius_instansi}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {item.ius_klasifikasi === null
                          ? '-'
                          : item.ius_klasifikasi}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {izinUsaha.map((item, index) => (
          <div key={index}>
            <Download data={item.ius_id_attachment} />
          </div>
        ))}
      </>
    );
  };

  const TablePajak = () => {
    return (
      <>
        <div className="relative flex flex-col overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-sm text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-4 py-3 border border-gray-200">No</th>
                  <th className="px-4 py-3 border border-gray-200">Pajak</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Tanggal Terima Bukti
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Nomor Bukti
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto ">
                {data.pajak?.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="4"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      Data tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  data.pajak?.map((item, index) => (
                    <tr
                      key={index}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {1 + index}
                      </th>
                      <td className="px-3 py-4 text-center capitalize">
                        {item.pjk_jenis}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {formatDate(new Date(item.pjk_tanggal))}
                      </td>
                      <td className="px-3 py-4 text-center">{item.pjk_no}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {pajak.map((item, index) => (
          <div key={index}>
            <Download data={item.pjk_id_attachment} />
          </div>
        ))}
      </>
    );
  };

  const TableTenagaAhli = () => {
    return (
      <>
        <div className="relative flex flex-col overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-sm text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-4 py-3 border border-gray-200">No</th>
                  <th className="px-4 py-3 border border-gray-200">Nama</th>
                  <th className="px-4 py-3 border border-gray-200">NPWP</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Tanggal Lahir
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Pendidikan Akhir
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Pengalaman Kerja
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Profesi Keahlian
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto ">
                {data.stafahli?.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="7"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      Data tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  data.stafahli?.map((item, index) => (
                    <tr
                      key={index}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-3 py-4 capitalize">{item.sta_nama}</td>
                      <td className="px-3 py-4">{item.sta_npwp}</td>
                      <td className="px-3 py-4 text-center">
                        {formatDate(new Date(item.sta_tgllahir))}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {item.sta_pendidikan}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {item.sta_pengalaman} Tahun
                      </td>
                      <td className="px-3 py-4 text-center">
                        {item.sta_keahlian}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {stafAhli.map((item, index) => (
          <div key={index}>
            <Download data={item.sta_id_attachment} />
          </div>
        ))}
      </>
    );
  };

  const TablePengalaman = () => {
    return (
      <>
        <div className="relative flex flex-col overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-sm text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-4 py-3 border border-gray-200">No</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Pekerjaan
                  </th>
                  <th className="px-4 py-3 border border-gray-200">Lokasi</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Instansi Pemberi Pekerjaan
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Tanggal Kontrak
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Tanggal Selesai Kontrak
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Nilai Kontrak
                  </th>
                  <th className="px-4 py-3 border border-gray-200">Aksi</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto ">
                {data.pengalaman?.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="8"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      Data Izin tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  data.pengalaman?.map((item, index) => (
                    <tr
                      key={index}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-3 py-4 capitalize">
                        {item.pgl_kegiatan}
                      </td>
                      <td className="px-3 py-4">{item.pgl_lokasi}</td>
                      <td className="px-3 py-4 text-center">
                        {item.pgl_pembtgs}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {formatDate(new Date(item.pgl_tglkontrak))}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {formatDate(new Date(item.pgl_slskontrak))}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {formatRp(item.pgl_nilai)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {pengalaman.map((item, index) => (
          <div key={index}>
            <Download data={item.pgl_id_attachment} />
          </div>
        ))}
      </>
    );
  };

  const TablePeralatan = () => {
    return (
      <>
        <div className="relative flex flex-col overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-sm text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-4 py-3 border border-gray-200">No</th>
                  <th className="px-4 py-3 border border-gray-200">Nama</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Kapasitas
                  </th>
                  <th className="px-4 py-3 border border-gray-200">Jumlah</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Merk/Tipe
                  </th>
                  <th className="px-4 py-3 border border-gray-200">Kondisi</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Kepemilikan
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto ">
                {data.peralatan?.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="8"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      Data tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  data.peralatan?.map((item, index) => (
                    <tr
                      key={index}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-3 py-4 capitalize">{item.alt_jenis}</td>
                      <td className="px-3 py-4">{item.alt_kapasitas}</td>
                      <td className="px-3 py-4 text-center">
                        {item.alt_jumlah}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {item.alt_merktipe}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {item.alt_kondisi === '0' ? 'baik' : 'rusak'}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {item.alt_kepemilikan}
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
        <div className="page-padding">
          <SkeletonItem itemCount={10} cN="bg-gray-200 h-10" />
        </div>
      </>
    ) : (
      <div className="p-3 mb-10 bg-white rounded shadow-md">
        <div className="p-3 mt-6 border border-collapse rounded">
          <p className="px-3 mb-3 text-sm font-bold capitalize">
            Identitas Peserta
          </p>
          <TableIdentitas />
        </div>
        <div className="p-3 my-6 border border-collapse rounded">
          <p className="px-3 mb-3 text-sm font-bold capitalize">Manajerial</p>
          <TableManajerial />
        </div>
        <div className="p-3 my-6 border border-collapse rounded">
          <p className="px-3 mb-3 text-sm font-bold capitalize">
            Landasan Hukum
          </p>
          <TableAkta />
        </div>
        <div className="p-3 my-6 border border-collapse rounded">
          <p className="px-3 mb-3 text-sm font-bold capitalize">Izin usaha</p>
          <TableIzinUsaha />
        </div>
        <div className="p-3 my-6 border border-collapse rounded">
          <p className="px-3 mb-3 text-sm font-bold capitalize">Pajak</p>
          <TablePajak />
        </div>
        <div className="p-3 my-6 border border-collapse rounded">
          <p className="px-3 mb-3 text-sm font-bold capitalize">Staf Ahli</p>
          <TableTenagaAhli />
        </div>
        <div className="p-3 my-6 border border-collapse rounded">
          <p className="px-3 mb-3 text-sm font-bold capitalize">Pengalaman</p>
          <TablePengalaman />
        </div>
        <div className="p-3 my-6 border border-collapse rounded">
          <p className="px-3 mb-3 text-sm font-bold capitalize">Peralatan</p>
          <TablePeralatan />
        </div>
        <div className="p-3 my-6 border border-collapse rounded">
          <p className="px-3 mb-3 text-sm font-bold capitalize">
            Dokumen Lainnya
          </p>
          <Download data={lainya} />
        </div>
      </div>
    );
  };

  return <RenderContent />;
};

export default TableDokKualifikasiPen;
