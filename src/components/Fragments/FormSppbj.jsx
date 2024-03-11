import React, { useEffect, useState } from 'react';
import Button from '../Elements/Button';
import { formatRp } from '../../utils/formatRupiah';
import { SkeletonItem } from '../Elements/Skelekton';
import { InputFlex } from '../Elements/Input';
import { IoMdRemoveCircleOutline } from 'react-icons/io';

const FormSppbj = ({ data, loading }) => {
  const handleBack = () => {
    history.back();
  };

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
          <InputFlex type="text" />
          <p className="mt-2 text-xs italic capitalize">
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
              <td className="px-4 py-2 border-b">
                <InputFlex type="text" />
              </td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                Lampiran SPPBJ
              </th>
              <td className="px-4 py-2 border-b">{inputLampiran()}</td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">
                Tanggal SPPBJ
              </th>
              <td className="px-4 py-2 border-b">
                <InputFlex type="date" />
              </td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">Kota SPPBJ</th>
              <td className="px-4 py-2 border-b">
                <InputFlex type="text" />
              </td>
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
              <td className="px-4 py-2 border-b">
                <InputFlex type="text" />
              </td>
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
              <td className="px-4 py-2 border-b">
                <InputFlex type="text" />
              </td>
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

    const inputTembusan = () => {
      const [tags, setTags] = useState([]);
      const [tagInput, setTagInput] = useState('');

      const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
      };

      const handleAddTag = () => {
        if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
          setTags([...tags, tagInput.trim()]);
          setTagInput('');
        }
      };

      const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
      };
      return (
        <>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <div
                key={i}
                className="flex items-center px-3 py-1 text-sm rounded bg-sky-200 "
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-red-500"
                >
                  <IoMdRemoveCircleOutline />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-2">
            <input
              type="text"
              name="ius_klasifikasi"
              className="w-[90%] p-1 px-3 text-gray-700 bg-white border-t border-b border-l border-gray-300 shadow-sm appearance-none focus:ring-sky-600 focus:outline-none focus:ring-1 focus:border-transparent rounded-l-md"
              placeholder="Add tags separated by commas"
              onChange={(e) => handleTagInputChange(e)}
              value={tagInput}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="w-[10%] p-1 px-3 font-semibold text-white bg-green-500 border-t border-b border-r border-green-500 rounded-r-md hover:bg-green-600"
            >
              Tambah
            </button>
          </div>
        </>
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
              <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                Penyedia
              </th>
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
              <td className="px-4 py-2 border-b">
                <InputFlex type="text" />
              </td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                Tembusan
              </th>
              <td className="px-4 py-2 border-b">{inputTembusan()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const Dokumen = () => {
    const renderCetak = () => {
      return (
        <>
          <button className="px-3 py-2 mb-2 text-white bg-green-500 rounded hover:bg-green-600">
            Upload
          </button>
          <table className="w-full text-sm text-left border-t rounded-md">
            <thead>
              <tr>
                <th className="p-2">Nama File</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2"></td>
              </tr>
            </tbody>
          </table>
        </>
      );
    };

    return loading ? (
      <SkeletonItem itemCount={1} cN="bg-gray-200 h-36" />
    ) : (
      <div className="mb-2">
        <div className="mb-2 bg-blue-200">
          <p className="px-4 py-2 text-sm font-bold">Dokumen SPPBJ</p>
        </div>
        <table className="w-full text-sm text-left border border-collapse">
          <tbody>
            <tr>
              <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                Dokumen Cetak SPPBJ
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
      <InformasiPaket />
      <FormSPPBJ />
      <PihakPertama />
      <InformasiPendukung />
      <Dokumen />
      <div className="flex gap-4 mt-6">
        <Button
          cN={`btn bg-sky-500 text-white  hover:bg-blue-600 ease-in duration-200 `}
        >
          Simpan
        </Button>
        <Button
          cN={`btn bg-slate-300 text-black hover:bg-slate-400 ease-in duration-200 `}
          type="button"
          onClick={() => handleBack()}
        >
          Kembali
        </Button>
      </div>
    </>
  );
};

export default FormSppbj;
