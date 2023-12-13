import React, { useEffect, useState } from 'react';
import { fileService } from '../../../services/file.service';
import { toasterror, toastsuccess } from '../../../utils/ToastMessage';
import Spinner from '../Spinner';
import { formatDate } from '../../../utils/formatDate';
import { panitiaService } from '../../../services/panitia.service';
import { useDebounce } from 'use-debounce';
import Pagination from '../Pagination';
import DataEmpty from '../DataEmpty';
import { FaRegFolderOpen } from 'react-icons/fa6';
import { SkeletonItem } from '../Skelekton';
import { paketService } from '../../../services/paket.service';

export const ModalKAK = ({ close, data }) => {
  const { getFile, downloadFile } = fileService();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTableFile = async () => {
      try {
        const response = await getFile(data.dok_persiapan.dp_spek);
        setFiles(response);
      } catch (error) {
        setError('Belum ada file yang diunggah');
      } finally {
        setLoading(false);
      }
    };
    getTableFile();
  }, [data.dok_persiapan.dp_spek]);

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
        const response = await getFile(data.dok_persiapan.dp_sskk_attachment);
        setFiles(response);
      } catch (error) {
        setError('Belum ada file yang diunggah');
      } finally {
        setLoading(false);
      }
    };
    getTableFile();
  }, [data.dok_persiapan.dp_sskk_attachment]);

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
        const response = await getFile(data.dok_persiapan.dp_lainnya);
        setFiles(response);
      } catch (error) {
        setError('Belum ada file yang diunggah');
      } finally {
        setLoading(false);
      }
    };
    getTableFile();
  }, [data.dok_persiapan.dp_lainnya]);

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

