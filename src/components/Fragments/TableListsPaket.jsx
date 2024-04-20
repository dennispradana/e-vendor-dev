import React, { useEffect, useState } from 'react';
import { paketService } from '../../services/paket.service';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SkeletonItem } from '../Elements/Skelekton';
import Pagination from '../Elements/Pagination';
import { useDebounce } from 'use-debounce';
import { toasterror } from '../../utils/ToastMessage';
import DataEmpty from '../Elements/DataEmpty';
import { FaRegFolderOpen } from 'react-icons/fa6';
import { formatDate } from '../../utils/formatDate';
import Button from '../Elements/Button';
import PaketInisiasi from './PaketInisiasi';
import Spinner from '../Elements/Spinner';
import { IoIosClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

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

const TableListsPaket = () => {
  const { user } = useAuthContext();
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
  const { getListPaket, paketInisiasi } = paketService();
  const [debaouceSearch] = useDebounce(search, 2000);
  const [showModalRup, setShowModalRup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [datailPaket, setDetailPaket] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListPaket(
          user.user_id,
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

  const handleModalRup = () => {
    setShowModalRup(!showModalRup);
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const initialValues = {
    rup: '',
  };

  const validation = Yup.object({
    rup: Yup.string().required('Kode RUP Harus diisi'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await paketInisiasi(values);
      if (result.success) {
        setDetailPaket(result.data);
      }
    } catch (error) {
      setDetailPaket(error.message);
    } finally {
      formik.resetForm();
      setSubmitting(false);
      setShowModal(!showModal);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: handleSubmit,
  });

  const renderStatus = (item) => {
    const statusConfig = {
      draft: {
        condition: item.pkt_status === '0',
        render: (
          <div className="w-1/2 p-1 bg-yellow-400 rounded-md">
            <p className="text-center ">Draft</p>
          </div>
        ),
      },
      process: {
        condition: item.pkt_status === '1',
        render: (
          <div className="w-1/2 p-1 bg-green-400 rounded-md">
            <p className="text-center ">Proses</p>
          </div>
        ),
      },
      batal: {
        condition: item.pkt_status === '2',
        render: (
          <div className="w-1/2 p-1 bg-red-400 rounded-md">
            <p className="text-center ">non-aktif</p>
          </div>
        ),
      },
    };

    const status = Object.keys(statusConfig).find(
      (key) => statusConfig[key].condition
    );

    return status ? statusConfig[status].render : null;
  };

  const renderDirectName = (item) => {
    const statusConfig = {
      edit: {
        condition: item.pkt_status !== '1',
        render: (
          <Link to={`/daftar-paket/${item.pkt_id}`}>{item.pkt_nama}</Link>
        ),
      },
      readOnly: {
        condition: item.pkt_status === '1',
        render: (
          <Link to={`/daftar-paket/detail/${item.pkt_id}`}>
            {item.pkt_nama}
          </Link>
        ),
      },
    };

    const status = Object.keys(statusConfig).find(
      (key) => statusConfig[key].condition
    );

    return status ? statusConfig[status].render : null;
  };

  const renderDirectButton = (item) => {
    const statusConfig = {
      edit: {
        condition: item.pkt_status !== '1',
        render: (
          <div className="flex items-center justify-center gap-4">
            <Link to={`/daftar-paket/${item.pkt_id}`}>
              <button className="px-4 w-[7rem] py-1 text-blue-500 border border-blue-400 rounded-md hover:text-white hover:bg-blue-400">
                Edit
              </button>
            </Link>
            <button className="px-4 py-1 text-red-500 border border-red-400 rounded-md hover:text-white hover:bg-red-400">
              Hapus
            </button>
          </div>
        ),
      },
      readOnly: {
        condition: item.pkt_status === '1',
        render: (
          <div className="flex items-center justify-center gap-4">
            <button className="px-4 py-1 text-blue-500 border border-blue-400 rounded-md hover:text-white hover:bg-blue-400">
              Addendum
            </button>
          </div>
        ),
      },
    };

    const status = Object.keys(statusConfig).find(
      (key) => statusConfig[key].condition
    );

    return status ? statusConfig[status].render : null;
  };

  const TablePaket = () => {
    return (
      <>
        <div className="relative flex flex-col h-[70vh] overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-sm text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-4 py-3 border border-gray-200">No</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Nama Paket
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Status Tahapan
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Tanggal Buat
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
                      Data Pegawai tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  datas.map((item, index) => (
                    <tr
                      key={item.pkt_id}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {entryNumber + index}
                      </th>
                      <td className="px-3 py-4 capitalize hover:text-blue-500">
                        {renderDirectName(item)}
                      </td>
                      <td className="flex items-center justify-center px-3 py-4 capitalize">
                        {renderStatus(item)}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {formatDate(new Date(item.pkt_tgl_buat))}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderDirectButton(item)}
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
          title="Paket"
          icon={<FaRegFolderOpen size="12rem" className="mb-4 text-gray-400" />}
        />
        <div>
          <button
            onClick={handleModalRup}
            className="px-4 py-2 font-semibold transition duration-200 ease-in-out rounded-lg cursor-pointer text-gray-50 bg-violet-400 hover:bg-slate-800 hover:text-white"
          >
            Tarik RUP
          </button>
        </div>
      </div>
    ) : (
      <>
        <TablePaket />
      </>
    );
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="py-4 page-padding">
          <h1 className="mb-4 text-2xl font-bold">Daftar Paket</h1>
          {dataLength > 0 && (
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
                    placeholder="Cari Paket"
                    value={search}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={handleModalRup}
                  className="px-4 py-2 font-semibold transition duration-200 ease-in-out rounded-lg cursor-pointer text-gray-50 bg-violet-400 hover:bg-slate-800 hover:text-white"
                >
                  Tarik RUP
                </button>
              </div>
            </div>
          )}
          <RenderContent />
        </div>
      </div>
      {showModalRup && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-[40vw] mx-auto my-6">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="p-5 border-b border-solid rounded-t border-blueGray-200">
                  <div className="flex justify-end">
                    <button
                      className="p-1 bg-gray-200 rounded-full hover:bg-red-500 hover:text-white"
                      onClick={handleModalRup}
                    >
                      <IoIosClose />
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold uppercase">
                      Masukkan Kode RUP
                    </p>
                  </div>
                </div>
                <div className="px-6 my-6">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="flex items-center w-full gap-4">
                      <input
                        type="text"
                        className="w-3/4 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-violet-300"
                        placeholder="Tarik RUP"
                        {...formik.getFieldProps('rup')}
                      />
                      <div>
                        <Button
                          cN={`btn text-sm bg-sky-500 text-white hover:bg-blue-600 ease-in duration-200 ${
                            formik.isSubmitting
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          }`}
                          type="submit"
                          disabled={formik.isSubmitting}
                        >
                          {formik.isSubmitting ? <Spinner /> : 'submit'}
                        </Button>
                      </div>
                    </div>
                    {formik.errors && (
                      <p className="mt-2 text-sm italic text-red-500">
                        {formik.errors.rup}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
        </>
      )}
      {showModal && <PaketInisiasi close={handleModal} detail={datailPaket} />}
    </>
  );
};

export default TableListsPaket;
