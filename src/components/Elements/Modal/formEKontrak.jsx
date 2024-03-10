import React, { useEffect, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { ppkService } from '../../../services/ppk.service';
import { formatRp } from '../../../utils/formatRupiah';
import { SkeletonItem } from '../Skelekton';

const FormEKontrak = ({ close, llsId }) => {
  const { getSuratKontrak } = ppkService();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSuratKontrak(llsId);
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [llsId]);

  const InformasiPaket = () => {
    return loading ? (
      <SkeletonItem itemCount={1} cN="bg-gray-200 h-24" />
    ) : (
      <div className="mb-2">
        <div className="mb-2 bg-blue-200">
          <p className="px-4 py-2 text-sm font-bold">Informasi Paket</p>
        </div>
        <table className="w-full text-sm text-left border border-collapse">
          <tbody>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">Kode Tender</th>
              <td className="px-4 py-2 border-b">{data.lelang?.lls_id}</td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">Nama Paket</th>
              <td className="px-4 py-2 border-b">{data.lelang?.pkt_nama}</td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                Rencana Umum Pengadaan
              </th>
              <td className="px-4 py-2 border-b">
                <table className="w-full text-sm text-left rounded-md">
                  <thead>
                    <tr className="border border-collapse">
                      <th className="p-2 border-r">Kode RUP</th>
                      <th className="p-2 border-r">Nama Paket</th>
                      <th className="p-2 border-r">Pagu Anggaran</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.lelang?.anggaran.map((item, index) => (
                      <tr key={index} className="border border-collapse ">
                        <td className="p-2 border-r">{item.rup_id}</td>
                        <td className="p-2 border-r">{item.ang_nama}</td>
                        <td className="p-2 border-r">
                          {formatRp(item.ang_nilai)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const FormSPPBJ = () => {
    const inputLampiran = () => {
      return (
        <div className="flex flex-col">
          <p className="text-xs italic capitalize">
            Contoh Pengisian: 1 Lembar
          </p>
          <p className="text-xs italic">isi dengan tanda (-) jika tidak ada</p>
        </div>
      );
    };

    return loading ? (
      <SkeletonItem itemCount={1} cN="bg-gray-200 h-36" />
    ) : (
      <div className="mb-2">
        <div className="mb-2 bg-blue-200">
          <p className="px-4 py-2 text-sm font-bold">
            Form Surat Penunjukan Penyedia Barang/Jasa (SPPBJ)
          </p>
        </div>
        <table className="w-full text-sm text-left border border-collapse">
          <tbody>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">No. SPPBJ</th>
              <td className="px-4 py-2 border-b"></td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                Lampiran SPPBJ
              </th>
              <td className="px-4 py-2 border-b">{inputLampiran()}</td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">
                Tangal SPPBJ
              </th>
              <td className="px-4 py-2 border-b"></td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">Kota SPPBJ</th>
              <td className="px-4 py-2 border-b"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const PihakPertama = () => {
    return loading ? (
      <SkeletonItem itemCount={1} cN="bg-gray-200 h-36" />
    ) : (
      <div className="mb-2">
        <div className="mb-2 bg-blue-200">
          <p className="px-4 py-2 text-sm font-bold">Pihak Pertama</p>
        </div>
        <table className="w-full text-sm text-left border border-collapse">
          <tbody>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">Nama PPK</th>
              <td className="px-4 py-2 uppercase border-b">
                {data.ppk?.peg_nama}
              </td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                NIP PPK
              </th>
              <td className="px-4 py-2 border-b">{data.ppk?.peg_nip}</td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">Jabatan PPK</th>
              <td className="px-4 py-2 border-b"></td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">
                Nama Satuan Kerja
              </th>
              <td className="px-4 py-2 uppercase border-b">
                {data.ppk?.satker}
              </td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">
                Alamat Satuan Kerja
              </th>
              <td className="px-4 py-2 border-b"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const InformasiPendukung = () => {
    const inputPemenang = (item) => {
      return (
        <label className="flex cursor-pointer ">
          <input type="radio" className="w-3" />
          <span className="pl-2">{item}</span>
        </label>
      );
    };

    return loading ? (
      <SkeletonItem itemCount={1} cN="bg-gray-200 h-36" />
    ) : (
      <div className="mb-2">
        <div className="mb-2 bg-blue-200">
          <p className="px-4 py-2 text-sm font-bold">Pihak Pertama</p>
        </div>
        <table className="w-full text-sm text-left border border-collapse">
          <tbody>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">Penyedia</th>
              <td className="px-4 py-2 border-b">
                <table className="w-full text-sm text-left rounded-md">
                  <thead>
                    <tr className="border border-collapse">
                      <th className="px-6 py-2 border-r">Pemenang</th>
                      <th className="p-2 border-r">NPWP</th>
                      <th className="p-2 border-r">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.peserta?.map((item, index) => (
                      <tr key={index} className="border border-collapse ">
                        <td className="p-2 uppercase border-r">
                          {inputPemenang(item.rkn_nama)}
                        </td>
                        <td className="p-2 border-r">{item.rkn_npwp}</td>
                        <td className="p-2 border-r">
                          {formatRp(item.nev_harga_negosiasi)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                Nilai Jaminan Pelaksanaan
              </th>
              <td className="px-4 py-2 border-b"></td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">Tembusan</th>
              <td className="px-4 py-2 border-b"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[70vw] mx-auto my-6 max-h-screen">
          <div className="relative flex flex-col w-full px-2 pb-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="flex justify-end">
              <button className="mb-3" onClick={close}>
                <IoIosCloseCircle size="2rem" className="hover:text-red-600" />
              </button>
            </div>
            <InformasiPaket />
            <FormSPPBJ />
            <PihakPertama />
            <InformasiPendukung />
            <div className="flex justify-center mt-5">
              <button
                className="px-3 py-2 font-bold text-white bg-green-600 border-b border-solid rounded-md rounded-t hover:bg-green-700 border-slate-200"
                type="button"
              >
                Buat Kontrak
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </>
  );
};

export default FormEKontrak;
