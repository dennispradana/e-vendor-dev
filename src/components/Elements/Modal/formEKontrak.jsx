import React, { useEffect, useState } from 'react';
import { IoIosCloseCircle, IoMdRemoveCircleOutline } from 'react-icons/io';
import { ppkService } from '../../../services/ppk.service';
import { formatRp } from '../../../utils/formatRupiah';
import { SkeletonItem } from '../Skelekton';
import { InputFlex } from '../Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toasterror, toastsuccess } from '../../../utils/ToastMessage';
import Button from '../Button';
import Spinner from '../Spinner';

const FormEKontrak = ({ close, updated, llsId }) => {
  const { getSuratKontrak, postSppbj } = ppkService();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

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

  const initialValues = {
    sppbj: {
      sppbj_no: '',
      sppbj_lamp: '',
      sppbj_tgl_buat: '',
      sppbj_kota: '',
      jabatan_ppk_sppbj: '',
      alamat_satker: '',
      jaminan_pelaksanaan: '',
      masa_berlaku_jaminan: '',
      sppbj_tembusan: '',
      peg_id: '',
      psr_id: '',
    },
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const tembusan = tags.join(', ');
    const newValues = {
      sppbj: {
        ...values.sppbj,
        peg_id: data.ppk?.peg_id,
        sppbj_tembusan: tembusan,
      },
    };
    try {
      const response = await postSppbj(llsId, newValues);
      if (response.success) {
        formik.resetForm();
        toastsuccess('Data Disimpan');
        updated();
        close();
      }
    } catch (error) {
      toasterror(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

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

  const inputLampiran = () => {
    return (
      <div className="flex flex-col">
        <InputFlex type="text" {...formik.getFieldProps('sppbj.sppbj_lamp')} />
        <p className="mt-2 text-xs italic capitalize">
          Contoh Pengisian: 1 Lembar
        </p>
        <p className="text-xs italic">isi dengan tanda (-) jika tidak ada</p>
      </div>
    );
  };

  const handlePemenangChange = (psrId) => {
    formik.setFieldValue('sppbj.psr_id', psrId);
  };

  const inputPemenang = (item) => {
    return (
      <label className="flex cursor-pointer ">
        <input
          type="radio"
          className="w-3"
          onChange={() => handlePemenangChange(item.psr_id)}
        />
        <span className="pl-2">{item.rkn_nama}</span>
      </label>
    );
  };

  const inputTembusan = () => {
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
            <form onSubmit={formik.handleSubmit}>
              <InformasiPaket />
              {loading ? (
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
                        <th className="w-1/4 px-4 py-2 border-b border-r">
                          No. SPPBJ
                        </th>
                        <td className="px-4 py-2 border-b">
                          <InputFlex
                            type="text"
                            {...formik.getFieldProps('sppbj.sppbj_no')}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                          Lampiran SPPBJ
                        </th>
                        <td className="px-4 py-2 border-b">
                          {inputLampiran()}
                        </td>
                      </tr>
                      <tr>
                        <th className="w-1/4 px-4 py-2 border-b border-r">
                          Tanggal SPPBJ
                        </th>
                        <td className="px-4 py-2 border-b">
                          <InputFlex
                            type="date"
                            {...formik.getFieldProps('sppbj.sppbj_tgl_buat')}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="w-1/4 px-4 py-2 border-b border-r">
                          Kota SPPBJ
                        </th>
                        <td className="px-4 py-2 border-b">
                          <InputFlex
                            type="text"
                            {...formik.getFieldProps('sppbj.sppbj_kota')}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {loading ? (
                <SkeletonItem itemCount={1} cN="bg-gray-200 h-36" />
              ) : (
                <div className="mb-2">
                  <div className="mb-2 bg-blue-200">
                    <p className="px-4 py-2 text-sm font-bold">Pihak Pertama</p>
                  </div>
                  <table className="w-full text-sm text-left border border-collapse">
                    <tbody>
                      <tr>
                        <th className="w-1/4 px-4 py-2 border-b border-r">
                          Nama PPK
                        </th>
                        <td className="px-4 py-2 uppercase border-b">
                          {data.ppk?.peg_nama}
                        </td>
                      </tr>
                      <tr>
                        <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                          NIP PPK
                        </th>
                        <td className="px-4 py-2 border-b">
                          {data.ppk?.peg_nip}
                        </td>
                      </tr>
                      <tr>
                        <th className="w-1/4 px-4 py-2 border-b border-r">
                          Jabatan PPK
                        </th>
                        <td className="px-4 py-2 border-b">
                          <InputFlex
                            type="text"
                            {...formik.getFieldProps('sppbj.jabatan_ppk_sppbj')}
                          />
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
                          <InputFlex
                            type="text"
                            {...formik.getFieldProps('sppbj.alamat_satker')}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {loading ? (
                <SkeletonItem itemCount={1} cN="bg-gray-200 h-36" />
              ) : (
                <div className="mb-2">
                  <div className="mb-2 bg-blue-200">
                    <p className="px-4 py-2 text-sm font-bold">Pihak Kedua</p>
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
                                <tr
                                  key={index}
                                  className="border border-collapse "
                                >
                                  <td className="p-2 uppercase border-r">
                                    {inputPemenang(item)}
                                  </td>
                                  <td className="p-2 border-r">
                                    {item.rkn_npwp}
                                  </td>
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
                          <InputFlex
                            type="text"
                            {...formik.getFieldProps(
                              'sppbj.jaminan_pelaksanaan'
                            )}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="w-1/4 px-4 py-2 border-b border-r">
                          Tembusan
                        </th>
                        <td className="px-4 py-2 border-b">
                          {inputTembusan()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              <div className="flex justify-center mt-5">
                <Button
                  cN={`btn bg-sky-500 text-white  hover:bg-blue-600 ease-in duration-200 ${
                    formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? <Spinner /> : 'Simpan'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </>
  );
};

export default FormEKontrak;
