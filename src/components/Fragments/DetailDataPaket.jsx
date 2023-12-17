import React from 'react';
import Spinner from '../Elements/Spinner';
import { formatRp } from '../../utils/formatRupiah';

const DetailDataPaket = ({ datas, loading }) => {
  return loading ? (
    <div className="h-[60vh] flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <>
      <table className="w-full text-xs text-left border border-collapse">
        <tbody>
          <tr>
            <th className="px-4 py-2 border-b border-r">
              Rencana Umum Pengadaan
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-xs text-left text-gray-500 border border-collapse">
                <thead>
                  <tr>
                    <th className="px-2 py-2 bg-gray-100 border">Kode RUP</th>
                    <th className="px-2 py-2 bg-gray-100 border">Nama Paket</th>
                    <th className="px-2 py-2 bg-gray-100 border">
                      Sumber Dana
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.anggaran?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-2 py-2 border-r">{item.rup_id}</td>
                      <td className="px-2 py-2 border-r">{item.ang_nama}</td>
                      <td className="px-2 py-2 border-r">{item.sbd_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b border-r">Anggaran</th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-xs text-left text-gray-500 border border-collapse">
                <thead>
                  <tr>
                    <th className="px-2 py-2 bg-gray-100 border">Tahun</th>
                    <th className="px-2 py-2 bg-gray-100 border">
                      Sumber Dana
                    </th>
                    <th className="px-2 py-2 bg-gray-100 border">MAK</th>
                    <th className="px-2 py-2 bg-gray-100 border">Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.anggaran?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-2 py-2 border-r">{item.ang_tahun}</td>
                      <td className="px-2 py-2 border-r">{item.sbd_id}</td>
                      <td className="px-2 py-2 border-r">
                        {item.ang_koderekening}
                      </td>
                      <td className="px-2 py-2 border-r">
                        {formatRp(item.ang_nilai)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b border-r">Nama Paket</th>
            <td className="px-4 py-4 text-gray-500 border-b">
              {datas.paket?.pkt_nama}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b border-r">Metode Pemilihan</th>
            <td className="px-4 py-4 text-gray-500 border-b">
              {datas.paket?.mtd_pemilihan === '0'
                ? 'Dibawah 200 Juta'
                : 'Diatas 200 Juta'}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b border-r">Nilai Pagu Paket</th>
            <td className="px-4 py-2 text-gray-500 border-b">
              {formatRp(datas.paket?.pkt_pagu)}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b border-r">Lokasi</th>
            <td className="w-5/6 px-4 py-2 border-b">
              <table className="w-full text-xs text-left text-gray-500 border border-collapse">
                <thead>
                  <tr>
                    <th className="px-2 py-2 bg-gray-100 border">Provinsi</th>
                    <th className="px-2 py-2 bg-gray-100 border">Kab/Kota</th>
                    <th className="px-2 py-2 bg-gray-100 border">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.lokasi?.map((lokasiItem, index) => (
                    <tr key={index}>
                      <td className="px-2 py-2 border-r">{lokasiItem.prop}</td>
                      <td className="px-2 py-2 border-r">
                        {lokasiItem.pkt_lokasi}
                      </td>
                      <td className="px-2 py-2 border-r">{lokasiItem.kota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DetailDataPaket;
