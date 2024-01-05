import React from 'react';

const FormPersyaratanLelang = ({
  data,
  handleModalKualifikasi,
  handleModalPenawaran,
}) => {
  const TablePersyaratanKualifikasi = () => {
    return (
      <>
        <div className="flex justify-between pb-2">
          <p className="font-bold">Pesyaratan Kualifikasi</p>
          <button
            type="button"
            onClick={handleModalKualifikasi}
            className="px-4 py-1 capitalize transition duration-200 ease-in-out bg-blue-400 rounded-lg cursor-pointer text-gray-50 hover:bg-slate-800 hover:text-white"
          >
            Tambah Kualifikasi
          </button>
        </div>
        <div className="relative flex flex-col overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-xl text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-2 py-2 border border-gray-200">No</th>
                  <th className="px-2 py-2 border border-gray-200">
                    Persyaratan Kualifikasi
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto text-xs">
                {data.checklist?.kualifikasi.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="2"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      belum ada Persyaratan Kualifikasi
                    </td>
                  </tr>
                ) : (
                  data.checklist?.kualifikasi.map((item, index) => (
                    <tr
                      key={item.ckm_id}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-2 text-center text-gray-900 align-top whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-3 py-2 capitalize">{item.ckm_nama}</td>
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

  const TablePersyaratanPenawaran = () => {
    return (
      <>
        <div className="flex justify-between pb-2">
          <p className="font-bold">Pesyaratan Penawaran</p>
          <button
            type="button"
            onClick={handleModalPenawaran}
            className="px-4 py-1 capitalize transition duration-200 ease-in-out bg-blue-400 rounded-lg cursor-pointer text-gray-50 hover:bg-slate-800 hover:text-white"
          >
            Tambah Penawaran
          </button>
        </div>
        <div className="relative flex flex-col overflow-x-auto rounded-lg">
          <div className="flex-grow">
            <table className="w-full text-xl text-left text-gray-600 md:text-base">
              <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                <tr role="row" className="text-center border border-gray-200">
                  <th className="px-2 py-2 border border-gray-200">No</th>
                  <th className="px-2 py-2 border border-gray-200">
                    Persyaratan penawaran
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto text-xs">
                {data.checklist?.penawaran.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="2"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      belum ada Persyaratan penawaran
                    </td>
                  </tr>
                ) : (
                  data.checklist?.penawaran.map((item, index) => (
                    <tr
                      key={item.ckm_id}
                      className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-3 py-2 text-center text-gray-900 align-top whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-3 py-2 capitalize">{item.ckm_nama}</td>
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
      <div className="my-6">
        <TablePersyaratanKualifikasi />
      </div>
      <TablePersyaratanPenawaran />
    </>
  );
};

export default FormPersyaratanLelang;
