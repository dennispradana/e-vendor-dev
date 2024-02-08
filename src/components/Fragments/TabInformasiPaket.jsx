import React, { useEffect, useState } from 'react';
import { SkeletonItem } from '../Elements/Skelekton';
import { Link, useParams } from 'react-router-dom';
import { TiStar } from 'react-icons/ti';
import { CetakBeritaAcara } from '../Elements/Modal/pp';
import { useFormik } from 'formik';
import { evaluasiService } from '../../services/evaluasi.service';
import { FileUploadDokBeritaAcara } from '../Elements/Modal/fileUpload';
import { toasterror } from '../../utils/ToastMessage';

const initialState = {
  kualifikasi: false,
  penawaran: false,
  pengadaan: false,
  lainnya: false,
  formKualifikasi: false,
  formPenawaran: false,
  formPengadaan: false,
};

const TabInformasiPaket = ({ data, loading, onUpdate }) => {
  const { llsId } = useParams();
  const { updateBerita } = evaluasiService();
  const [modal, setModal] = useState(initialState);
  const {
    kualifikasi,
    penawaran,
    pengadaan,
    lainnya,
    formKualifikasi,
    formPenawaran,
    formPengadaan,
  } = modal;

  const initialValues = {
    berita: {
      BA_EVALUASI_KUALIFIKASI: {
        brc_id_attachment: '',
        brt_info: '',
        brt_no: '',
        brt_tgl_evaluasi: '',
        brc_jenis_ba: '',
      },
      BA_EVALUASI_PENAWARAN: {
        brc_id_attachment: '',
        brt_info: '',
        brt_no: '',
        brt_tgl_evaluasi: '',
        brc_jenis_ba: '',
      },
      BA_HASIL_LELANG: {
        brc_id_attachment: '',
        brt_info: '',
        brt_no: '',
        brt_tgl_evaluasi: '',
        brc_jenis_ba: '',
      },
      BA_TAMBAHAN: {
        brc_id_attachment: '',
        brc_jenis_ba: '',
      },
    },
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateBerita(llsId, values);
    } catch (error) {
      toasterror(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.setValues({
      berita: {
        BA_EVALUASI_KUALIFIKASI: {
          brc_id_attachment:
            data.berita?.BA_EVALUASI_KUALIFIKASI?.brc_id_attachment || '',
          brt_info: data.berita?.BA_EVALUASI_KUALIFIKASI?.brt_info || '',
          brt_no: data.berita?.BA_EVALUASI_KUALIFIKASI?.brt_no || '',
          brt_tgl_evaluasi:
            data.berita?.BA_EVALUASI_KUALIFIKASI?.brt_tgl_evaluasi || '',
          brc_jenis_ba:
            data.berita?.BA_EVALUASI_KUALIFIKASI?.brc_jenis_ba || '',
        },
        BA_EVALUASI_PENAWARAN: {
          brc_id_attachment:
            data.berita?.BA_EVALUASI_PENAWARAN?.brc_id_attachment || '',
          brt_info: data.berita?.BA_EVALUASI_PENAWARAN?.brt_info || '',
          brt_no: data.berita?.BA_EVALUASI_PENAWARAN?.brt_no || '',
          brt_tgl_evaluasi:
            data.berita?.BA_EVALUASI_PENAWARAN?.brt_tgl_evaluasi || '',
          brc_jenis_ba: data.berita?.BA_EVALUASI_PENAWARAN?.brc_jenis_ba || '',
        },
        BA_HASIL_LELANG: {
          brc_id_attachment:
            data.berita?.BA_HASIL_LELANG?.brc_id_attachment || '',
          brt_info: data.berita?.BA_HASIL_LELANG?.brt_info || '',
          brt_no: data.berita?.BA_HASIL_LELANG?.brt_no || '',
          brt_tgl_evaluasi:
            data.berita?.BA_HASIL_LELANG?.brt_tgl_evaluasi || '',
          brc_jenis_ba: data.berita?.BA_HASIL_LELANG?.brc_jenis_ba || '',
        },
        BA_TAMBAHAN: {
          brc_id_attachment: data.berita?.BA_TAMBAHAN?.brc_id_attachment || '',
          brc_jenis_ba: data.berita?.BA_TAMBAHAN?.brc_jenis_ba || '',
        },
      },
    });
  }, [data]);

  const handleModal = (modalType) => {
    setModal((prev) => ({
      ...prev,
      [modalType]: true,
    }));
  };

  const handleCloseModal = (modalType) => {
    setModal((prev) => ({
      ...prev,
      [modalType]: false,
    }));
  };

  const handleSaveKualifikasi = async (dokIdAttachment) => {
    formik.setFieldValue(
      'berita.BA_EVALUASI_KUALIFIKASI.brc_id_attachment',
      dokIdAttachment
    );

    try {
      formik.setSubmitting(true);
      await formik.submitForm();
      onUpdate();
      setModal((prev) => ({
        ...prev,
        kualifikasi: false,
      }));
    } catch (error) {
      toasterror(error.message);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const handleSavePenawaran = async (dokIdAttachment) => {
    formik.setFieldValue(
      'berita.BA_EVALUASI_PENAWARAN.brc_id_attachment',
      dokIdAttachment
    );

    try {
      formik.setSubmitting(true);
      await formik.submitForm();
      onUpdate();
      setModal((prev) => ({
        ...prev,
        penawaran: false,
      }));
    } catch (error) {
      toasterror(error.message);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const handleSavePengadaan = async (dokIdAttachment) => {
    formik.setFieldValue(
      'berita.BA_HASIL_LELANG.brc_id_attachment',
      dokIdAttachment
    );

    try {
      formik.setSubmitting(true);
      await formik.submitForm();
      onUpdate();
      setModal((prev) => ({
        ...prev,
        pengadaan: false,
      }));
    } catch (error) {
      toasterror(error.message);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const handleSaveLainnya = async (dokIdAttachment) => {
    formik.setFieldValue(
      'berita.BA_TAMBAHAN.brc_id_attachment',
      dokIdAttachment
    );

    try {
      formik.setSubmitting(true);
      await formik.submitForm();
      onUpdate();
      setModal((prev) => ({
        ...prev,
        lainnya: false,
      }));
    } catch (error) {
      toasterror(error.message);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const RenderTablePemenang = () => {
    return (
      <table className="w-full text-sm text-left border border-collapse">
        <tbody>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">
              Kode Pengadaan
            </th>
            <td className="px-4 py-2 border-b">{data.lelang?.lls_id}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">Nama Paket</th>
            <td className="px-4 py-2 border-b">{data.lelang?.pkt_nama}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">
              Tahap Paket Saat Ini
            </th>
            <td className="px-4 py-2 border-b">Penguman Pemenang</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Dokumen Pemilihan
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">Dokumen Pemilihan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-collapse border-blue-200">
                    <td className="p-2">
                      <Link
                        className="hover:text-blue-500"
                        to={`/dokumen-evaluasi/${data.lelang?.lls_id}`}
                      >
                        {data.dokumen?.dll_nama_dokumen}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Hasil Evaluasi
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-sm text-left rounded-md">
                <thead>
                  <tr className="capitalize border-b">
                    <th className="p-1">pengumaman pemenang</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">
                      <div className="grid grid-cols-2">
                        <div className="px-2">
                          <div className="flex align-top">
                            <p className="capitalize">urutan 1</p>
                            <div className="text-yellow-500 ">
                              <TiStar />
                            </div>
                          </div>
                          <p>* Pemanang Hasil evaluasi</p>
                        </div>
                        <div className="capitalize">
                          {data.evaluasi?.pemenang?.rkn_nama}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          {data.berita && data.berita?.mode && (
            <tr>
              <th className="w-1/4 px-4 py-2 align-top border-b border-r">
                Berita Acara Hasil Evaluasi Kualifikasi
              </th>
              <td className="px-4 py-2 border-b">
                <table className="w-full mb-4 text-sm text-left rounded-md">
                  <thead className="bg-blue-100">
                    <tr className="border border-collapse border-blue-200">
                      <th className="p-2">
                        <div className="flex items-center justify-end gap-4 px-3">
                          {data.berita?.BA_EVALUASI_KUALIFIKASI !== null && (
                            <button
                              onClick={() => handleModal('kualifikasi')}
                              className="px-3 py-1 text-xs text-white capitalize bg-gray-500 rounded hover:bg-gray-600"
                            >
                              Upload
                            </button>
                          )}
                          <button
                            onClick={() => handleModal('formKualifikasi')}
                            className="px-3 py-1 text-xs text-white capitalize bg-gray-500 rounded hover:bg-gray-600"
                          >
                            Cetak
                          </button>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-collapse border-blue-200">
                      <td className="p-2">
                        {data.berita?.BA_EVALUASI_KUALIFIKASI?.brt_no}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          )}
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Berita Acara Hasil Evaluasi Penawaraan
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full mb-4 text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">
                      <div className="flex items-center justify-end gap-4 px-3">
                        {data.berita?.BA_EVALUASI_PENAWARAN !== null && (
                          <button
                            onClick={() => handleModal('penawaran')}
                            className="px-3 py-1 text-xs text-white capitalize bg-gray-500 rounded hover:bg-gray-600"
                          >
                            Upload
                          </button>
                        )}
                        <button
                          onClick={() => handleModal('formPenawaran')}
                          className="px-3 py-1 text-xs text-white capitalize bg-gray-500 rounded hover:bg-gray-600"
                        >
                          Cetak
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-collapse border-blue-200">
                    <td className="p-2">
                      {data.berita?.BA_EVALUASI_PENAWARAN?.brt_no}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Berita Acara Hasil Pengadaan
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full mb-4 text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">
                      <div className="flex items-center justify-end gap-4 px-3">
                        {data.berita?.BA_HASIL_LELANG !== null && (
                          <button
                            onClick={() => handleModal('pengadaan')}
                            className="px-3 py-1 text-xs text-white capitalize bg-gray-500 rounded hover:bg-gray-600"
                          >
                            Upload
                          </button>
                        )}
                        <button
                          onClick={() => handleModal('formPengadaan')}
                          className="px-3 py-1 text-xs text-white capitalize bg-gray-500 rounded hover:bg-gray-600"
                        >
                          Cetak
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-collapse border-blue-200">
                    <td className="p-2">
                      {data.berita?.BA_HASIL_LELANG?.brt_no}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Berita Acara Lainya
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full mb-4 text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">
                      <div className="flex items-center justify-end gap-4 px-3">
                        <button
                          onClick={() => handleModal('lainnya')}
                          className="px-3 py-1 text-xs text-white capitalize bg-gray-500 rounded hover:bg-gray-600"
                        >
                          Upload
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const RenderTable = () => {
    return loading ? (
      <>
        <table className="w-full text-sm text-left border border-collapse">
          <tbody>
            <tr>
              <th className="w-1/4 px-4 py-2 border-b border-r">
                <SkeletonItem itemCount={10} cN="bg-gray-200 h-4" />
              </th>
              <td className="px-4 py-2 border-b">
                <SkeletonItem itemCount={10} cN="bg-gray-200 h-4" />
              </td>
            </tr>
          </tbody>
        </table>
      </>
    ) : (
      <table className="w-full text-sm text-left border border-collapse">
        <tbody>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">
              Kode Pengadaan
            </th>
            <td className="px-4 py-2 border-b">{data.lelang?.lls_id}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">Nama Paket</th>
            <td className="px-4 py-2 border-b">{data.lelang?.pkt_nama}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">
              Tahap Paket Saat Ini
            </th>
            <td className="px-4 py-2 border-b">{data.lelang?.tahapan}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Dokumen Pemilihan
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">Dokumen Pemilihan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-collapse border-blue-200">
                    <td className="p-2">
                      <Link
                        className="hover:text-blue-500"
                        to={`/dokumen-evaluasi/${data.lelang?.lls_id}`}
                      >
                        {data.dokumen?.dll_nama_dokumen}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Hasil Evaluasi
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-sm text-left rounded-md">
                <thead className="bg-blue-100">
                  <tr className="border border-collapse border-blue-200">
                    <th className="p-2">Nama Penyedia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-collapse border-blue-200">
                    <td className="p-2">{data.peserta?.rkn_nama}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const RenderContent = () => {
    return data.evaluasi !== null && data.evaluasi?.pemenang !== null ? (
      <RenderTablePemenang />
    ) : (
      <RenderTable />
    );
  };

  return loading ? (
    <>
      <table className="w-full text-sm text-left border border-collapse">
        <tbody>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">
              <SkeletonItem itemCount={10} cN="bg-gray-200 h-4" />
            </th>
            <td className="px-4 py-2 border-b">
              <SkeletonItem itemCount={10} cN="bg-gray-200 h-4" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  ) : (
    <>
      <RenderContent />
      {kualifikasi && (
        <FileUploadDokBeritaAcara
          close={() => handleCloseModal('kualifikasi')}
          Id={data.berita?.BA_EVALUASI_KUALIFIKASI?.brc_id_attachment}
          save={handleSaveKualifikasi}
        />
      )}
      {formKualifikasi && (
        <CetakBeritaAcara
          close={() => handleCloseModal('formKualifikasi')}
          title="Cetak Berita Acara Hasil Evaluasi Kualifikasi"
          form="BA_EVALUASI_KUALIFIKASI"
          data={data}
          onUpdate={onUpdate}
        />
      )}
      {penawaran && (
        <FileUploadDokBeritaAcara
          Id={data.berita?.BA_EVALUASI_PENAWARAN?.brc_id_attachment}
          save={handleSavePenawaran}
          close={() => handleCloseModal('penawaran')}
        />
      )}
      {formPenawaran && (
        <CetakBeritaAcara
          close={() => handleCloseModal('formPenawaran')}
          title="Cetak Berita Acara Hasil Evaluasi Penawaran"
          form="BA_EVALUASI_PENAWARAN"
          data={data}
          onUpdate={onUpdate}
        />
      )}
      {pengadaan && (
        <FileUploadDokBeritaAcara
          Id={data.berita?.BA_HASIL_LELANG?.brc_id_attachment}
          save={handleSavePengadaan}
          close={() => handleCloseModal('pengadaan')}
        />
      )}
      {formPengadaan && (
        <CetakBeritaAcara
          close={() => handleCloseModal('formPengadaan')}
          title="Cetak Berita Acara Hasil Evaluasi Pengadaan"
          form="BA_HASIL_LELANG"
          data={data}
          onUpdate={onUpdate}
        />
      )}
      {lainnya && (
        <FileUploadDokBeritaAcara
          Id={data.berita?.BA_TAMBAHAN?.brc_id_attachment}
          save={handleSaveLainnya}
          close={() => handleCloseModal('lainnya')}
        />
      )}
    </>
  );
};

export default TabInformasiPaket;
