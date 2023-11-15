import React, { useEffect, useState } from 'react';
import { panitiaService } from '../../services/panitia.service';
import { useDebounce } from 'use-debounce';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { useFormik } from 'formik';
import Spinner from '../Elements/Spinner';
import Button from '../Elements/Button';
import { useNavigate } from 'react-router-dom';

const initialState = {
  datas: [],
  search: '',
  dataLength: 0,
  currentPage: 1,
  totalPages: 1,
  showItem: 10,
};

const TabelDaftarAnggota = ({ close, pntId, onUpdate }) => {
  const [state, setState] = useState(initialState);
  const { datas, search, dataLength, currentPage, showItem, totalPages } =
    state;
  const [loading, setLoading] = useState(true);
  const { getAnggotaPanitia, postAnggotaPanitia } = panitiaService();
  const [debaouceSearch] = useDebounce(search, 2000);
  const navigate = useNavigate();

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
          datas: response.data.data,
          dataLength: response.data.total,
          totalPages: Math.ceil(response.data.total / state.showItem),
        }));
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      let message;

      response = await postAnggotaPanitia(pntId, values);
      message = 'Berhasil menambah Anggota';
      if (response) {
        toastsuccess(message);
        navigate(`/daftar-panitia/detail/${pntId}`);
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
      anggota: [],
    },
    onSubmit: handleSubmit,
  });

  const handleAllSelect = (isChecked) => {
    if (isChecked) {
      const selectedData = datas.map((item) => ({
        peg_id: item.peg_id,
      }));
      formik.setFieldValue('anggota', selectedData);
    } else {
      formik.setFieldValue('anggota', []);
    }
  };

  const handleDataSelect = (item) => {
    const isDataSelected = formik.values.anggota.some(
      (selectedItem) => selectedItem.peg_id === item.peg_id
    );

    if (isDataSelected) {
      formik.setFieldValue(
        'anggota',
        formik.values.anggota.filter(
          (selectedItem) => selectedItem.peg_id !== item.peg_id
        )
      );
    } else {
      formik.setFieldValue('anggota', [
        ...formik.values.anggota,
        {
          peg_id: item.peg_id,
        },
      ]);
    }
  };

  const FormTabelDaftarAnggota = () => {
    return (
      <form onSubmit={formik.handleSubmit}>
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
                  <th className="px-4 py-3 border border-gray-200">
                    <input
                      type="checkbox"
                      checked={
                        datas.length > 0 &&
                        datas.every((item) =>
                          formik.values.anggota.some(
                            (selectedItem) =>
                              selectedItem.peg_id === item.peg_id
                          )
                        )
                      }
                      onChange={(e) => handleAllSelect(e.target.checked)}
                    />
                  </th>
                  <th className="px-4 py-3 border border-gray-200">Nama</th>
                  <th className="px-4 py-3 border border-gray-200">
                    Nama User
                  </th>
                  <th className="px-4 py-3 border border-gray-200">NIP</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto ">
                {loading ? (
                  <tr className="h-56 capitalize bg-gray-200 border-b">
                    <td colSpan="4" className="text-center">
                      <Spinner />
                    </td>
                  </tr>
                ) : dataLength === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="4"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      Data Pegawai tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  datas.map((item) => (
                    <tr
                      key={item.peg_id}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <td className="text-center">
                        <input
                          type="checkbox"
                          checked={formik.values.anggota.some(
                            (selectedItem) =>
                              selectedItem.peg_id === item.peg_id
                          )}
                          onChange={() => handleDataSelect(item)}
                        />
                      </td>
                      <td className="px-3 py-4 capitalize">{item.peg_nama}</td>
                      <td className="px-3 py-4">{item.peg_namauser}</td>
                      <td className="px-3 py-4 text-center capitalize">
                        {item.peg_nip}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between my-2 mb-6 max-md:flex-col">
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
      </form>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[70vw] mx-auto my-6 ">
          <div className="relative flex flex-col w-full px-3 py-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <FormTabelDaftarAnggota />
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </>
  );
};

export default TabelDaftarAnggota;
