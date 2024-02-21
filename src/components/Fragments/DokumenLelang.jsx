import React, { useEffect, useState } from 'react';
import { pjbService } from '../../services/pjb.service';
import { useParams } from 'react-router-dom';
import { fileService } from '../../services/file.service';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { SkeletonItem } from '../Elements/Skelekton';

const initialState = {
  pemilihan: [],
  kak: [],
  kontrak: [],
};

const DokumenLelang = () => {
  const { llsId } = useParams();
  const { getDokLelang } = pjbService();
  const { getFile, downloadFileBa } = fileService();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [file, setFile] = useState(initialState);
  const { pemilihan, kak, kontrak } = file;

  const fetchFile = async (type, idContent) => {
    try {
      const response = await getFile(idContent);
      setFile((prev) => ({
        ...prev,
        [type]: response,
      }));
    } catch (error) {
      toasterror(error.message);
    }
  };

  const pemilihanFile = async (idContent) => {
    await fetchFile('pemilihan', idContent);
  };

  const kontrakFile = async (idContent) => {
    await fetchFile('kontrak', idContent);
  };

  const kerangkaAcuanKerja = async (idContent) => {
    await fetchFile('kak', idContent);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDokLelang(llsId);
        setData(response.data);
        const dokumenIdAttachment = response.data.dokumen?.dll_id_attachment;
        const kontenSpek = response.data.konten?.dll_spek;
        const kontenSskkAttachment = response.data.konten?.dll_sskk_attachment;

        await pemilihanFile(dokumenIdAttachment);
        await kerangkaAcuanKerja(kontenSpek);
        await kontrakFile(kontenSskkAttachment);
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
          {pemilihan.map((file, index) => (
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
          <h1 className="mb-3 font-bold">Persyaratan Kualifikasi</h1>
          <div className="mb-6 border-b ">
            <p className="mb-1 text-sm font-semibold">Administrasi</p>
            {data.checklist?.kualifikasi?.administrasi.length === 0 ? (
              <p className="text-xs text-justify">
                Tidak ada Persyaratan Administrasi
              </p>
            ) : (
              data.checklist?.kualifikasi?.administrasi.map((item, index) => (
                <div className="flex gap-2 p-1" key={item.ckm_id}>
                  <p className="text-xs text-justify align-top">
                    {index + 1 + '.'}
                  </p>
                  <p className="text-xs text-justify">{item.ckm_nama}</p>
                </div>
              ))
            )}
          </div>
          <div className="mb-6 border-b ">
            <p className="mb-1 text-sm font-semibold">Keuangan</p>
            {data.checklist?.kualifikasi?.keuangan.length === 0 ? (
              <p className="text-xs text-justify">
                Tidak ada Persyaratan Keuangan
              </p>
            ) : (
              data.checklist?.kualifikasi?.keuangan.map((item, index) => (
                <div className="flex gap-2 p-1" key={item.ckm_id}>
                  <p className="text-xs text-justify align-top">
                    {index + 1 + '.'}
                  </p>
                  <p className="text-xs text-justify">{item.ckm_nama}</p>
                </div>
              ))
            )}
          </div>
          <div className="mb-6 border-b ">
            <p className="mb-1 text-sm font-semibold">Teknis</p>
            {data.checklist?.kualifikasi?.teknis.length === 0 ? (
              <p className="text-xs text-justify">
                Tidak ada Persyaratan Teknis
              </p>
            ) : (
              data.checklist?.kualifikasi?.teknis.map((item, index) => (
                <div className="flex gap-2 p-1" key={item.ckm_id}>
                  <p className="text-xs text-justify align-top">
                    {index + 1 + '.'}
                  </p>
                  <p className="text-xs text-justify">{item.ckm_nama}</p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="mb-6">
          <h1 className="mb-3 font-bold">Dokumen Penawaran</h1>
          <div className="mb-6 border-b ">
            <p className="mb-1 text-sm font-semibold">Administrasi</p>
            {data.checklist?.penawaran?.administrasi.length === 0 ? (
              <p className="text-xs text-justify">
                Tidak ada Persyaratan Administrasi
              </p>
            ) : (
              data.checklist?.penawaran?.administrasi.map((item, index) => (
                <div className="flex gap-2 p-1" key={item.ckm_id}>
                  <p className="text-xs text-justify align-top">
                    {index + 1 + '.'}
                  </p>
                  <p className="text-xs text-justify">{item.ckm_nama}</p>
                </div>
              ))
            )}
          </div>
          <div className="mb-6 border-b ">
            <p className="mb-1 text-sm font-semibold">Keuangan</p>
            {data.checklist?.penawaran?.harga.length === 0 ? (
              <p className="text-xs text-justify">
                Tidak ada Persyaratan Harga
              </p>
            ) : (
              data.checklist?.penawaran?.harga.map((item, index) => (
                <div className="flex gap-2 p-1" key={item.ckm_id}>
                  <p className="text-xs text-justify align-top">
                    {index + 1 + '.'}
                  </p>
                  <p className="text-xs text-justify">{item.ckm_nama}</p>
                </div>
              ))
            )}
          </div>
          <div className="mb-6 border-b ">
            <p className="mb-1 text-sm font-semibold">Teknis</p>
            {data.checklist?.penawaran?.teknis.length === 0 ? (
              <p className="text-xs text-justify">
                Tidak ada Persyaratan Teknis
              </p>
            ) : (
              data.checklist?.penawaran?.teknis.map((item, index) => (
                <div className="flex gap-2 p-1" key={item.ckm_id}>
                  <p className="text-xs text-justify align-top">
                    {index + 1 + '.'}
                  </p>
                  <p className="text-xs text-justify">{item.ckm_nama}</p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="mb-6">
          <h1 className="font-bold">
            Kerangka Acuan Kerja (KAK) / Spesifikasi Teknis dan Gambar
          </h1>
          {kak.map((file, index) => (
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
          {kontrak.map((file, index) => (
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
              <thead className="text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
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
                    <td className="px-3 py-2 text-center capitalize">
                      {item.vol}
                    </td>
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
    <div className="container p-5 mx-auto ">
      <div className="py-10 mb-10 bg-white rounded-lg shadow-lg page-padding">
        <RenderContent />
      </div>
    </div>
  );
};

export default DokumenLelang;
