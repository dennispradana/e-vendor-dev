import React from 'react';
import { formatDate } from '../../utils/formatDate';

const FormSuratPenawaran = ({ data, formik }) => {
  const renderStatus = () => {
    const status = data.peserta?.tgl_surat_penawaran;
    return status === null ? (
      <p>
        Status:
        <span className="px-2 py-1 ml-2 text-white bg-gray-700 rounded">
          Belum Setuju
        </span>
      </p>
    ) : (
      <p>
        Status:
        <span className="px-2 py-1 ml-2 text-white bg-green-700 rounded">
          Setuju
        </span>
      </p>
    );
  };

  const renderMasaBerlaku = () => {
    return (
      <input
        type="text"
        className="w-10 text-center border border-collapse border-black"
        {...formik.getFieldProps('peserta.masa_berlaku_penawaran')}
      />
    );
  };
  return (
    <>
      <div className="px-3 my-6">{renderStatus()}</div>
      <div className="px-3 py-2 text-justify">
        <p className="pb-2">
          Sehubungan dengan undangan Pengadaan Langsung nomor:
          <span className="px-1">{data.dok_lelang?.dll_nomorsdp}</span>
          tanggal
          <span className="px-1">
            {formatDate(new Date(data.dok_lelang?.dll_tglsdp))}
          </span>
          dan setelah kami pelajari dengan saksama Dokumen Pengadaan, dengan ini
          kami mengajukan penawaran untuk pekerjaan
          <span className="px-1">{data.peserta?.pkt_nama}</span>
          sebesar yang tercantum pada surat penawaran
        </p>
        <p className="pb-2">
          Penawaran ini sudah memperhatikan ketentuan dan persyaratan yang
          tercantum dalam Dokumen Pengadaan Langsung untuk melaksanakan
          pekerjaan tersebut di atas.
        </p>
        <p className="pb-2">
          Penawaran ini berlaku selama
          <span className="px-2 py-1">{renderMasaBerlaku()}</span>
          hari kalender sejak tanggal surat penawaran ini.
        </p>
        <p className="pb-2">
          Sesuai dengan persyaratan pada Dokumen Pemilihan, bersama ini Surat
          kami lampirkan Persyaratan Dokumen dan Persyatan harga
        </p>
        <p className="pb-2">
          Dengan disampaikannya Surat Penawaran ini, maka kami menyatakan
          sanggup dan akan tunduk pada semua ketentuan yang tercantum dalam
          Dokumen Pengadaan.
        </p>
      </div>
    </>
  );
};

export default FormSuratPenawaran;
