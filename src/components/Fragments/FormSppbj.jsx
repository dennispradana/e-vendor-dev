import React, { useEffect, useState } from 'react';
import Button from '../Elements/Button';
import { formatRp } from '../../utils/formatRupiah';
import { SkeletonItem } from '../Elements/Skelekton';
import { InputFlex } from '../Elements/Input';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { formatEditDate } from '../../utils/formatDate';
import { ppkService } from '../../services/ppk.service';
import { FileUploadPemilihan } from '../Elements/Modal/fileUpload';
import { useNavigate } from 'react-router-dom';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import Spinner from '../Elements/Spinner';

const FormSppbj = ({ data, loading, sppbjId }) => {
  const { updateSppbj } = ppkService();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [sppbjAtt, setSppbjAtt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.sppbj?.sppbj_tembusan) {
      const tagsArray = data.sppbj?.sppbj_tembusan.split(',');
      setTags(tagsArray);
    }
  }, [data.sppbj?.sppbj_tembusan]);

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
      sppbj_attachment: '',
      peg_id: '',
      psr_id: '',
    },
  };

  const validation = Yup.object({
    sppbj: Yup.object({
      sppbj_no: Yup.string().required(),
      sppbj_lamp: Yup.string().required(),
      sppbj_tgl_buat: Yup.date().required(),
      sppbj_kota: Yup.string().required(),
      jabatan_ppk_sppbj: Yup.string().required(),
      alamat_satker: Yup.string().required(),
      jaminan_pelaksanaan: Yup.string().required(),
      psr_id: Yup.string().required(),
    }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const tembusan = tags.join(', ');
    const newValues = {
      sppbj: {
        ...values.sppbj,
        sppbj_tembusan: tembusan,
      },
    };
    try {
      const response = await updateSppbj(sppbjId, newValues);
      if (response.success) {
        formik.resetForm();
        toastsuccess('Data Disimpan');
        navigate(`/lelang/${data.lelang?.lls_id}`);
      }
    } catch (error) {
      toasterror(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.setValues({
      sppbj: {
        sppbj_no: data.sppbj?.sppbj_no || '',
        sppbj_lamp: data.sppbj?.sppbj_lamp || '',
        sppbj_tgl_buat: data.sppbj?.sppbj_tgl_buat
          ? formatEditDate(new Date(data.sppbj?.sppbj_tgl_buat))
          : '',
        sppbj_kota: data.sppbj?.sppbj_kota || '',
        jabatan_ppk_sppbj: data.sppbj?.jabatan_ppk_sppbj || '',
        alamat_satker: data.sppbj?.alamat_satker || '',
        jaminan_pelaksanaan: data.sppbj?.jaminan_pelaksanaan || '',
        masa_berlaku_jaminan: data.sppbj?.masa_berlaku_jaminan || '',
        sppbj_tembusan: data.sppbj?.sppbj_tembusan || '',
        sppbj_attachment: data.sppbj?.sppbj_attachment || '',
        peg_id: data.sppbj?.peg_id || '',
        psr_id: data.sppbj?.psr_id || '',
      },
    });
  }, [data]);

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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = (sppbjIdAttachment) => {
    setShowModal(false);
    setSppbjAtt(sppbjIdAttachment);
    formik.setFieldValue('sppbj.sppbj_attachment', sppbjIdAttachment);
  };

  const handleBack = () => {
    history.back();
  };

  const inputLampiran = () => {
    return (
      <div className="flex flex-col">
        <InputFlex
          type="text"
          {...formik.getFieldProps('sppbj.sppbj_lamp')}
          error={
            formik.touched.sppbj?.sppbj_lamp && formik.errors.sppbj?.sppbj_lamp
          }
        />
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
          checked={formik.values.sppbj.psr_id === item.psr_id}
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
            name="sppbj.sppbj_tembusan"
            className="w-[80%] p-1 px-3 text-gray-700 bg-white border-t border-b border-l border-gray-300 shadow-sm appearance-none focus:ring-sky-600 focus:outline-none focus:ring-1 focus:border-transparent rounded-l-md"
            onChange={(e) => handleTagInputChange(e)}
            value={tagInput}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="w-[20%] p-1 px-3 font-semibold text-white bg-green-500 border-t border-b border-r border-green-500 rounded-r-md hover:bg-green-600"
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
      <div className="py-10 mb-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
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
                        error={
                          formik.touched.sppbj?.sppbj_no &&
                          formik.errors.sppbj?.sppbj_no
                        }
                      />
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
                      <InputFlex
                        type="date"
                        {...formik.getFieldProps('sppbj.sppbj_tgl_buat')}
                        error={
                          formik.touched.sppbj?.sppbj_tgl_buat &&
                          formik.errors.sppbj?.sppbj_tgl_buat
                        }
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
                        error={
                          formik.touched.sppbj?.sppbj_kota &&
                          formik.errors.sppbj?.sppbj_kota
                        }
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
                    <td className="px-4 py-2 border-b">{data.ppk?.peg_nip}</td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 border-b border-r">
                      Jabatan PPK
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps('sppbj.jabatan_ppk_sppbj')}
                        error={
                          formik.touched.sppbj?.jabatan_ppk_sppbj &&
                          formik.errors.sppbj?.jabatan_ppk_sppbj
                        }
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
                        error={
                          formik.touched.sppbj?.alamat_satker &&
                          formik.errors.sppbj?.alamat_satker
                        }
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
                      <table
                        className={`w-full text-sm text-left rounded-md border border-collapse ${
                          formik.touched.sppbj?.psr_id &&
                          formik.errors.sppbj?.psr_id
                            ? 'border-red-500 focus:ring-red-600'
                            : 'border-gray-300  focus:ring-sky-600'
                        }`}
                      >
                        <thead>
                          <tr className="">
                            <th className="px-6 py-2">Pemenang</th>
                            <th className="p-2">NPWP</th>
                            <th className="p-2">Harga</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.peserta?.map((item, index) => (
                            <tr
                              key={index}
                              className={`border border-collapse ${
                                formik.errors.sppbj?.psr_id
                                  ? 'border-red-500 focus:ring-red-600'
                                  : 'border-gray-300  focus:ring-sky-600'
                              }`}
                            >
                              <td className="p-2 uppercase">
                                {inputPemenang(item)}
                              </td>
                              <td className="p-2">{item.rkn_npwp}</td>
                              <td className="p-2">
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
                        type="number"
                        {...formik.getFieldProps('sppbj.jaminan_pelaksanaan')}
                        error={
                          formik.touched.sppbj?.jaminan_pelaksanaan &&
                          formik.errors.sppbj?.jaminan_pelaksanaan
                        }
                        cN="number-input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 border-b border-r">
                      Tembusan
                    </th>
                    <td className="px-4 py-2 border-b">{inputTembusan()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <Dokumen />
          <div className="flex gap-4 mt-6">
            <Button
              cN={`btn bg-sky-500 text-white  hover:bg-blue-600 ease-in duration-200 ${
                formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <Spinner /> : 'Simpan'}
            </Button>
            <Button
              cN={`btn bg-slate-300 text-black hover:bg-slate-400 ease-in duration-200 ${
                formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={formik.isSubmitting}
              type="button"
              onClick={() => handleBack()}
            >
              Kembali
            </Button>
          </div>
        </form>
      </div>
      {showModal && (
        <FileUploadPemilihan
          Id={
            data.sppbj?.sppbj_attachment !== null
              ? data.sppbj?.sppbj_attachment
              : sppbjAtt
          }
          close={handleCloseModal}
        />
      )}
    </>
  );
};

export default FormSppbj;
