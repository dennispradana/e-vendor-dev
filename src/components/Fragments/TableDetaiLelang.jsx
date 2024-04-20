import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { pjbService } from '../../services/pjb.service';
import { SkeletonItem } from '../Elements/Skelekton';
import { TiStar } from 'react-icons/ti';
import { fileService } from '../../services/file.service';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { ppkService } from '../../services/ppk.service';

const initialState = {
  kualifikasi: [],
  penawaran: [],
  pengadaan: [],
  lainnya: [],
};

const TableDetaiLelang = ({ type }) => {
  const { getDatalLelangPjb } = pjbService();
  const { getDatalLelangPpk } = ppkService();
  const { getFile, downloadFileBa } = fileService();
  const { llsId } = useParams();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(initialState);
  const { kualifikasi, penawaran, pengadaan, lainnya } = file;
  const [downloading, setDownloading] = useState(false);

  const fetchFileBa = async (baType, idContent) => {
    try {
      const response = await getFile(idContent);
      setFile((prev) => ({
        ...prev,
        [baType]: response,
      }));
    } catch (error) {
      toasterror(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        type === 'ppk'
          ? (response = await getDatalLelangPpk(llsId))
          : (response = await getDatalLelangPjb(llsId));

        setData(response.data);
        const handleBaType = async (baType, baKey) => {
          const idAttachment = response.data.berita?.[baKey]?.brc_id_attachment;
          if (idAttachment !== null) {
            await fetchFileBa(baType, idAttachment);
          }
        };

        await handleBaType('kualifikasi', 'BA_EVALUASI_KUALIFIKASI');
        await handleBaType('penawaran', 'BA_EVALUASI_PENAWARAN');
        await handleBaType('pengadaan', 'BA_HASIL_LELANG');
        await handleBaType('lainnya', 'BA_TAMBAHAN');
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownload = async (idContent, versi, fileName) => {
    try {
      const response = await downloadFileBa(idContent, versi);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      if (response.status === 200) {
        toastsuccess('File Berhasil Diunduh');
      } else {
        toasterror('Gagal mengunduh file');
      }
    } catch (error) {
      toasterror(error.message);
    }
  };

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
            <td className="px-4 py-2 border-b">Penguman Pemenang</td>
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
                      {type === 'ppk' ? (
                        <Link
                          className="hover:text-blue-500"
                          to={`/dokumen-PPK/${data.lelang?.lls_id}`}
                        >
                          {data.dokumen?.dll_nama_dokumen}
                        </Link>
                      ) : (
                        <Link
                          className="hover:text-blue-500"
                          to={`/dokumen-lelang/${data.lelang?.lls_id}`}
                        >
                          {data.dokumen?.dll_nama_dokumen}
                        </Link>
                      )}
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
                <thead>
                  <tr className="capitalize border-b">
                    <th className="p-1">pengumaman pemenang</th>
                  </tr>
                </thead>
                <tbody>
                  {data.evaluasi?.pemenang !== null && (
                    <tr>
                      <td className="p-2">
                        <div className="grid grid-cols-2">
                          <div className="px-2">
                            <div className="flex align-top">
                              <p className="capitalize">urutan 1</p>
                              <div className="text-yellow-500 ">
                                <TiStar />
                              </div>
                            </div>
                            <p>* Pemanang Hasil evaluasi</p>
                          </div>
                          <div className="capitalize">
                            {data.evaluasi?.pemenang?.rkn_nama}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Berita Acara Hasil Evaluasi Kualifikasi
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">
                      Dokumen Berita Acara Hasil Evaluasi Kualifikasi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {kualifikasi.length === 0 ? (
                    <tr className="capitalize bg-gray-200 border-b">
                      <td className="p-2 italic text-center">
                        File tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    kualifikasi.map((file, index) => (
                      <tr
                        className="border border-collapse border-blue-200"
                        key={index}
                      >
                        <td
                          className={`p-2 cursor-pointer`}
                          onClick={() => {
                            if (!downloading) {
                              setDownloading(true);
                              handleDownload(
                                file.ctn_id_content,
                                file.ctn_versi,
                                JSON.parse(file.blb_path).name
                              ).then(() => setDownloading(false));
                            }
                          }}
                        >
                          {index + 1}.
                          {downloading ? (
                            <span className="ml-2">Mengunduh File...</span>
                          ) : (
                            <span
                              className={`ml-2  text-blue-500 hover:text-blue-600 hover:underline ${
                                downloading ? 'cursor-not-allowed' : ''
                              }`}
                            >
                              {JSON.parse(file.blb_path).name}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Berita Acara Hasil Evaluasi Penawaran
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">
                      Dokumen Berita Acara Hasil Evaluasi Penawaran
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {penawaran.length === 0 ? (
                    <tr className="capitalize bg-gray-200 border-b">
                      <td className="p-2 italic text-center">
                        File tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    penawaran.map((file, index) => (
                      <tr
                        className="border border-collapse border-blue-200"
                        key={index}
                      >
                        <td
                          className={`p-2 cursor-pointer`}
                          onClick={() => {
                            if (!downloading) {
                              setDownloading(true);
                              handleDownload(
                                file.ctn_id_content,
                                file.ctn_versi,
                                JSON.parse(file.blb_path).name
                              ).then(() => setDownloading(false));
                            }
                          }}
                        >
                          {index + 1}.
                          {downloading ? (
                            <span className="ml-2">Mengunduh File...</span>
                          ) : (
                            <span
                              className={`ml-2  text-blue-500 hover:text-blue-600 hover:underline ${
                                downloading ? 'cursor-not-allowed' : ''
                              }`}
                            >
                              {JSON.parse(file.blb_path).name}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Berita Acara Hasil pengadaan
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">
                      Dokumen Berita Acara Hasil pengadaan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pengadaan.length === 0 ? (
                    <tr className="capitalize bg-gray-200 border-b">
                      <td className="p-2 italic text-center">
                        File tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    pengadaan.map((file, index) => (
                      <tr
                        className="border border-collapse border-blue-200"
                        key={index}
                      >
                        <td
                          className={`p-2 cursor-pointer`}
                          onClick={() => {
                            if (!downloading) {
                              setDownloading(true);
                              handleDownload(
                                file.ctn_id_content,
                                file.ctn_versi,
                                JSON.parse(file.blb_path).name
                              ).then(() => setDownloading(false));
                            }
                          }}
                        >
                          {index + 1}.
                          {downloading ? (
                            <span className="ml-2">Mengunduh File...</span>
                          ) : (
                            <span
                              className={`ml-2  text-blue-500 hover:text-blue-600 hover:underline ${
                                downloading ? 'cursor-not-allowed' : ''
                              }`}
                            >
                              {JSON.parse(file.blb_path).name}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Berita Acara Lainnya
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">Dokumen Berita Acara Lainnya</th>
                  </tr>
                </thead>
                <tbody>
                  {lainnya.length === 0 ? (
                    <tr className="capitalize bg-gray-200 border-b">
                      <td className="p-2 italic text-center">
                        File tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    lainnya.map((file, index) => (
                      <tr
                        className="border border-collapse border-blue-200"
                        key={index}
                      >
                        <td
                          className={`p-2 cursor-pointer`}
                          onClick={() => {
                            if (!downloading) {
                              setDownloading(true);
                              handleDownload(
                                file.ctn_id_content,
                                file.ctn_versi,
                                JSON.parse(file.blb_path).name
                              ).then(() => setDownloading(false));
                            }
                          }}
                        >
                          {index + 1}.
                          {downloading ? (
                            <span className="ml-2">Mengunduh File...</span>
                          ) : (
                            <span
                              className={`ml-2  text-blue-500 hover:text-blue-600 hover:underline ${
                                downloading ? 'cursor-not-allowed' : ''
                              }`}
                            >
                              {JSON.parse(file.blb_path).name}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-5 mb-10 bg-white rounded-lg shadow-md">
      <RenderTable />
    </div>
  );
};

export default TableDetaiLelang;
