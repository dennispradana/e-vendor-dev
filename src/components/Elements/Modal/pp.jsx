import { useEffect, useState } from 'react';
import { fileService } from '../../../services/file.service';
import { toasterror, toastsuccess } from '../../../utils/ToastMessage';
import Spinner from '../Spinner';
import { formatDate } from '../../../utils/formatDate';
import { paketService } from '../../../services/paket.service';
import { SkeletonItem } from '../Skelekton';
import { useFormik } from 'formik';
import Button from '../Button';

export const ModalKAK = ({ close, data }) => {
  const { getFile, downloadFile } = fileService();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTableFile = async () => {
      try {
        const response = await getFile(data.content.dll_spek);
        setFiles(response);
      } catch (error) {
        setError('Belum ada file yang diunggah');
      } finally {
        setLoading(false);
      }
    };
    getTableFile();
  }, [data.content.dll_spek]);

  const handleDownload = async (idContent, versi, fileName) => {
    try {
      const response = await downloadFile(idContent, versi);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
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

  const RenderTable = () => {
    return (
      <div className="relative flex flex-col h-[60vh] overflow-x-auto rounded-lg px-6 py-8">
        <div className="flex-grow">
          <table className="w-full text-sm text-left text-gray-600 md:text-sm">
            <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
              <tr role="row" className="text-center border border-gray-200">
                <th className="px-4 py-3 border border-gray-200">No</th>
                <th className="px-4 py-3 border border-gray-200">Nama File</th>
                <th className="px-4 py-3 border border-gray-200">
                  Tanggal Upload
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr className="h-56 capitalize bg-gray-200 border-b">
                  <td colSpan="4" className="text-center">
                    <Spinner />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="overflow-y-auto ">
                {files.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="4"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      {error}
                    </td>
                  </tr>
                ) : (
                  files.map((file, index) => (
                    <tr
                      key={index}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => {
                            if (!downloading) {
                              setDownloading(true);
                              handleDownload(
                                file.ctn_id_content,
                                file.ctn_versi,
                                JSON.parse(file.blb_path).name
                              ).then(() => setDownloading(false));
                            }
                          }}
                          className={`font-semibold hover:text-blue-500 hover:underline ${
                            downloading ? 'cursor-not-allowed' : ''
                          }`}
                          disabled={downloading}
                        >
                          {downloading
                            ? 'Download....'
                            : JSON.parse(file.blb_path).name}
                        </button>
                      </td>
                      <td className="px-3 py-4 text-center">
                        {formatDate(new Date(file.blb_date_time))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[70vw] mx-auto my-6 ">
          <div className="relative flex flex-col w-full px-3 py-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="font-semibold text-center">
              Dokumen Kerangka Acuan Kerja (KAK) / Spesifikasi Teknis dan Gambar
            </div>
            <RenderTable />
            <button
              onClick={close}
              className="p-3 font-bold text-red-500 border-b border-solid rounded-md rounded-t hover:text-red-600 border-slate-200"
              type="button"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </>
  );
};

export const ModalRK = ({ close, data }) => {
  const { getFile, downloadFile } = fileService();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTableFile = async () => {
      try {
        const response = await getFile(data.content.dll_sskk_attachment);
        setFiles(response);
      } catch (error) {
        setError('Belum ada file yang diunggah');
      } finally {
        setLoading(false);
      }
    };
    getTableFile();
  }, [data.content.dll_sskk_attachment]);

  const handleDownload = async (idContent, versi, fileName) => {
    try {
      const response = await downloadFile(idContent, versi);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
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

  const RenderTable = () => {
    return (
      <div className="relative flex flex-col h-[60vh] overflow-x-auto rounded-lg px-6 py-8">
        <div className="flex-grow">
          <table className="w-full text-sm text-left text-gray-600 md:text-sm">
            <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
              <tr role="row" className="text-center border border-gray-200">
                <th className="px-4 py-3 border border-gray-200">No</th>
                <th className="px-4 py-3 border border-gray-200">Nama File</th>
                <th className="px-4 py-3 border border-gray-200">
                  Tanggal Upload
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr className="h-56 capitalize bg-gray-200 border-b">
                  <td colSpan="4" className="text-center">
                    <Spinner />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="overflow-y-auto ">
                {files.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="4"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      {error}
                    </td>
                  </tr>
                ) : (
                  files.map((file, index) => (
                    <tr
                      key={index}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => {
                            if (!downloading) {
                              setDownloading(true);
                              handleDownload(
                                file.ctn_id_content,
                                file.ctn_versi,
                                JSON.parse(file.blb_path).name
                              ).then(() => setDownloading(false));
                            }
                          }}
                          className={`font-semibold hover:text-blue-500 hover:underline ${
                            downloading ? 'cursor-not-allowed' : ''
                          }`}
                          disabled={downloading}
                        >
                          {downloading
                            ? 'Download....'
                            : JSON.parse(file.blb_path).name}
                        </button>
                      </td>
                      <td className="px-3 py-4 text-center">
                        {formatDate(new Date(file.blb_date_time))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[70vw] mx-auto my-6 ">
          <div className="relative flex flex-col w-full px-3 py-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="font-semibold text-center">
              Dokumen Kerangka Acuan Kerja (KAK) / Spesifikasi Teknis dan Gambar
            </div>
            <RenderTable />
            <button
              onClick={close}
              className="p-3 font-bold text-red-500 border-b border-solid rounded-md rounded-t hover:text-red-600 border-slate-200"
              type="button"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </>
  );
};

export const ModalIL = ({ close, data }) => {
  const { getFile, downloadFile } = fileService();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTableFile = async () => {
      try {
        const response = await getFile(data.content.dll_lainya);
        setFiles(response);
      } catch (error) {
        setError('Belum ada file yang diunggah');
      } finally {
        setLoading(false);
      }
    };
    getTableFile();
  }, [data.content.dll_lainya]);

  const handleDownload = async (idContent, versi, fileName) => {
    try {
      const response = await downloadFile(idContent, versi);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
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

  const RenderTable = () => {
    return (
      <div className="relative flex flex-col h-[60vh] overflow-x-auto rounded-lg px-6 py-8">
        <div className="flex-grow">
          <table className="w-full text-sm text-left text-gray-600 md:text-sm">
            <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
              <tr role="row" className="text-center border border-gray-200">
                <th className="px-4 py-3 border border-gray-200">No</th>
                <th className="px-4 py-3 border border-gray-200">Nama File</th>
                <th className="px-4 py-3 border border-gray-200">
                  Tanggal Upload
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr className="h-56 capitalize bg-gray-200 border-b">
                  <td colSpan="4" className="text-center">
                    <Spinner />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="overflow-y-auto ">
                {files.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="4"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      {error}
                    </td>
                  </tr>
                ) : (
                  files.map((file, index) => (
                    <tr
                      key={index}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => {
                            if (!downloading) {
                              setDownloading(true);
                              handleDownload(
                                file.ctn_id_content,
                                file.ctn_versi,
                                JSON.parse(file.blb_path).name
                              ).then(() => setDownloading(false));
                            }
                          }}
                          className={`font-semibold hover:text-blue-500 hover:underline ${
                            downloading ? 'cursor-not-allowed' : ''
                          }`}
                          disabled={downloading}
                        >
                          {downloading
                            ? 'Download....'
                            : JSON.parse(file.blb_path).name}
                        </button>
                      </td>
                      <td className="px-3 py-4 text-center">
                        {formatDate(new Date(file.blb_date_time))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[70vw] mx-auto my-6 ">
          <div className="relative flex flex-col w-full px-3 py-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="font-semibold text-center">
              Dokumen Kerangka Acuan Kerja (KAK) / Spesifikasi Teknis dan Gambar
            </div>
            <RenderTable />
            <button
              onClick={close}
              className="p-3 font-bold text-red-500 border-b border-solid rounded-md rounded-t hover:text-red-600 border-slate-200"
              type="button"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </>
  );
};

export const Kualifikasi = ({
  close,
  llsId,
  dllIdDok,
  selectedKualifikasi,
  onUpdate,
}) => {
  const { getKualifikasi, updateKualifikasi } = paketService();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataPaket = async () => {
      try {
        const response = await getKualifikasi(llsId);
        const kualifikasi = response.data;
        setData(kualifikasi);
        const selectedDataAdm = response.data.administrasi
          .filter((item) =>
            selectedKualifikasi.some(
              (selectedItem) => selectedItem.ckm_id === item.ckm_id
            )
          )
          .map((item) => ({
            ckm_id: item.ckm_id,
          }));

        const selectedDataKeu = response.data.keuangan
          .filter((item) =>
            selectedKualifikasi.some(
              (selectedItem) => selectedItem.ckm_id === item.ckm_id
            )
          )
          .map((item) => ({
            ckm_id: item.ckm_id,
          }));

        const selectedDataTek = response.data.teknis
          .filter((item) =>
            selectedKualifikasi.some(
              (selectedItem) => selectedItem.ckm_id === item.ckm_id
            )
          )
          .map((item) => ({
            ckm_id: item.ckm_id,
          }));

        const selectedData = [
          ...selectedDataAdm,
          ...selectedDataKeu,
          ...selectedDataTek,
        ];

        formik.setFieldValue('checklist', selectedData);
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataPaket();
  }, [selectedKualifikasi]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await updateKualifikasi(dllIdDok, values);
      const message = 'Berhasil menambah Kualifikasi';
      if (response) {
        toastsuccess(message);
        onUpdate();
        close();
      } else {
        toasterror('Terjadi kesalahan saat menyimpan data.');
      }
    } catch (error) {
      toasterror(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      checklist: [],
    },
    onSubmit: handleSubmit,
  });

  const handleDataSelect = (item) => {
    const isDataSelected = formik.values.checklist.some(
      (selectedItem) => selectedItem.ckm_id === item.ckm_id
    );

    if (isDataSelected) {
      formik.setFieldValue(
        'checklist',
        formik.values.checklist.filter(
          (selectedItem) => selectedItem.ckm_id !== item.ckm_id
        )
      );
    } else {
      formik.setFieldValue('checklist', [
        ...formik.values.checklist,
        {
          ckm_id: item.ckm_id,
        },
      ]);
    }
  };

  const RenderAdministrasi = () => {
    return (
      <>
        {data.administrasi?.map((item) => (
          <div className="flex items-center gap-4 p-1" key={item.ckm_id}>
            <input
              type="checkbox"
              checked={formik.values.checklist.some(
                (selectedItem) => selectedItem.ckm_id === item.ckm_id
              )}
              onChange={() => handleDataSelect(item)}
            />
            <p className="text-xs text-justify">{item.ckm_nama}</p>
          </div>
        ))}
      </>
    );
  };

  const RenderKeuangan = () => {
    return (
      <>
        {data.keuangan?.map((item) => (
          <div className="flex items-center gap-4 p-1" key={item.ckm_id}>
            <input
              type="checkbox"
              checked={formik.values.checklist.some(
                (selectedItem) => selectedItem.ckm_id === item.ckm_id
              )}
              onChange={() => handleDataSelect(item)}
            />
            <p className="text-xs text-justify">{item.ckm_nama}</p>
          </div>
        ))}
      </>
    );
  };

  const RenderTeknis = () => {
    return (
      <>
        {data.teknis?.map((item) => (
          <div className="flex items-center gap-4 p-1" key={item.ckm_id}>
            <input
              type="checkbox"
              checked={formik.values.checklist.some(
                (selectedItem) => selectedItem.ckm_id === item.ckm_id
              )}
              onChange={() => handleDataSelect(item)}
            />
            <p className="text-xs text-justify">{item.ckm_nama}</p>
          </div>
        ))}
      </>
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[80vw] mx-auto my-6 max-h-screen">
          <div className="relative flex flex-col w-full px-4 py-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="px-3 py-2 mb-6 bg-blue-200">
              <p className="text-sm">
                Pilih daftar dokumen yang dipersyaratkan untuk melengkapi
                penawaran peserta pengadaan
              </p>
            </div>
            <div className="pb-4 mb-6 border-b page-padding">
              <p className="mb-1 font-semibold">Administrasi</p>
              {loading ? (
                <SkeletonItem itemCount={4} cN="bg-gray-200 h-5" />
              ) : (
                <RenderAdministrasi />
              )}
            </div>
            <div className="pb-4 mb-6 border-b page-padding">
              <p className="mb-1 font-semibold">Keuangan</p>
              {loading ? (
                <SkeletonItem itemCount={4} cN="bg-gray-200 h-5" />
              ) : (
                <RenderKeuangan />
              )}
            </div>
            <div className="pb-4 mb-6 border-b page-padding">
              <p className="mb-1 font-semibold">Teknis</p>
              {loading ? (
                <SkeletonItem itemCount={4} cN="bg-gray-200 h-5" />
              ) : (
                <RenderTeknis />
              )}
            </div>
            <div className="flex gap-6">
              <Button
                cN={`btn bg-sky-500 text-white  hover:bg-blue-600 ease-in duration-200 ${
                  formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type="submit"
                disabled={formik.isSubmitting}
              >
                Simpan
              </Button>
              <Button
                cN={`btn bg-slate-300 text-black hover:bg-slate-400 ease-in duration-200 ${
                  formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={formik.isSubmitting}
                type="button"
                onClick={close}
              >
                Kembali
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </form>
  );
};

export const Penawaran = ({
  close,
  llsId,
  dllIdDok,
  selectedPenawaran,
  onUpdate,
}) => {
  const { getPenawaran, updatePenawaran } = paketService();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataPaket = async () => {
      try {
        const response = await getPenawaran(llsId);
        const penwaran = response.data;
        setData(penwaran);
        const selectedDataAdm = response.data.administrasi
          .filter((item) =>
            selectedPenawaran.some(
              (selectedItem) => selectedItem.ckm_id === item.ckm_id
            )
          )
          .map((item) => ({
            ckm_id: item.ckm_id,
          }));

        const selectedDataTek = response.data.teknis
          .filter((item) =>
            selectedPenawaran.some(
              (selectedItem) => selectedItem.ckm_id === item.ckm_id
            )
          )
          .map((item) => ({
            ckm_id: item.ckm_id,
          }));

        const selectedDataHarga = response.data.harga
          .filter((item) =>
            selectedPenawaran.some(
              (selectedItem) => selectedItem.ckm_id === item.ckm_id
            )
          )
          .map((item) => ({
            ckm_id: item.ckm_id,
          }));

        const selectedData = [
          ...selectedDataAdm,
          ...selectedDataTek,
          ...selectedDataHarga,
        ];

        formik.setFieldValue('checklist', selectedData);
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataPaket();
  }, [selectedPenawaran]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await updatePenawaran(dllIdDok, values);
      const message = 'Berhasil menambah Penawaran';
      if (response) {
        toastsuccess(message);
        onUpdate();
        close();
      } else {
        toasterror('Terjadi kesalahan saat menyimpan data.');
      }
    } catch (error) {
      toasterror(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      checklist: [],
    },
    onSubmit: handleSubmit,
  });

  const handleDataSelect = (item) => {
    const isDataSelected = formik.values.checklist.some(
      (selectedItem) => selectedItem.ckm_id === item.ckm_id
    );

    if (isDataSelected) {
      formik.setFieldValue(
        'checklist',
        formik.values.checklist.filter(
          (selectedItem) => selectedItem.ckm_id !== item.ckm_id
        )
      );
    } else {
      formik.setFieldValue('checklist', [
        ...formik.values.checklist,
        {
          ckm_id: item.ckm_id,
        },
      ]);
    }
  };

  const RenderAdministrasi = () => {
    return (
      <>
        {data.administrasi?.map((item) => (
          <div className="flex items-center gap-4 p-1" key={item.ckm_id}>
            <input
              type="checkbox"
              checked={formik.values.checklist.some(
                (selectedItem) => selectedItem.ckm_id === item.ckm_id
              )}
              onChange={() => handleDataSelect(item)}
            />
            <p className="text-xs text-justify">{item.ckm_nama}</p>
          </div>
        ))}
      </>
    );
  };

  const RenderTeknis = () => {
    return (
      <>
        {data.teknis?.map((item) => (
          <div className="flex items-center gap-4 p-1" key={item.ckm_id}>
            <input
              type="checkbox"
              checked={formik.values.checklist.some(
                (selectedItem) => selectedItem.ckm_id === item.ckm_id
              )}
              onChange={() => handleDataSelect(item)}
            />
            <p className="text-xs text-justify">{item.ckm_nama}</p>
          </div>
        ))}
      </>
    );
  };

  const RenderHarga = () => {
    return (
      <>
        {data.harga?.map((item) => (
          <div className="flex items-center gap-4 p-1" key={item.ckm_id}>
            <input
              type="checkbox"
              checked={formik.values.checklist.some(
                (selectedItem) => selectedItem.ckm_id === item.ckm_id
              )}
              onChange={() => handleDataSelect(item)}
            />
            <p className="text-xs text-justify">{item.ckm_nama}</p>
          </div>
        ))}
      </>
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[80vw] mx-auto my-6 max-h-screen">
          <div className="relative flex flex-col w-full px-4 py-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="px-3 py-2 mb-6 bg-blue-200">
              <p className="text-sm">
                Pilih daftar dokumen yang dipersyaratkan untuk melengkapi
                penawaran peserta pengadaan
              </p>
            </div>
            <div className="pb-4 mb-6 border-b page-padding">
              <p className="mb-1 font-semibold">Administrasi</p>
              {loading ? (
                <SkeletonItem itemCount={4} cN="bg-gray-200 h-5" />
              ) : (
                <RenderAdministrasi />
              )}
            </div>
            <div className="pb-4 mb-6 border-b page-padding">
              <p className="mb-1 font-semibold">Teknis</p>
              {loading ? (
                <SkeletonItem itemCount={4} cN="bg-gray-200 h-5" />
              ) : (
                <RenderTeknis />
              )}
            </div>
            <div className="pb-4 mb-6 border-b page-padding">
              <p className="mb-1 font-semibold">Harga</p>
              {loading ? (
                <SkeletonItem itemCount={4} cN="bg-gray-200 h-5" />
              ) : (
                <RenderHarga />
              )}
            </div>

            <div className="flex gap-6">
              <Button
                cN={`btn bg-sky-500 text-white  hover:bg-blue-600 ease-in duration-200 ${
                  formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type="submit"
                disabled={formik.isSubmitting}
              >
                Simpan
              </Button>
              <Button
                cN={`btn bg-slate-300 text-black hover:bg-slate-400 ease-in duration-200 ${
                  formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={formik.isSubmitting}
                type="button"
                onClick={close}
              >
                Kembali
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </form>
  );
};

export const LelangPenyedia = ({ close, llsId, onUpdate }) => {
  const { getPenyediaLelang, getPilihPenyediaLelang } = paketService();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataPaket = async () => {
      try {
        const response = await getPenyediaLelang(llsId);
        const penyedia = response.data.data;
        setData(penyedia);
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataPaket();
  }, []);

  const renderButtonPilih = async (rknId) => {
    try {
      const response = await getPilihPenyediaLelang(llsId, rknId);
      if (response) {
        toastsuccess('Berhasil Memilih Penyedia');
        onUpdate();
        close();
      } else {
        toasterror('Terjadi Kesalahan');
      }
    } catch (error) {
      toasterror(error.message);
    } finally {
      setLoading(false);
    }
  };

  const RenderTabel = () => {
    return loading ? (
      <div className="h-[60vh] flex justify-center items-center">
        <Spinner />
      </div>
    ) : (
      <>
        <div className="relative flex flex-col overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-xl text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-2 py-2 border border-gray-200">No</th>
                  <th className="px-2 py-2 border border-gray-200">
                    Nama Penyedia
                  </th>
                  <th className="px-2 py-2 border border-gray-200">NPWP</th>
                  <th className="px-2 py-2 border border-gray-200">
                    No. Telepon
                  </th>
                  <th className="px-2 py-2 border border-gray-200">aksi</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto text-xs">
                {data.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="5"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      belum penyedia yang terdaftar
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr
                      key={item.ckm_id}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-2 text-center text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-3 py-2 capitalize">{item.rkn_nama}</td>
                      <td className="px-3 py-2 capitalize">{item.rkn_npwp}</td>
                      <td className="px-3 py-2 capitalize">
                        {item.rkn_telepon}
                      </td>
                      <td className="flex justify-center px-3 py-2 capitalize">
                        <button
                          type="button"
                          onClick={() => renderButtonPilih(item.rkn_id)}
                          className="px-3 py-2 text-white bg-blue-400 rounded-md hover:bg-blue-600"
                        >
                          Pilih Penydia
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[80vw] mx-auto my-6 max-h-screen">
          <div className="relative flex flex-col w-full px-4 py-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <RenderTabel />
            <button
              onClick={close}
              className="p-3 font-bold text-red-500 border-b border-solid rounded-md rounded-t hover:text-red-600 border-slate-200"
              type="button"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </>
  );
};
