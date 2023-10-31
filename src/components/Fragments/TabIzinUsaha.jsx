import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { iusService } from '../../services/ius.service';
import { SkeletonItem } from '../Elements/Skelekton';
import { formatDate, getColorClass } from '../../utils/formatDate';
import { useDebounce } from 'use-debounce';
import Pagination from '../Elements/Pagination';

const TabIzinUsaha = () => {
  const { user } = useAuthContext();
  const { getIzinUsaha } = iusService();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataLenght, SetDataLenght] = useState(5);
  const [dataTotal, SetDataTotal] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entryNumber, setEntryNumber] = useState(1);
  const [debaouceSearch] = useDebounce(searchTerm, 2000);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getIzinUsaha(
          user.user_id,
          dataLenght,
          currentPage,
          debaouceSearch
        );
        const dataIzin = response.data;
        setDatas(dataIzin);
        const number = (currentPage - 1) * dataLenght + 1;
        setEntryNumber(number);
        SetDataTotal(response.total);
        setTotalPages(Math.ceil(response.total / dataLenght));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dataLenght, currentPage, debaouceSearch]);

  console.log(datas);

  const handleEdit = (penyediaIusId) => {
    navigate(`edit-izin-usaha/${penyediaIusId}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleShowData = (e) => {
    SetDataLenght(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const TableIzinUsaha = () => {
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
                placeholder="Cari Data Pegawai"
                value={searchTerm}
                onChange={handleSearch}
                autoFocus
              />
            </div>
          </div>
          <div>
            <Link
              to="tambah-izin-usaha"
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
                    Izin Usaha
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Nomor Surat
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Berlaku Sampai
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Instansi Pemberi
                  </th>
                  <th className="px-4 py-3 border border-gray-200">
                    Kualfikasi
                  </th>
                  <th className="px-4 py-3 border border-gray-200">Aksi</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto ">
                {datas.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="7"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      Data Izin tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  datas.map((item, index) => (
                    <tr
                      key={item.ius_id}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                      >
                        {entryNumber + index}
                      </th>
                      <td className="px-3 py-4 capitalize">{item.jni_nama}</td>
                      <td className="px-3 py-4">{item.ius_no}</td>
                      <td
                        className={`px-3 py-4 text-center ${getColorClass(
                          item.ius_berlaku
                        )}`}
                      >
                        {item.ius_berlaku !== null
                          ? formatDate(new Date(item.ius_berlaku))
                          : 'Seumur Hidup'}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {item.ius_instansi}
                      </td>
                      <td className="px-3 py-4 text-center">
                        {item.ius_klasifikasi === null
                          ? '-'
                          : item.ius_klasifikasi}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          className="mr-2 font-semibold text-blue-500 hover:underline"
                          onClick={() => handleEdit(item.ius_id)}
                        >
                          Edit
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
              value={dataLenght}
              onChange={handleShowData}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
            <p className="ml-2 text-sm italic font-semibold capitalize">
              dari {dataTotal} data
            </p>
          </div>
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
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
    ) : (
      <TableIzinUsaha />
    );
  };

  return <RenderContent />;
};

export default TabIzinUsaha;
