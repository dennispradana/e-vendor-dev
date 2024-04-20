import React, { useEffect, useState } from 'react';
import { InputFlex, TextAreaFlex } from '../Elements/Input';
import { SkeletonItem } from '../Elements/Skelekton';
import { formatDate, formatEditDate } from '../../utils/formatDate';
import { FileUploadPemilihan } from '../Elements/Modal/fileUpload';
import Button from '../Elements/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { Tiptap } from '../Elements/Editor';
import { ppkService } from '../../services/ppk.service';
import Spinner from '../Elements/Spinner';

const FormKontrakPPk = ({ data, loading, kontrakId }) => {
  const [showModal, setShowModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [kontrakIdAtt, setKontrakIdAtt] = useState('');
  const { updateKontrak, downloadFileKontrak } = ppkService();

  const initialValues = {
    kontrak: {
      kontrak_lingkup_pekerjaan: '',
      kontrak_no: '',
      kontrak_tanggal: '',
      kontrak_kota: '',
      nama_ppk_kontrak: '',
      nip_ppk_kontrak: '',
      no_skpemenang: '',
      tgl_skpemenang: '',
      kode_akun_kegiatan: '',
      lama_durasi_penyerahan1: '',
      lama_durasi_pemeliharaan: '',
      jabatan_ppk_kontrak: '',
      no_sk_ppk_kontrak: '',
      kontrak_wakil_penyedia: '',
      kontrak_jabatan_wakil: '',
      kontrak_namarekening: '',
      kontrak_norekening: '',
      kontrak_namapemilikrekening: '',
      kontrak_nilai: '',
      kontrak_id_attacment: '',
      informasi: '',
    },
  };

  const validation = Yup.object({
    kontrak: Yup.object({
      kontrak_lingkup_pekerjaan: Yup.string()
        .required()
        .test((value) => value !== '<p></p>'),
      kontrak_no: Yup.string().required(),
      kontrak_tanggal: Yup.date().required(),
      kontrak_kota: Yup.string().required(),
      nama_ppk_kontrak: Yup.string().required(),
      nip_ppk_kontrak: Yup.string().required(),
      no_skpemenang: Yup.string().required(),
      tgl_skpemenang: Yup.date().required(),
      kode_akun_kegiatan: Yup.string().required(),
      lama_durasi_penyerahan1: Yup.string().required(),
      lama_durasi_pemeliharaan: Yup.string().required(),
      jabatan_ppk_kontrak: Yup.string().required(),
      no_sk_ppk_kontrak: Yup.string().required(),
      kontrak_wakil_penyedia: Yup.string().required(),
      kontrak_jabatan_wakil: Yup.string().required(),
      kontrak_namarekening: Yup.string().required(),
      kontrak_norekening: Yup.string().required(),
      kontrak_namapemilikrekening: Yup.string().required(),
      kontrak_nilai: Yup.string().required(),
    }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await updateKontrak(kontrakId, values);
      if (response.success) {
        toastsuccess('Data Disimpan');
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
      kontrak: {
        kontrak_lingkup_pekerjaan:
          data.kontrak?.kontrak_lingkup_pekerjaan || '',
        kontrak_no: data.kontrak?.kontrak_no || '',
        kontrak_tanggal: data.kontrak?.kontrak_tanggal
          ? formatEditDate(new Date(data.kontrak?.kontrak_tanggal))
          : '',
        kontrak_kota: data.kontrak?.kontrak_kota || '',
        nama_ppk_kontrak: data.kontrak?.nama_ppk_kontrak || '',
        nip_ppk_kontrak: data.kontrak?.nip_ppk_kontrak || '',
        no_skpemenang: data.kontrak?.no_skpemenang || '',
        tgl_skpemenang: data.kontrak?.tgl_skpemenang
          ? formatEditDate(new Date(data.kontrak?.tgl_skpemenang))
          : '',
        kode_akun_kegiatan: data.kontrak?.kode_akun_kegiatan || '',
        lama_durasi_penyerahan1: data.kontrak?.lama_durasi_penyerahan1 || '',
        lama_durasi_pemeliharaan: data.kontrak?.lama_durasi_pemeliharaan || '',
        jabatan_ppk_kontrak: data.kontrak?.jabatan_ppk_kontrak || '',
        no_sk_ppk_kontrak: data.kontrak?.no_sk_ppk_kontrak || '',
        kontrak_wakil_penyedia: data.kontrak?.kontrak_wakil_penyedia || '',
        kontrak_jabatan_wakil: data.kontrak?.kontrak_jabatan_wakil || '',
        kontrak_namarekening: data.kontrak?.kontrak_namarekening || '',
        kontrak_norekening: data.kontrak?.kontrak_norekening || '',
        kontrak_namapemilikrekening:
          data.kontrak?.kontrak_namapemilikrekening || '',
        kontrak_nilai: data.kontrak?.kontrak_nilai || '',
        kontrak_id_attacment: data.kontrak?.kontrak_id_attacment || '',
        informasi: data.kontrak?.informasi || '',
      },
    });
  }, [data]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = (kontrakIdAttachment) => {
    setShowModal(false);
    setKontrakIdAtt(kontrakIdAttachment);
    formik.setFieldValue('kontrak.kontrak_id_attacment', kontrakIdAttachment);
  };

  const handleEditorChange = (value) => {
    formik.setFieldValue('kontrak.kontrak_lingkup_pekerjaan', value);
  };

  const handleBack = () => {
    history.back();
  };

  const handleDownload = async (idContent) => {
    try {
      const response = await downloadFileKontrak(idContent);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Kontrak-[${data.kontrak?.lls_id}].pdf`;
      a.click();
      if (response.status === 200) {
        toastsuccess('File Berhasil Diunduh');
      } else {
        toasterror('Gagal mengunduh file');
      }
    } catch (error) {
      toasterror(error.message);
    }
  };

  const Dokumen = () => {
    const renderCetak = () => {
      return (
        <>
          <button
            onClick={handleOpenModal}
            className="px-3 py-2 mb-2 text-white bg-green-500 rounded hover:bg-green-600"
            type="button"
          >
            {data.kontrak?.kontrak_id_attacment !== null
              ? 'Lihat Dokumen'
              : 'Unggah Dokumen'}
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
        <form onSubmit={formik.handleSubmit}>
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
                      <Tiptap
                        onChange={handleEditorChange}
                        desc={
                          data.kontrak?.kontrak_lingkup_pekerjaan
                            ? data.kontrak?.kontrak_lingkup_pekerjaan
                            : ''
                        }
                      />
                      {formik.touched.kontrak?.kontrak_lingkup_pekerjaan &&
                        formik.errors.kontrak?.kontrak_lingkup_pekerjaan && (
                          <p className="mt-2 text-sm italic text-red-500">
                            Tidak Boleh Kosong
                          </p>
                        )}
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
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps('kontrak.kontrak_no')}
                        error={
                          formik.touched.kontrak?.kontrak_no &&
                          formik.errors.kontrak?.kontrak_no
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Tanggal Surat Perjanjian
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="date"
                        {...formik.getFieldProps('kontrak.kontrak_tanggal')}
                        error={
                          formik.touched.kontrak?.kontrak_tanggal &&
                          formik.errors.kontrak?.kontrak_tanggal
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Kota Surat Perjanjian
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps('kontrak.kontrak_kota')}
                        error={
                          formik.touched.kontrak?.kontrak_kota &&
                          formik.errors.kontrak?.kontrak_kota
                        }
                      />
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
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps('kontrak.nama_ppk_kontrak')}
                        error={
                          formik.touched.kontrak?.nama_ppk_kontrak &&
                          formik.errors.kontrak?.nama_ppk_kontrak
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      NIP PPK
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps('kontrak.nip_ppk_kontrak')}
                        error={
                          formik.touched.kontrak?.nip_ppk_kontrak &&
                          formik.errors.kontrak?.nip_ppk_kontrak
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      No. SK Pemenang
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps('kontrak.no_skpemenang')}
                        error={
                          formik.touched.kontrak?.no_skpemenang &&
                          formik.errors.kontrak?.no_skpemenang
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Tanggal SK Pemenang
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="date"
                        {...formik.getFieldProps('kontrak.tgl_skpemenang')}
                        error={
                          formik.touched.kontrak?.tgl_skpemenang &&
                          formik.errors.kontrak?.tgl_skpemenang
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Kode Akun Kegiatan
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps('kontrak.kode_akun_kegiatan')}
                        error={
                          formik.touched.kontrak?.kode_akun_kegiatan &&
                          formik.errors.kontrak?.kode_akun_kegiatan
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Durasi Penyerahan Pertama (Hari)
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps(
                          'kontrak.lama_durasi_penyerahan1'
                        )}
                        error={
                          formik.touched.kontrak?.lama_durasi_penyerahan1 &&
                          formik.errors.kontrak?.lama_durasi_penyerahan1
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Durasi Pemeliharaan (Hari)
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps(
                          'kontrak.lama_durasi_pemeliharaan'
                        )}
                        error={
                          formik.touched.kontrak?.lama_durasi_pemeliharaan &&
                          formik.errors.kontrak?.lama_durasi_pemeliharaan
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Jabatan PPK
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps('kontrak.jabatan_ppk_kontrak')}
                        error={
                          formik.touched.kontrak?.jabatan_ppk_kontrak &&
                          formik.errors.kontrak?.jabatan_ppk_kontrak
                        }
                      />
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      No. SK PPK
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps('kontrak.no_sk_ppk_kontrak')}
                        error={
                          formik.touched.kontrak?.no_sk_ppk_kontrak &&
                          formik.errors.kontrak?.no_sk_ppk_kontrak
                        }
                      />
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
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps(
                          'kontrak.kontrak_wakil_penyedia'
                        )}
                        error={
                          formik.touched.kontrak?.kontrak_wakil_penyedia &&
                          formik.errors.kontrak?.kontrak_wakil_penyedia
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Jabatan Wakil Penyedia
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps(
                          'kontrak.kontrak_jabatan_wakil'
                        )}
                        error={
                          formik.touched.kontrak?.kontrak_jabatan_wakil &&
                          formik.errors.kontrak?.kontrak_jabatan_wakil
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Nama Bank
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps(
                          'kontrak.kontrak_namarekening'
                        )}
                        error={
                          formik.touched.kontrak?.kontrak_namarekening &&
                          formik.errors.kontrak?.kontrak_namarekening
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      No. Rekening Bank
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps('kontrak.kontrak_norekening')}
                        error={
                          formik.touched.kontrak?.kontrak_norekening &&
                          formik.errors.kontrak?.kontrak_norekening
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Nama Pemilik Rekening
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps(
                          'kontrak.kontrak_namapemilikrekening'
                        )}
                        error={
                          formik.touched.kontrak?.kontrak_namapemilikrekening &&
                          formik.errors.kontrak?.kontrak_namapemilikrekening
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Nilai Kontrak
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="number"
                        cN="number-input"
                        {...formik.getFieldProps('kontrak.kontrak_nilai')}
                        error={
                          formik.touched.kontrak?.kontrak_nilai &&
                          formik.errors.kontrak?.kontrak_nilai
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Informasi Lainya
                    </th>
                    <td className="px-4 py-2 border-b">
                      <TextAreaFlex
                        {...formik.getFieldProps('kontrak.informasi')}
                        error={
                          formik.touched.kontrak?.informasi &&
                          formik.errors.kontrak?.informasi
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <Dokumen />
          <div className="flex gap-4 mt-6">
            <Button
              cN={`btn bg-sky-500 text-white  hover:bg-blue-600 ease-in duration-200 ${
                formik.isSubmitting || downloading
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              type="submit"
              disabled={formik.isSubmitting || downloading}
            >
              {formik.isSubmitting || downloading ? <Spinner /> : 'Simpan'}
            </Button>
            <Button
              cN={`btn bg-green-600 text-white hover:bg-green-700 ease-in duration-200 ${
                formik.isSubmitting || downloading
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={formik.isSubmitting || downloading}
              type="button"
              onClick={() => {
                if (!downloading) {
                  setDownloading(true);
                  handleDownload(data.kontrak?.kontrak_id).then(() =>
                    setDownloading(false)
                  );
                }
              }}
            >
              {formik.isSubmitting || downloading ? <Spinner /> : 'Cetak'}
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
