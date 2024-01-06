import React from 'react';
import Spinner from '../Elements/Spinner';
import { formatRp } from '../../utils/formatRupiah';

const optionsKgr = [
  { value: 0, label: 'Pengadaan Barang' },
  { value: 1, label: 'Jasa Konsultansi Badan Usaha Non Konstruks' },
  { value: 2, label: 'Pekerjaan Konstruksi' },
  { value: 3, label: 'Jasa Lainnya' },
  { value: 4, label: 'Jasa Konsultansi Perorangan Non Konstruksi' },
  { value: 5, label: 'Jasa Konsultansi Badan Usaha Konstruksi' },
  { value: 6, label: 'Jasa Konsultansi Perorangan Konstruksi' },
  { value: 7, label: 'Pekerjaan Konstruksi Terintegrasi' },
];

const optionsBtk = [
  { value: 0, label: 'Kecil' },
  { value: 1, label: 'Non-Kecil' },
];

const FormDataPaketLelang = ({
  datas,
  loading,
  handleModalKAK,
  handleModalRK,
  handleModalIL,
  formik,
}) => {
  const renderBtkUsaha = () => {
    const lls_bentuk_usaha = datas.nonLel?.lls_bentuk_usaha;
    switch (lls_bentuk_usaha) {
      case '0':
        return <p>Kecil</p>;
      case '1':
        return <p>Non-Kecil</p>;
      default:
        return <p>Loading...</p>;
    }
  };

  const renderKategori = () => {
    const kategori = datas.nonLel?.kgr_id;
    switch (kategori) {
      case '0':
        return <p>Pengadaan Barang</p>;
      case '1':
        return <p>Jasa Konsultansi Badan Usaha Non Konstruksi</p>;
      case '2':
        return <p>Pekerjaan Konstruksi</p>;
      case '3':
        return <p>Jasa Lainnya</p>;
      case '4':
        return <p>Jasa Konsultansi Perorangan Non Konstruksi</p>;
      case '5':
        return <p>Jasa Konsultansi Badan Usaha Konstruksi</p>;
      case '6':
        return <p>Jasa Konsultansi Perorangan Konstruksi</p>;
      case '7':
        return <p>Pekerjaan Konstruksi Terintegrasi</p>;
      default:
        return <p>Loading...</p>;
    }
  };

  const renderNilaiPagu = () => {
    const statusConfig = {
      edit: {
        condition:
          datas.checklist?.kualifikasi.length ||
          datas.checklist?.penawaran.length !== 0,
        render: <>{renderBtkUsaha()}</>,
      },
      readOnly: {
        condition:
          datas.checklist?.kualifikasi.length ||
          datas.checklist?.penawaran.length === 0,
        render: (
          <select
            className={`w-full py-1 px-3 text-gray-700 bg-white border ${
              formik.touched.nonLel?.lls_bentuk_usaha &&
              formik.errors.nonLel?.lls_bentuk_usaha
                ? 'border-red-500 focus:ring-red-600'
                : 'border-gray-300  focus:ring-sky-600'
            } rounded-md shadow-sm focus:outline-none focus:ring-2  focus:border-transparent`}
            {...formik.getFieldProps('nonLel.lls_bentuk_usaha')}
          >
            <option value="" disabled hidden>
              Pilih Salah Satu
            </option>
            {optionsBtk.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ),
      },
    };

    const status = Object.keys(statusConfig).find(
      (key) => statusConfig[key].condition
    );

    return status ? statusConfig[status].render : null;
  };

  const renderJenisPengadaan = () => {
    const statusConfig = {
      edit: {
        condition:
          datas.checklist?.kualifikasi.length ||
          datas.checklist?.penawaran.length !== 0,
        render: <>{renderKategori()}</>,
      },
      readOnly: {
        condition:
          datas.checklist?.kualifikasi.length ||
          datas.checklist?.penawaran.length === 0,
        render: (
          <select
            className={`w-full py-1 px-3 text-gray-700 bg-white border ${
              formik.touched.nonLel?.kgr_id && formik.errors.nonLel?.kgr_id
                ? 'border-red-500 focus:ring-red-600'
                : 'border-gray-300  focus:ring-sky-600'
            } rounded-md shadow-sm focus:outline-none focus:ring-2  focus:border-transparent`}
            {...formik.getFieldProps('nonLel.kgr_id')}
          >
            <option value="" disabled hidden>
              Pilih Salah Satu
            </option>
            {optionsKgr.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ),
      },
    };

    const status = Object.keys(statusConfig).find(
      (key) => statusConfig[key].condition
    );

    return status ? statusConfig[status].render : null;
  };

  return loading ? (
    <div className="h-[60vh] flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <>
      <table className="w-full text-xs text-left border border-collapse">
        <tbody>
          <tr>
            <th className="w-1/3 px-4 py-2 border-b border-r">
              Kode Pengadaan
            </th>
            <td className="px-4 py-4 text-gray-500 border-b">
              {datas.nonLel?.lls_id}
            </td>
          </tr>
          <tr>
            <th className="w-1/3 px-4 py-2 border-b border-r ">Nilai HPS</th>
            <td className="px-4 py-4 text-gray-500 border-b">
              {formatRp(datas.nonLel?.pkt_hps)}
            </td>
          </tr>
          <tr>
            <th className="w-1/3 px-4 py-2 border-b border-r">Nama Paket</th>
            <td className="px-4 py-4 text-gray-500 border-b">
              {datas.nonLel?.pkt_nama}
            </td>
          </tr>
          <tr>
            <th className="w-1/3 px-4 py-2 border-b border-r">
              Jenis Pengadaan
            </th>
            <td className="px-4 py-4 text-sm border-b">
              {renderJenisPengadaan()}
              {formik.touched.nonLel?.kgr_id &&
                formik.errors.nonLel?.kgr_id && (
                  <p className="mt-2 text-sm italic text-red-500">
                    {formik.errors.nonLel?.kgr_id}
                  </p>
                )}
            </td>
          </tr>
          <tr>
            <th className="w-1/3 px-4 py-2 border-b border-r">
              Nilai Pagu Paket
            </th>
            <td className="px-4 py-4 text-sm border-b">
              {renderNilaiPagu()}
              {formik.touched.nonLel?.lls_bentuk_usaha &&
                formik.errors.nonLel?.lls_bentuk_usaha && (
                  <p className="mt-2 text-sm italic text-red-500">
                    {formik.errors.nonLel?.lls_bentuk_usaha}
                  </p>
                )}
            </td>
          </tr>
          <tr>
            <th className="w-1/3 px-4 py-2 border-b border-r">
              Kerangka Acuan Kerja (KAK) / Spesifikasi Teknis dan Gambar
            </th>
            <td className="px-4 py-4 text-sm border-b">
              <button
                type="button"
                className="text-blue-500 underline hover:text-blue-800"
                onClick={handleModalKAK}
              >
                Lihat Dokumen
              </button>
            </td>
          </tr>
          <tr>
            <th className="w-1/3 px-4 py-2 border-b border-r">
              Rancangan Kontrak
            </th>
            <td className="px-4 py-4 text-sm border-b">
              <button
                type="button"
                className="text-blue-500 underline hover:text-blue-800"
                onClick={handleModalRK}
              >
                Lihat Dokumen
              </button>
            </td>
          </tr>
          <tr>
            <th className="w-1/3 px-4 py-2 border-b border-r">
              Kerangka Acuan Kerja (KAK) / Spesifikasi Teknis dan Gambar
            </th>
            <td className="px-4 py-4 text-sm border-b">
              <button
                type="button"
                className="text-blue-500 underline hover:text-blue-800"
                onClick={handleModalIL}
              >
                Lihat Dokumen
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FormDataPaketLelang;
