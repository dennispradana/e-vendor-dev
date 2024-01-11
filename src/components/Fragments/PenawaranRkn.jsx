import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { penyediaService } from '../../services/penyedia.service';
import { toasterror } from '../../utils/ToastMessage';
import { formatDateTime } from '../../utils/formatDate';
import { formatRp } from '../../utils/formatRupiah';
import { SkeletonItem } from '../Elements/Skelekton';

const PenawaranRkn = () => {
  const { llsId } = useParams();
  const { getPenawaran } = penyediaService();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPenawaran(llsId);
        setData(response.data);
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderKualifikasi = () => {
    return data.kualifikasi !== null ? (
      <div className="flex flex-wrap items-center gap-4">
        <p>Dokumen Kulifikasi</p>
        <p className="p-1 text-white bg-green-600 rounded">
          Status:<span className="ml-1">Sudah Dikirim </span>
          pada:
          <span className="ml-1">
            {formatDateTime(new Date(data.kualifikasi?.dok_tgljam))}
          </span>
        </p>
        <Link
          className="px-2 py-1 bg-blue-500 rounded hover:bg-blue-600"
          to={`/dokumen-kualifikasi/${data.lelang?.lls_id}`}
        >
          <p className="text-white">Kirim Data</p>
        </Link>
      </div>
    ) : (
      <div className="flex flex-wrap items-center gap-4">
        <p className="p-1 text-white bg-gray-400 rounded">
          Status : Belum Dikirim
        </p>
        <Link
          className="px-2 py-1 bg-blue-500 rounded hover:bg-blue-600"
          to={`/dokumen-kualifikasi/${data.lelang?.lls_id}`}
        >
          <p className="text-white">Kirim Data</p>
        </Link>
      </div>
    );
  };

  const renderPenawaran = () => {
    return (
      <div className="px-2 py-3">
        <p className="mb-2 italic font-semibold">Status Pengiriman Dokumen</p>
        <div className="py-6 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-4">
            <p>
              Surat Penawaran:
              <span className="mx-1">
                {data.penawaran?.surat === null ? (
                  <span className="px-2 py-1 text-white bg-red-500 rounded">
                    Belum Kirim
                  </span>
                ) : (
                  <span className="px-2 py-1 text-white bg-green-600 rounded">
                    Sudah Kirim pada:
                    <span className="mx-1">
                      {formatDateTime(
                        new Date(data.penawaran?.surat?.tgl_surat_penawaran)
                      )}
                    </span>
                  </span>
                )}
              </span>
            </p>
            <p>
              Dokumen Teknis:
              <span className="mx-1">
                {data.penawaran?.teknis === null ? (
                  <span className="px-2 py-1 text-white bg-red-500 rounded">
                    Belum Kirim
                  </span>
                ) : (
                  <span className="px-2 py-1 text-white bg-green-600 rounded">
                    Sudah Kirim pada:
                    <span className="mx-1">
                      {formatDateTime(
                        new Date(data.penawaran?.teknis?.dok_tgljam)
                      )}
                    </span>
                  </span>
                )}
              </span>
            </p>
            <p>
              Dokumen Harga:
              <span className="mx-1">
                {data.penawaran?.harga === null ? (
                  <span className="px-2 py-1 text-white bg-red-500 rounded">
                    Belum Kirim
                  </span>
                ) : (
                  <span className="px-2 py-1 text-white bg-green-600 rounded">
                    Sudah Kirim pada:
                    <span className="mx-1">
                      {formatDateTime(
                        new Date(data.penawaran?.harga?.dok_tgljam)
                      )}
                    </span>
                  </span>
                )}
              </span>
            </p>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <p className="py-2 italic font-semibold">
              Total Penawaran:
              <span className="mx-1">
                {data.penawaran?.Total !== null && (
                  <span className="px-2 py-1 not-italic font-normal text-white bg-blue-500 rounded">
                    {formatRp(data.penawaran?.Total)}
                  </span>
                )}
              </span>
            </p>
            <button className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
              Kirim Penawaran
            </button>
          </div>
        </div>
      </div>
    );
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
            <td className="px-4 py-2 border-b">{data.lelang?.tahapan}</td>
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
                      <Link
                        className="hover:text-blue-500"
                        to={`/dokumen-penawaran/${data.lelang?.lls_id}`}
                      >
                        {data.dokumen?.dll_nama_dokumen}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Kualifikasi
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">Kualifikasi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-collapse border-blue-200">
                    <td className="p-2">{renderKualifikasi()}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Penawaran Anda
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">
                      Dokumen Penawaran Administrasi, Teknis dan Harga
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-collapse border-blue-200">
                    <td className="p-2">{renderPenawaran()}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div className="bg-blue-400 rounded-t-md">
        <p className="px-3 py-2 font-bold text-white capitalize">
          informasi paket
        </p>
      </div>
      <RenderTable />
    </>
  );
};

export default PenawaranRkn;
