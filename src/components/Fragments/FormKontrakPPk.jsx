import React, { useState } from 'react';
import { InputFlex, TextAreaFlex } from '../Elements/Input';
import { SkeletonItem } from '../Elements/Skelekton';
import { formatDate } from '../../utils/formatDate';
import { FileUploadPemilihan } from '../Elements/Modal/fileUpload';
import Button from '../Elements/Button';

const FormKontrakPPk = ({ data, loading, kontrakId }) => {
  const [showModal, setShowModal] = useState(false);
  const [kontrakIdAtt, setKontrakIdAtt] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = (kontrakIdAttachment) => {
    setShowModal(false);
    setKontrakIdAtt(kontrakIdAttachment);
  };

  const handleBack = () => {
    history.back();
  };

  const Dokumen = () => {
    const renderCetak = () => {
      return (
        <>
          <button
            onClick={handleOpenModal}
            className="px-3 py-2 mb-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Upload
          </button>
        </>
      );
    };

    return loading ? (
      <SkeletonItem itemCount={1} cN="bg-gray-200 h-36" />
    ) : (
      <div className="mb-2">
        <div className="mb-2 bg-blue-200">
          <p className="px-4 py-2 text-sm font-bold">Dokumen Perjanjian</p>
        </div>
        <table className="w-full text-sm text-left border border-collapse">
          <tbody>
            <tr>
              <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                Dokumen Cetak
              </th>
              <td className="px-4 py-2 border-b">{renderCetak()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <div className="py-10 mb-10 bg-white shadow-xl rounded-xl backdrop-blur-sm page-padding">
        <div>
          {loading ? (
            <SkeletonItem itemCount={1} cN="bg-gray-200 h-36" />
          ) : (
            <div className="mb-3">
              <div className="mb-2 bg-blue-200">
                <p className="px-4 py-2 text-sm font-bold">Informasi Paket</p>
              </div>
              <table className="w-full text-sm text-left border border-collapse">
                <tbody>
                  <tr>
                    <th className="w-1/4 px-4 py-2 border-b border-r">
                      Kode Tender
                    </th>
                    <td className="px-4 py-2 border-b">
                      {data.lelang?.lls_id}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Nama Paket
                    </th>
                    <td className="px-4 py-2 border-b">
                      {data.lelang?.pkt_nama}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Lingkup Pekerjaan
                    </th>
                    <td className="px-4 py-2 border-b">
                      <TextAreaFlex />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {loading ? (
            <SkeletonItem itemCount={1} cN="bg-gray-200 h-36" />
          ) : (
            <div className="mb-3">
              <div className="mb-2 bg-blue-200">
                <p className="px-4 py-2 text-sm font-bold">
                  Form Surat Perjanjian
                </p>
              </div>
              <table className="w-full text-sm text-left border border-collapse">
                <tbody>
                  <tr>
                    <th className="w-1/4 px-4 py-2 border-b border-r">
                      No. Surat Perjanjian
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Tanggal Surat Perjanjian
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="date" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Kota Surat Perjanjian
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="text" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {loading ? (
            <SkeletonItem itemCount={1} cN="bg-gray-200 h-36" />
          ) : (
            <div className="mb-3">
              <div className="mb-2 bg-blue-200">
                <p className="px-4 py-2 text-sm font-bold">Pihak Pertama</p>
              </div>
              <table className="w-full text-sm text-left border border-collapse">
                <tbody>
                  <tr>
                    <th className="w-1/4 px-4 py-2 border-b border-r">
                      Nama PPK
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      NIP PPK
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="date" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      No. SK Pemenang
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Tanggal SK Pemenang
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="date" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Kode Akun Kegiatan
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Durasi Penyerahan Pertama (Hari)
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Durasi Pemeliharaan (Hari)
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Jabatan PPK
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      No. SK PPK
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Nama Satuan Kerja
                    </th>
                    <td className="px-4 py-2 border-b">{data.sppbj?.satker}</td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Alamat Satuan Kerja
                    </th>
                    <td className="px-4 py-2 border-b">
                      {data.sppbj?.alamat_satker}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {loading ? (
            <SkeletonItem itemCount={1} cN="bg-gray-200 h-36" />
          ) : (
            <div className="mb-3">
              <div className="mb-2 bg-blue-200">
                <p className="px-4 py-2 text-sm font-bold">Pihak Kedua</p>
              </div>
              <table className="w-full text-sm text-left border border-collapse">
                <tbody>
                  <tr>
                    <th className="w-1/4 px-4 py-2 border-b border-r">
                      Nama Penyedia
                    </th>
                    <td className="px-4 py-2 uppercase border-b">
                      {data.rekanan?.rkn_nama}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Alamat Penyedia
                    </th>
                    <td className="px-4 py-2 border-b">
                      {data.rekanan?.rkn_alamat}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      No. Akta Pendirian
                    </th>
                    <td className="px-4 py-2 border-b">
                      {data.rekanan?.akta?.lhkp_no}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Tanggal Akta Pendirian
                    </th>
                    <td className="px-4 py-2 border-b">
                      {formatDate(new Date(data.rekanan?.akta?.lhkp_tanggal))}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Wakil Sah Penyedia
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Jabatan Wakil Penyedia
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Nama Bank
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      No. Rekening Bank
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Nama Pemilik Rekening
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="text" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Nilai Kontrak
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex type="number" cN="number-input" />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Informasi Lainya
                    </th>
                    <td className="px-4 py-2 border-b">
                      <TextAreaFlex />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <Dokumen />

          <div className="flex gap-4 mt-6">
            <Button
              cN={`btn bg-sky-500 text-white  hover:bg-blue-600 ease-in duration-200 `}
              type="submit"
              //   disabled={formik.isSubmitting}
            >
              {/* {formik.isSubmitting ? <Spinner /> : 'Simpan'} */}
              simpan
            </Button>
            <Button
              cN={`btn bg-slate-300 text-black hover:bg-slate-400 ease-in duration-200 `}
              //   disabled={formik.isSubmitting}
              type="button"
              onClick={() => handleBack()}
            >
              Kembali
            </Button>
          </div>
        </div>
      </div>
      {showModal && (
        <FileUploadPemilihan
          Id={
            data.kontrak?.kontrak_id_attacment !== null
              ? data.kontrak?.kontrak_id_attacment
              : kontrakIdAtt
          }
          close={handleCloseModal}
        />
      )}
    </>
  );
};

export default FormKontrakPPk;
