import React from 'react';
import Spinner from '../Elements/Spinner';
import moment from 'moment';
import 'moment/locale/id';

const FormJadwaalLelang = ({ datas, loading, formik, error }) => {
  return loading ? (
    <div className="h-[60vh] flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <>
      <div className="mb-6">
        <table className="w-full text-xs text-left text-gray-500 border border-collapse">
          <thead>
            <tr>
              <th className="px-2 py-2 bg-gray-100 border">Kode Pengadaan</th>
              <th className="px-2 py-2 bg-gray-100 border">Nama Paket</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-2 border-r">{datas.nonLel?.lls_id}</td>
              <td className="px-2 py-2 border-r">{datas.nonLel?.pkt_nama}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <table className="w-full text-xs text-left text-gray-500 border border-collapse">
        <thead>
          <tr>
            <th className="px-2 py-2 text-center bg-gray-100 border">No</th>
            <th className="px-6 py-2 bg-gray-100 border">Tahap</th>
            <th className="px-6 py-2 bg-gray-100 border">Tanggal Mulai</th>
            <th className="px-6 py-2 bg-gray-100 border">Tanggal Selesai</th>
          </tr>
        </thead>
        <tbody>
          {formik.values.jadwal?.map((item, index) => (
            <tr key={item.dtj_id} className="border-b">
              <td className="px-6 py-2 text-center border-r">{index + 1}</td>
              <td className="px-6 py-2 border-r">{item.nama}</td>
              <td className="px-6 py-2 border-r">
                <input
                  type="datetime-local"
                  className={`w-full p-1 px-3 text-gray-700 bg-white border ${
                    error
                      ? 'border-red-500 focus:ring-red-600'
                      : 'border-gray-300  focus:ring-sky-600'
                  } rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:border-transparent`}
                  {...formik.getFieldProps(`jadwal[${index}].dtj_tglawal`, {
                    value: moment(item.dtj_tglawal).format('YYYY-MM-DDTHH:mm'),
                  })}
                />
                {formik.errors.jadwal?.[index]?.dtj_tglawal && (
                  <p className="mt-2 text-sm italic text-red-500 ">
                    {formik.errors.jadwal?.[index]?.dtj_tglawal}
                  </p>
                )}
              </td>
              <td className="px-6 py-2 border-r">
                <input
                  type="datetime-local"
                  className={`w-full p-1 px-3 text-gray-700 bg-white border ${
                    error
                      ? 'border-red-500 focus:ring-red-600'
                      : 'border-gray-300  focus:ring-sky-600'
                  } rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:border-transparent`}
                  {...formik.getFieldProps(`jadwal[${index}].dtj_tglakhir`, {
                    value: moment(item.dtj_tglakhir).format('YYYY-MM-DDTHH:mm'),
                  })}
                />
                {formik.errors.jadwal?.[index]?.dtj_tglakhir && (
                  <p className="mt-2 text-sm italic text-red-500 ">
                    {formik.errors.jadwal?.[index]?.dtj_tglakhir}
                  </p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FormJadwaalLelang;
