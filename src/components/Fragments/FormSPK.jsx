import React, { useEffect, useState } from 'react';
import { SkeletonItem } from '../Elements/Skelekton';
import { formatRp } from '../../utils/formatRupiah';
import { InputFlex } from '../Elements/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { formatEditDate } from '../../utils/formatDate';
import Spinner from '../Elements/Spinner';
import Button from '../Elements/Button';
import { ppkService } from '../../services/ppk.service';
import { FileUploadPemilihan } from '../Elements/Modal/fileUpload';

const FormSPK = ({ loading, data, spkId }) => {
  const [showModal, setShowModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [spkIdAtt, setSpkIdAtt] = useState('');
  const { updateSpk, downloadFileSpk } = ppkService();

  const initialValues = {
    spk: {
      spk_tgl: '',
      spk_content: {
        tgl_brng_diterima: '',
        waktu_penyelesaian: '',
        tgl_pekerjaan_selesai: '',
        kota_pesanan: '',
      },
      spk_no: '',
      spk_nilai: '',
      spk_norekening: '',
      spk_nama_bank: '',
      spk_wakil_penyedia: '',
      spk_jabatan_wakil: '',
      spk_attachment: '',
    },
  };

  const validation = Yup.object({
    spk: Yup.object({
      spk_tgl: Yup.date().required(),
      spk_content: Yup.object({
        waktu_penyelesaian: Yup.string().required(),
        kota_pesanan: Yup.string().required(),
        tgl_brng_diterima: Yup.date().required(),
        tgl_pekerjaan_selesai: Yup.date()
          .required()
          .min(Yup.ref('tgl_brng_diterima')),
      }),
      spk_no: Yup.string().required(),
      spk_wakil_penyedia: Yup.string().required(),
      spk_jabatan_wakil: Yup.string().required(),
      spk_nama_bank: Yup.string().required(),
      spk_norekening: Yup.string().required(),
      spk_nilai: Yup.string().required(),
    }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await updateSpk(spkId, values);
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
      spk: {
        spk_tgl: data.spk?.spk_tgl
          ? formatEditDate(new Date(data.spk?.spk_tgl))
          : '',
        spk_content: {
          tgl_brng_diterima: data.spk?.spk_content?.tgl_brng_diterima
            ? formatEditDate(new Date(data.spk?.spk_content?.tgl_brng_diterima))
            : '',
          waktu_penyelesaian: data.spk?.spk_content?.waktu_penyelesaian || '',
          tgl_pekerjaan_selesai: data.spk?.spk_content?.tgl_pekerjaan_selesai
            ? formatEditDate(
                new Date(data.spk?.spk_content?.tgl_pekerjaan_selesai)
              )
            : '',
          kota_pesanan: data.spk?.spk_content?.kota_pesanan || '',
        },
        spk_no: data.spk?.spk_no || '',
        spk_nilai: data.spk?.spk_nilai || '',
        spk_norekening: data.spk?.spk_norekening || '',
        spk_nama_bank: data.spk?.spk_nama_bank || '',
        spk_wakil_penyedia: data.spk?.spk_wakil_penyedia || '',
        spk_jabatan_wakil: data.spk?.spk_jabatan_wakil || '',
        spk_attachment: data.spk?.spk_attachment || '',
      },
    });
  }, [data]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = (spkIdAttachment) => {
    setShowModal(false);
    setSpkIdAtt(spkIdAttachment);
    formik.setFieldValue('spk.spk_attachment', spkIdAttachment);
  };

  const handleDownload = async (idContent) => {
    try {
      const response = await downloadFileSpk(idContent);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SPK-[${data.spk?.lls_id}].pdf`;
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

  const handleBack = () => {
    history.back();
  };

  const renderCetak = () => {
    return (
      <>
        <button
          onClick={handleOpenModal}
          className="px-3 py-2 mb-2 text-white bg-green-500 rounded hover:bg-green-600"
          type="button"
        >
          {data.spk?.spk_attachment !== null
            ? 'Lihat Dokumen'
            : 'Unggah Dokumen'}
        </button>
      </>
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
                      Kode Pengadaan
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
                      Nilai Pagu
                    </th>
                    <td className="px-4 py-2 border-b">
                      {formatRp(data.lelang?.pkt_pagu)}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Nilai HPS
                    </th>
                    <td className="px-4 py-2 border-b">
                      {formatRp(data.lelang?.pkt_hps)}
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
                <p className="px-4 py-2 text-sm font-bold">Form SPK</p>
              </div>
              <table className="w-full text-sm text-left border border-collapse">
                <tbody>
                  <tr>
                    <th className="w-1/4 px-4 py-2 border-b border-r">
                      No. Surat Perintah Kerja (SPK)
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps('spk.spk_no')}
                        error={
                          formik.touched.spk?.spk_no &&
                          formik.errors.spk?.spk_no
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Tanggal SPK
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="date"
                        {...formik.getFieldProps('spk.spk_tgl')}
                        error={
                          formik.touched.spk?.spk_tgl &&
                          formik.errors.spk?.spk_tgl
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Kota Surat SPK
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps(
                          'spk.spk_content.kota_pesanan'
                        )}
                        error={
                          formik.touched.spk?.spk_content?.kota_pesanan &&
                          formik.errors.spk?.spk_content?.kota_pesanan
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
                    <td className="px-4 py-2 uppercase border-b">
                      {data.ppk?.peg_nama}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 border-b border-r">
                      Nama NIP
                    </th>
                    <td className="px-4 py-2 border-b">{data.ppk?.peg_nip}</td>
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
                    <td className="px-4 py-2 capitalize border-b">
                      {data.rekanan?.rkn_alamat}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Wakil Sah Penyedia
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps('spk.spk_wakil_penyedia')}
                        error={
                          formik.touched.spk?.spk_wakil_penyedia &&
                          formik.errors.spk?.spk_wakil_penyedia
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
                        {...formik.getFieldProps('spk.spk_jabatan_wakil')}
                        error={
                          formik.touched.spk?.spk_jabatan_wakil &&
                          formik.errors.spk?.spk_jabatan_wakil
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
                        {...formik.getFieldProps('spk.spk_nama_bank')}
                        error={
                          formik.touched.spk?.spk_nama_bank &&
                          formik.errors.spk?.spk_nama_bank
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
                        {...formik.getFieldProps('spk.spk_norekening')}
                        error={
                          formik.touched.spk?.spk_norekening &&
                          formik.errors.spk?.spk_norekening
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
            <div className="mb-3">
              <div className="mb-2 bg-blue-200">
                <p className="px-4 py-2 text-sm font-bold">
                  Informasi Pendukung
                </p>
              </div>
              <table className="w-full text-sm text-left border border-collapse">
                <tbody>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Nilai Kontrak
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="number"
                        cN="number-input"
                        {...formik.getFieldProps('spk.spk_nilai')}
                        error={
                          formik.touched.spk?.spk_nilai &&
                          formik.errors.spk?.spk_nilai
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Waktu Penyelesaian Pekerjaan
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="text"
                        {...formik.getFieldProps(
                          'spk.spk_content.waktu_penyelesaian'
                        )}
                        error={
                          formik.touched.spk?.spk_content?.waktu_penyelesaian &&
                          formik.errors.spk?.spk_content?.waktu_penyelesaian
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Tanggal Mulai Kerja
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="date"
                        {...formik.getFieldProps(
                          'spk.spk_content.tgl_brng_diterima'
                        )}
                        error={
                          formik.touched.spk?.spk_content?.tgl_brng_diterima &&
                          formik.errors.spk?.spk_content?.tgl_brng_diterima
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Tanggal Selesai Kerja
                    </th>
                    <td className="px-4 py-2 border-b">
                      <InputFlex
                        type="date"
                        {...formik.getFieldProps(
                          'spk.spk_content.tgl_pekerjaan_selesai'
                        )}
                        error={
                          formik.touched.spk?.spk_content
                            ?.tgl_pekerjaan_selesai &&
                          formik.errors.spk?.spk_content?.tgl_pekerjaan_selesai
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                      Dokumen Cetak
                    </th>
                    <td className="px-4 py-2 border-b">{renderCetak()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
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
                  handleDownload(data.spk?.spk_id).then(() =>
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
            data.spk?.spk_attachment !== null
              ? data.spk?.spk_attachment
              : spkIdAtt
          }
          close={handleCloseModal}
        />
      )}
    </>
  );
};

export default FormSPK;
