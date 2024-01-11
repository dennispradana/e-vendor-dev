import React, { useEffect, useState } from 'react';
import { manajerialService } from '../../services/manajerial.service';
import { useAuthContext } from '../../contexts/AuthContext';
import { useDebounce } from 'use-debounce';
import { Link, useNavigate } from 'react-router-dom';
import { SkeletonItem } from '../Elements/Skelekton';
import Pagination from '../Elements/Pagination';
import { FaUserTie } from 'react-icons/fa';
import DataEmpty from '../Elements/DataEmpty';
import { Tooltip } from '../Elements/Tooltip';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';

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

const TabManajerial = ({ type, formik }) => {
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
  const { getManajer } = manajerialService();
  const [loading, setLoading] = useState(true);
  const [debaouceSearch] = useDebounce(search, 2000);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getManajer(
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

  const handleEdit = (penyediaManajerId) => {
    navigate(`/edit-manajerial/${penyediaManajerId}`);
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

  const handleDataSelect = (item) => {
    const isDataSelected = formik.values.manajerial.some(
      (selectedItem) => selectedItem.id_manajerial === item.id_manajerial
    );

    if (isDataSelected) {
      formik.setFieldValue(
        'manajerial',
        formik.values.manajerial.filter(
          (selectedItem) => selectedItem.id_manajerial !== item.id_manajerial
        )
      );
    } else {
      formik.setFieldValue('manajerial', [
        ...formik.values.landasanhukum,
        {
          id_manajerial: item.id_manajerial,
        },
      ]);
    }
  };

  const TableManajerial = () => {
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
                placeholder="Cari Data Izin Usaha"
                value={search}
                onChange={handleSearch}
                autoFocus
              />
            </div>
          </div>
          {type === 'form' ? (
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
          ) : (
            <div>
              <Link
                to="/tambah-manajerial"
                className="px-4 py-3 font-semibold capitalize transition duration-200 ease-in-out rounded-lg cursor-pointer text-gray-50 bg-violet-400 hover:bg-slate-800 hover:text-white"
              >
                tambah data
              </Link>
            </div>
          )}
        </div>
        <div className="relative flex flex-col h-[50vh] overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-sm text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-4 py-3 border border-gray-200">No</th>
                  <th className="px-4 py-3 border border-gray-200">Nama</th>
                  <th className="px-4 py-3 border border-gray-200">NPWP</th>
                  <th className="px-4 py-3 border border-gray-200">Alamat</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Kepemilikan
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
                      Data Izin tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  datas.map((item, index) => (
                    <tr
                      key={item.id_manajerial}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {entryNumber + index}
                      </th>
                      <td className="px-3 py-4 capitalize">{item.mjr_nama}</td>
                      <td className="px-3 py-4">{item.mjr_npwp}</td>
                      <td className="px-3 py-4 text-center">
                        {item.mjr_alamat}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {item.mjr_jenis === '0' ? 'Pengurus' : 'Pemilik'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {type === 'form' ? (
                          <div className="flex items-center justify-center gap-2">
                            <input
                              type="checkbox"
                              checked={formik.values.manajerial.some(
                                (selectedItem) =>
                                  selectedItem.id_manajerial ===
                                  item.id_manajerial
                              )}
                              onChange={() => handleDataSelect(item)}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <Tooltip text="Edit">
                              <button
                                className="mr-2 text-blue-500 hover:text-blue-700"
                                onClick={() => handleEdit(item.id_manajerial)}
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
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {type !== 'form' && (
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
        )}
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
          title="Manajerial"
          icon={<FaUserTie size="12rem" className="mb-4 text-gray-400" />}
        />
        <Link
          to="/tambah-manajerial"
          className="px-4 py-3 font-semibold capitalize transition duration-200 ease-in-out rounded-lg cursor-pointer text-gray-50 bg-violet-400 hover:bg-slate-800 hover:text-white"
        >
          tambah data
        </Link>
      </div>
    ) : (
      <TableManajerial />
    );
  };

  return <RenderContent />;
};

export default TabManajerial;
