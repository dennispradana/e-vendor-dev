import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { penyediaService } from '../../services/penyedia.service';
import { fileService } from '../../services/file.service';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { SkeletonItem } from '../Elements/Skelekton';

const DokumenRKN = () => {
  const { llsId } = useParams();
  const { getDokPenawaran } = penyediaService();
  const { getFile, downloadFile } = fileService();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [filePemilihan, setFilePemilihan] = useState([]);
  const [fileKak, setFileKak] = useState([]);
  const [fileKontrak, setFileKontrak] = useState([]);

  const pemilihan = async (idContent) => {
    try {
      const response = await getFile(idContent);
      setFilePemilihan(response);
    } catch (error) {
      toasterror(error.message);
    }
  };
  const kontrak = async (idContent) => {
    try {
      const response = await getFile(idContent);
      setFileKontrak(response);
    } catch (error) {
      toasterror(error.message);
    }
  };

  const kerangkaAcuanKerja = async (idContent) => {
    try {
      const response = await getFile(idContent);
      setFileKak(response);
    } catch (error) {
      toasterror(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDokPenawaran(llsId);
        setData(response.data);
        pemilihan(response.data.dokumen?.dll_id_attachment);
        kerangkaAcuanKerja(response.data.konten?.dll_spek);
        kontrak(response.data.konten?.dll_sskk_attachment);
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [llsId]);

  const handleDownload = async (idContent, versi, fileName) => {
    try {
      const response = await downloadFile(idContent, versi);
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

  const RenderContent = () => {
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-1 mb-8">
          <h1 className="font-bold">Dokumen Pemilihan</h1>
          <p className="text-sm text-gray-600">
            Nomor: <span>{data.konten?.dll_nomorsdp}</span>
          </p>
          <p className="text-sm text-gray-600">
            Untuk Pengadaan: <span>{data.lelang?.pkt_nama}</span>
          </p>
          <p>Rumah Sakit Umum Daerah Gambiran Kota Kediri</p>
        </div>
        <div className="mb-6">
          <h1 className="font-bold">Dokumen Pemilihan</h1>
          {filePemilihan.map((file, index) => (
            <div className="flex items-center gap-2 py-1 text-sm" key={index}>
              <p>{index + 1}.</p>
              <p>{JSON.parse(file.blb_path).name}</p>
              <button
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
                className={`font-semibold text-blue-500 hover:text-blue-600 hover:underline ${
                  downloading ? 'cursor-not-allowed' : ''
                }`}
                disabled={downloading}
              >
                download
              </button>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h1 className="font-bold">Masa Berlaku Penawaran</h1>
          <p className="py-1 text-sm">
            Masa berlaku penawaran selama
            <span className="mx-1">{data.konten?.durasi}</span>hari kalender
            sejak batas akhir pemasukan dokumen penawaran
          </p>
        </div>
        <div className="mb-6">
          <h1 className="font-bold">Persyaratan Kualifikasi</h1>
          <div className="py-1 ">
            <table className="w-full text-xl text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-2 py-2 border border-gray-200">No</th>
                  <th className="px-2 py-2 border border-gray-200">
                    Persyaratan Kualifikasi
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto text-xs">
                {data.checklist?.kualifikasi.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="2"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      Tidak ada Persyaratan Kualifikasi
                    </td>
                  </tr>
                ) : (
                  data.checklist?.kualifikasi.map((item, index) => (
                    <tr
                      key={item.ckm_id}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-2 text-center text-gray-900 align-top whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-3 py-2 capitalize">{item.ckm_nama}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-6">
          <h1 className="font-bold">Dokumen Penawaran</h1>
          <div className="py-1 ">
            <table className="w-full text-xl text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-2 py-2 border border-gray-200">No</th>
                  <th className="px-2 py-2 border border-gray-200">
                    Persyaratan penawaran
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto text-xs">
                {data.checklist?.penawaran.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="2"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      belum ada Persyaratan penawaran
                    </td>
                  </tr>
                ) : (
                  data.checklist?.penawaran.map((item, index) => (
                    <tr
                      key={item.ckm_id}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-2 text-center text-gray-900 align-top whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-3 py-2 capitalize">{item.ckm_nama}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-6">
          <h1 className="font-bold">
            Kerangka Acuan Kerja (KAK) / Spesifikasi Teknis dan Gambar
          </h1>
          {fileKak.map((file, index) => (
            <div className="flex items-center gap-2 py-1 text-sm" key={index}>
              <p>{index + 1}.</p>
              <p>{JSON.parse(file.blb_path).name}</p>
              <button
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
                className={`font-semibold text-blue-500 hover:text-blue-600 hover:underline ${
                  downloading ? 'cursor-not-allowed' : ''
                }`}
                disabled={downloading}
              >
                download
              </button>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h1 className="font-bold">Rancangan Kontrak</h1>
          {fileKontrak.map((file, index) => (
            <div className="flex items-center gap-2 py-1 text-sm" key={index}>
              <p>{index + 1}.</p>
              <p>{JSON.parse(file.blb_path).name}</p>
              <button
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
                className={`font-semibold text-blue-500 hover:text-blue-600 hover:underline ${
                  downloading ? 'cursor-not-allowed' : ''
                }`}
                disabled={downloading}
              >
                download
              </button>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h1 className="font-bold">Daftar Kuantitas dan Harga / Biaya</h1>
          <div className="py-1 ">
            <table className="w-full text-xl text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-2 py-2 border border-gray-200">
                    Jenis Barang/Jasa
                  </th>
                  <th className="px-2 py-2 border border-gray-200">
                    Satuan Unit
                  </th>
                  <th className="px-2 py-2 border border-gray-200">Volume</th>
                  <th className="px-2 py-2 border border-gray-200">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto text-xs">
                {data.konten?.dll_dkh.map((item, index) => (
                  <tr
                    key={index}
                    className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-3 py-2 text-center text-gray-900 align-top whitespace-nowrap"
                    >
                      {item.item}
                    </th>
                    <td className="px-3 py-2 capitalize">{item.paket}</td>
                    <td className="px-3 py-2 capitalize">{item.vol}</td>
                    <td className="px-3 py-2 capitalize">{item.keterangan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return loading ? (
    <SkeletonItem itemCount={10} cN="bg-gray-200 h-8" />
  ) : (
    <div className="container mx-auto">
      <div className="py-10 mb-10 rounded-lg shadow-lg page-padding">
        <RenderContent />
      </div>
    </div>
  );
};

export default DokumenRKN;
