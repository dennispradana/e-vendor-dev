import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataEmpty from '../Elements/DataEmpty';
import { SkeletonItem } from '../Elements/Skelekton';
import { FaRegPaperPlane } from 'react-icons/fa';
import { useAuthContext } from '../../contexts/AuthContext';
import { pengalamanService } from '../../services/pengalaman.service';
import { useDebounce } from 'use-debounce';
import { toasterror } from '../../utils/ToastMessage';
import { Tooltip } from '../Elements/Tooltip';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { formatDate } from '../../utils/formatDate';
import Pagination from '../Elements/Pagination';
import { formatRp } from '../../utils/formatRupiah';

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

const TabPengalaman = () => {
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
  const { user } = useAuthContext();
  const { getPengalaman } = pengalamanService();
  const [loading, setLoading] = useState(true);
  const [debaouceSearch] = useDebounce(search, 2000);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPengalaman(
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
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [showItem, currentPage, debaouceSearch]);

  const handleEdit = (penyediaPenId) => {
    navigate(`/edit-pengalaman/${penyediaPenId}`);
  };

  const handleShowData = (e) => {
    const showData = e.target.value;
    setState((prev) => ({
      ...prev,
      showItem: showData,
      currentPage: 1,
    }));
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setState((prev) => ({
      ...prev,
      search: searchTerm,
      currentPage: 1,
    }));
  };

  const handlePageChange = (page) => {
    setState((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const TablePengalaman = () => {
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
                placeholder="Cari Data Pengalaman"
                value={search}
                onChange={handleSearch}
                autoFocus
              />
            </div>
          </div>
          <div>
            <Link
              to="/tambah-pengalaman"
              className="px-4 py-3 font-semibold capitalize transition duration-200 ease-in-out rounded-lg cursor-pointer text-gray-50 bg-violet-400 hover:bg-slate-800 hover:text-white"
            >
              tambah data
            </Link>
          </div>
        </div>
        <div className="relative flex flex-col h-[50vh] overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-sm text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-4 py-3 border border-gray-200">No</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Pekerjaan
                  </th>
                  <th className="px-4 py-3 border border-gray-200">Lokasi</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Instansi Pemberi Pekerjaan
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Tanggal Kontrak
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Tanggal Selesai Kontrak
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Nilai Kontrak
                  </th>
                  <th className="px-4 py-3 border border-gray-200">Aksi</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto ">
                {dataLength === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="8"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      Data Izin tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  datas.map((item, index) => (
                    <tr
                      key={item.pen_id}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {entryNumber + index}
                      </th>
                      <td className="px-3 py-4 capitalize">
                        {item.pgl_kegiatan}
                      </td>
                      <td className="px-3 py-4">{item.pgl_lokasi}</td>
                      <td className="px-3 py-4 text-center">
                        {item.pgl_pembtgs}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {formatDate(new Date(item.pgl_tglkontrak))}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {formatDate(new Date(item.pgl_slskontrak))}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {formatRp(item.pgl_nilai)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Tooltip text="Edit">
                            <button
                              className="mr-2 text-blue-500 hover:text-blue-700"
                              onClick={() => handleEdit(item.pen_id)}
                            >
                              <FiEdit size="1.2rem" />
                            </button>
                          </Tooltip>
                          <Tooltip text="delete">
                            <button className="mr-2 text-red-500 hover:text-red-700">
                              <MdDeleteOutline size="1.4rem" />
                            </button>
                          </Tooltip>
                        </div>
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
          title="Pengalaman"
          icon={<FaRegPaperPlane size="12rem" className="mb-4 text-gray-400" />}
        />
        <Link
          to="/tambah-pengalaman"
          className="px-4 py-3 font-semibold capitalize transition duration-200 ease-in-out rounded-lg cursor-pointer text-gray-50 bg-violet-400 hover:bg-slate-800 hover:text-white"
        >
          tambah data
        </Link>
      </div>
    ) : (
      <TablePengalaman />
    );
  };

  return <RenderContent />;
};

export default TabPengalaman;
