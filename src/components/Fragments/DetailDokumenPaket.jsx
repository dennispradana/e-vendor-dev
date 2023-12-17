import React from 'react';

const DetailDokumenPaket = ({
  data,
  handleModalKAK,
  handleModalRK,
  handleModalIL,
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
            <td className="px-4 py-2 border-b">
              {data.panitia === null ? data.pp.peg_nama : data.panitia.pnt_nama}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b border-r">Jenis Kontrak</th>
            <td className="px-4 py-2 border-b">{renderJenisKontrak()}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DetailDokumenPaket;