export const ModalPanita = ({ close, paket, updateData }) => {
  const initialState = {
    datas: [],
    search: '',
    dataTotal: 0,
    dataLength: 0,
    currentPage: 1,
    totalPages: 1,
    entryNumber: 1,
    showItem: 10,
  };

  const [state, setState] = useState(initialState);
  const {
    datas,
    entryNumber,
    search,
    dataTotal,
    dataLength,
    currentPage,
    showItem,
    totalPages,
  } = state;
  const [loading, setLoading] = useState(true);
  const { getPanitia } = panitiaService();
  const { getPilihPanitia } = paketService();
  const [debaouceSearch] = useDebounce(search, 2000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPanitia(
          showItem,
          currentPage,
          debaouceSearch
        );
        setState((prev) => ({
          ...prev,
          dataTotal: response.total,
          datas: response.data.data,
          dataLength: response.data.total,
          totalPages: Math.ceil(response.data.total / state.showItem),
          entryNumber: (state.currentPage - 1) * state.showItem + 1,
        }));
        setLoading(false);
      } catch (error) {
        toasterror(error.message);
      }
    };
    fetchData();
  }, [showItem, currentPage, debaouceSearch]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setState((prev) => ({
      ...prev,
      search: searchTerm,
      currentPage: 1,
    }));
  };

  const handleShowData = (e) => {
    const showData = e.target.value;
    setState((prev) => ({
      ...prev,
      showItem: showData,
      currentPage: 1,
    }));
  };

  const handlePageChange = (page) => {
    setState((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleSelectPnt = async (pntId) => {
    try {
      const response = await getPilihPanitia(paket, pntId);
      if (response) {
        toastsuccess('Panitia Berhasil Dipilih');
        close;
      } else {
        toasterror('Terjadi Kesalahan');
      }
    } catch (error) {
      toasterror(error.message);
    }
  };

  const TableDataPanitia = () => {
    return (
      <>
        <div className="flex items-center justify-between pb-4 ">
          <div className="relative">
            <label htmlFor="table-search" className="sr-only">
              Cari
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 md:w-80 bg-gray-50 focus:outline-violet-300"
                placeholder="Cari Data Panitia"
                value={search}
                onChange={handleSearch}
                autoFocus
              />
            </div>
          </div>
        </div>
        <div className="relative flex flex-col overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-sm text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-4 py-3 border border-gray-200">No</th>
                  <th className="px-4 py-3 border border-gray-200">Nama</th>
                  <th className="px-4 py-3 border border-gray-200">
                    SK Panitia
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Jumlah Anggota
                  </th>
                  <th className="px-4 py-3 border border-gray-200">Aksi</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto ">
                {dataLength === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="6"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      Data Panitia tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  datas.map((item, index) => (
                    <tr
                      key={item.pnt_id}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {entryNumber + index}
                      </th>
                      <td className="px-3 py-4 capitalize">{item.pnt_nama}</td>
                      <td className="px-3 py-4">{item.pnt_no_sk}</td>
                      <td className="px-3 py-4 text-center">
                        {item.anggota_count}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          className="px-2 py-2 font-bold text-white duration-200 ease-in bg-blue-500 rounded-lg hover:bg-blue-600"
                          onClick={async () => {
                            handleSelectPnt(item.pnt_id);
                            await updateData();
                            close();
                          }}
                        >
                          Pilih Panitia
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between my-2 max-md:flex-col">
          <div className="flex items-center ">
            <label className="mr-2 text-sm italic font-semibold capitalize">
              data ditampilkan
            </label>
            <select
              className="px-3 py-1 cursor-pointer"
              value={showItem}
              onChange={handleShowData}
            >
              {dataLength <= 10 ? (
                <option value={dataLength}>{dataLength}</option>
              ) : (
                <>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                </>
              )}
            </select>
            <p className="ml-2 text-sm italic font-semibold capitalize">
              dari {dataLength} data
            </p>
          </div>
          {dataLength > 10 && (
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          )}
        </div>
      </>
    );
  };

  const RenderContent = () => {
    return loading ? (
      <>
        <SkeletonItem itemCount={1} cN="bg-gray-200 h-6 w-1/4" />
        <div className="py-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
          <SkeletonItem itemCount={10} cN="bg-gray-200 h-8" />
        </div>
      </>
    ) : dataTotal === 0 ? (
      <div className="flex items-center flex-col justify-center h-[50vh]">
        <DataEmpty
          title="panitia"
          icon={<FaRegFolderOpen size="12rem" className="mb-4 text-gray-400" />}
        />
      </div>
    ) : (
      <TableDataPanitia />
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[70vw] mx-auto my-6 max-h-screen">
          <div className="relative py-6">
            <div className="relative flex flex-col w-full px-3 py-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="font-semibold text-center">Daftar Panitia</div>
              <RenderContent />
              <button
                onClick={() => {
                  updateData();
                  close();
                }}
                className="p-3 font-bold text-red-500 border-b border-solid rounded-md rounded-t hover:text-red-600 border-slate-200"
                type="button"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </>
  );
};

export const ModalPegawai = ({ close, paket, updateData }) => {
  const initialState = {
    datas: [],
    search: '',
    dataTotal: 0,
    dataLength: 0,
    currentPage: 1,
    totalPages: 1,
    entryNumber: 1,
    showItem: 10,
  };

  const [state, setState] = useState(initialState);
  const {
    datas,
    entryNumber,
    search,
    dataTotal,
    dataLength,
    currentPage,
    showItem,
    totalPages,
  } = state;
  const [loading, setLoading] = useState(true);
  const { getAnggotaPanitia } = panitiaService();
  const { getPilihPegawai } = paketService();
  const [debaouceSearch] = useDebounce(search, 2000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnggotaPanitia(
          showItem,
          currentPage,
          debaouceSearch
        );
        setState((prev) => ({
          ...prev,
          dataTotal: response.total,
          datas: response.data.data,
          dataLength: response.data.total,
          totalPages: Math.ceil(response.data.total / state.showItem),
          entryNumber: (state.currentPage - 1) * state.showItem + 1,
        }));
        setLoading(false);
      } catch (error) {
        toasterror(error.message);
      }
    };
    fetchData();
  }, [showItem, currentPage, debaouceSearch]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setState((prev) => ({
      ...prev,
      search: searchTerm,
      currentPage: 1,
    }));
  };

  const handleShowData = (e) => {
    const showData = e.target.value;
    setState((prev) => ({
      ...prev,
      showItem: showData,
      currentPage: 1,
    }));
  };

  const handlePageChange = (page) => {
    setState((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleSelectPeg = async (pegId) => {
    try {
      const response = await getPilihPegawai(paket, pegId);
      if (response) {
        toastsuccess('Panitia Berhasil Dipilih');
        close;
      } else {
        toasterror('Terjadi Kesalahan');
      }
    } catch (error) {
      toasterror(error.message);
    }
  };

  const TableDataPanitia = () => {
    return (
      <>
        <div className="flex items-center justify-between pb-4 ">
          <div className="relative">
            <label htmlFor="table-search" className="sr-only">
              Cari
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 md:w-80 bg-gray-50 focus:outline-violet-300"
                placeholder="Cari Data Panitia"
                value={search}
                onChange={handleSearch}
                autoFocus
              />
            </div>
          </div>
        </div>
        <div className="relative flex flex-col overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-sm text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-4 py-3 border border-gray-200">No</th>
                  <th className="px-4 py-3 border border-gray-200">Nama</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Nama User
                  </th>
                  <th className="px-4 py-3 border border-gray-200">NIP</th>
                  <th className="px-4 py-3 border border-gray-200">Aksi</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto ">
                {dataLength === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="6"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      Data Panitia tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  datas.map((item, index) => (
                    <tr
                      key={item.peg_id}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {entryNumber + index}
                      </th>
                      <td className="px-3 py-4 capitalize">{item.peg_nama}</td>
                      <td className="px-3 py-4">{item.peg_namauser}</td>
                      <td className="px-3 py-4 text-center">{item.peg_nip}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          className="px-2 py-2 font-bold text-white duration-200 ease-in bg-blue-500 rounded-lg hover:bg-blue-600"
                          onClick={async () => {
                            handleSelectPeg(item.peg_id);
                            await updateData();
                            close();
                          }}
                        >
                          Pilih Pegawai
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between my-2 max-md:flex-col">
          <div className="flex items-center ">
            <label className="mr-2 text-sm italic font-semibold capitalize">
              data ditampilkan
            </label>
            <select
              className="px-3 py-1 cursor-pointer"
              value={showItem}
              onChange={handleShowData}
            >
              {dataLength <= 10 ? (
                <option value={dataLength}>{dataLength}</option>
              ) : (
                <>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                </>
              )}
            </select>
            <p className="ml-2 text-sm italic font-semibold capitalize">
              dari {dataLength} data
            </p>
          </div>
          {dataLength > 10 && (
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          )}
        </div>
      </>
    );
  };

  const RenderContent = () => {
    return loading ? (
      <>
        <SkeletonItem itemCount={1} cN="bg-gray-200 h-6 w-1/4" />
        <div className="py-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
          <SkeletonItem itemCount={10} cN="bg-gray-200 h-8" />
        </div>
      </>
    ) : dataTotal === 0 ? (
      <div className="flex items-center flex-col justify-center h-[50vh]">
        <DataEmpty
          title="panitia"
          icon={<FaRegFolderOpen size="12rem" className="mb-4 text-gray-400" />}
        />
      </div>
    ) : (
      <TableDataPanitia />
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[70vw] mx-auto my-6 max-h-screen">
          <div className="relative py-6">
            <div className="relative flex flex-col w-full px-3 py-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="font-semibold text-center">Daftar Pegawai</div>
              <RenderContent />
              <button
                onClick={() => {
                  updateData();
                  close();
                }}
                className="p-3 font-bold text-red-500 border-b border-solid rounded-md rounded-t hover:text-red-600 border-slate-200"
                type="button"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </>
  );
};
