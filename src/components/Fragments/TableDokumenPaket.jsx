import React from 'react';

const TableDokumenPaket = ({
  data,
  handleModalKAK,
  handleModalRK,
  handleModalIL,
  handlePilihPegawai,
  handlePilihPanitia,
}) => {
  const renderJenisKontrak = () => {
    const llsKontrakPekerjaan = data.paket?.lls_kontrak_pekerjaan;
    switch (llsKontrakPekerjaan) {
      case 1:
        return <p>Lumsum</p>;
      case 2:
        return <p>Harga Satuan</p>;
      case 3:
        return <p>Gabungan Lumsum & Harga Satuan</p>;
      case 4:
        return <p>Putar Kunci</p>;
      case 10:
        return <p>Kontrak Payung</p>;
      case 13:
        return <p>Waktu Penugasan</p>;
      case 14:
        return <p>Biaya Plus Imbalan</p>;
      default:
        return <p>Nilai tidak valid</p>;
    }
  };

  const renderPenanggungJawab = () => {
    const mtdPemilihan = data.paket.mtd_pemilihan;
    switch (mtdPemilihan) {
      case '0':
        if (data.pp === null) {
          return (
            <button
              type="button"
              className="w-full px-4 py-1 font-bold text-white duration-200 ease-in bg-green-500 rounded-lg hover:bg-green-600"
              onClick={handlePilihPegawai}
            >
              Pilih Pegawai
            </button>
          );
        } else {
          return (
            <div className="flex items-center justify-center gap-4">
              <p>{data.pp.peg_nama}</p>
              <button
                type="button"
                className="px-2 py-1 text-white duration-200 ease-in bg-gray-500 rounded-md hover:bg-gray-600"
                onClick={handlePilihPegawai}
              >
                Ganti
              </button>
            </div>
          );
        }
      case '1':
        if (data.panitia === null) {
          return (
            <button
              type="button"
              className="w-full px-4 py-1 font-bold text-white duration-200 ease-in bg-green-500 rounded-lg hover:bg-green-600"
              onClick={handlePilihPanitia}
            >
              Pilih Panitia
            </button>
          );
        } else {
          return (
            <div className="flex items-center justify-center gap-4">
              <p className="text-sm uppercase">{data.panitia.pnt_nama}</p>
              <button
                type="button"
                className="px-2 py-1 text-white duration-200 ease-in bg-gray-500 rounded-md hover:bg-gray-600"
                onClick={handlePilihPanitia}
              >
                Ganti
              </button>
            </div>
          );
        }

      default:
        null;
    }
  };

  return (
    <>
      <table className="w-full text-xs text-left border border-collapse">
        <tbody>
          <tr>
            <th className="px-4 py-2 border-b border-r">
              Kerangka Acuan Kerja (KAK) / Spesifikasi Teknis dan Gambar
            </th>
            <td className="flex items-center justify-center px-4 py-2 border-b">
              <button
                type="button"
                className="w-full px-2 py-2 font-bold text-white duration-200 ease-in bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={handleModalKAK}
              >
                Lihat Dokumen
              </button>
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b border-r">Rancangan Kontrak</th>
            <td className="flex items-center justify-center px-4 py-2 border-b">
              <button
                type="button"
                className="w-full px-2 py-2 font-bold text-white duration-200 ease-in bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={handleModalRK}
              >
                Lihat Dokumen
              </button>
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b border-r">Informasi Lainya</th>
            <td className="flex items-center justify-center px-4 py-2 border-b">
              <button
                type="button"
                className="w-full px-2 py-2 font-bold text-white duration-200 ease-in bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={handleModalIL}
              >
                Lihat Dokumen
              </button>
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b border-r">Penanggung Jawab</th>
            <td className="px-4 py-2 text-sm border-b">
              {renderPenanggungJawab()}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b border-r">Jenis Kontrak</th>
            <td className="px-4 py-2 text-center border-b">
              {renderJenisKontrak()}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TableDokumenPaket;
