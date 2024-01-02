import React from 'react';

const FormPesertaLelang = ({ handleModalPeserta, data, formik }) => {
  const handleCheckboxChange = () => {
    const newStatus = formik.values.persetujuan.pst_status === 1 ? 0 : 1;
    formik.setFieldValue('persetujuan.pst_status', newStatus);

    if (newStatus === 1) {
      formik.setFieldValue('persetujuan.pst_alasan', 'Setuju');
    } else {
      formik.setFieldValue('persetujuan.pst_alasan', '');
    }
  };

  const renderPeserta = () => {
    return data.peserta !== null ? (
      <>
        <div className="flex items-center justify-between">
          <p className="font-bold capitalize">{data.peserta.rkn_nama}</p>
          <button
            type="button"
            onClick={handleModalPeserta}
            className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-800 w-[7rem]"
          >
            Ganti Penyedia
          </button>
        </div>
      </>
    ) : (
      <button
        type="button"
        onClick={handleModalPeserta}
        className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-800 w-[10rem]"
      >
        Pilih Penyedia
      </button>
    );
  };

  return (
    <>
      <div className="mb-6">
        <table className="w-full text-xs text-left text-gray-800 border border-collapse">
          <tbody>
            <tr>
              <th className="px-4 py-2 border-b border-r">Daftar Penyedia</th>
              <td className="px-4 py-2 text-sm border-b">{renderPeserta()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-6 border border-blue-300 rounded-md">
        <div className="p-2 bg-blue-200 border-b border-blue-300 rounded-t-md">
          <p className="text-sm font-bold text-blue-800">
            Status Pesetujuan Pengadaan
          </p>
        </div>
        <div className="p-3">
          <div className="relative overflow-x-auto">
            <table className="w-full text-xs text-left border border-collapse rounded-lg">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-2 capitalize bg-gray-100 border"
                  >
                    Pejabat Pengadaan
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 capitalize bg-gray-100 border"
                  >
                    status
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 capitalize bg-gray-100 border"
                  >
                    tanggal
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 capitalize bg-gray-100 border"
                  >
                    alasan tidak setuju
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.persetujuan?.list.map((item) => (
                  <tr key={item.pst_id}>
                    <td className="px-2 py-2 border">
                      {item.pegawai?.peg_nama}
                    </td>
                    <td className="px-2 py-2 border">{item.pst_status}</td>
                    <td className="px-2 py-2 border">{item.pst_tgl_setuju}</td>
                    <td className="px-2 py-2 border">{item.pst_alasan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mb-4 border border-blue-300 rounded-md">
        <div className="p-2 bg-blue-200 border-b border-blue-300 rounded-t-md">
          <p className="text-sm font-bold text-blue-800">Pesetujuan</p>
        </div>
        <div className="px-4 py-2">
          <p className="mb-3 text-center uppercase text-md">
            Pakta integristas
          </p>
          <p className="mb-2">Saya Menyetujui Bahwa :</p>
          <table className="w-full text-sm text-justify">
            <tbody>
              <tr>
                <th className="px-2 text-sm font-normal align-top">1.</th>
                <td className="pb-1">
                  Tidak akan melakukan praktek Korupsi, Kolusi dan/atau
                  Nepotisme;
                </td>
              </tr>
              <tr>
                <th className="px-2 text-sm font-normal align-top">2.</th>
                <td className="pb-1">
                  Akan melaporkan kepada pihak yang berwajib/berwenang apabila
                  mengetahui ada indikasi Korupsi, Kolusi dan/atau Nepotisme di
                  dalam proses pengadaan ini ;
                </td>
              </tr>
              <tr>
                <th className="px-2 text-sm font-normal align-top">3.</th>
                <td className="pb-1">
                  Dalam proses pengadaan ini, berjanji akan melaksanakan tugas
                  secara bersih, transparan dan professional dalam arti akan
                  mengarahkan segala kemampuan dan sumberdaya secara optimal
                  untuk memberikan hasil kerja yang terbaik mulai dari penyiapan
                  penawaran, pelaksanaan dan penyelesaian pekerjaan/kegiatan
                  ini;
                </td>
              </tr>
              <tr>
                <th className="px-2 text-sm font-normal align-top">4.</th>
                <td className="pb-1">
                  Apabila saya melanggar hal-hal yang telah saya nyatakan dalam
                  PAKTA INTEGRITAS ini saya bersedia dikenakan sanksi moral,
                  sanksi administrasi serta dituntut ganti rugi pidana sesuai
                  dengan ketentuan peraturan perundangundangan yang berlaku.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {data.persetujuan?.pst_status === null && (
        <div>
          <div className="flex items-center px-3">
            <input
              type="checkbox"
              className="mr-2"
              checked={formik.values.persetujuan?.pst_status === 1}
              onChange={handleCheckboxChange}
            />
            {formik.values.persetujuan?.pst_status === null && (
              <label className="italic capitalize">Setuju / Tidak Setuju</label>
            )}
            {formik.values.persetujuan?.pst_status === 0 && (
              <label className="italic capitalize"> Tidak Setuju</label>
            )}
            {formik.values.persetujuan?.pst_status === 1 && (
              <label className="italic capitalize"> setuju</label>
            )}
          </div>
          {formik.touched.persetujuan?.pst_status &&
            formik.errors.persetujuan?.pst_status && (
              <p className="mt-1 text-sm italic text-red-500 ">
                {formik.errors.persetujuan?.pst_status}
              </p>
            )}
          {formik.values.persetujuan?.pst_status === 1 ? (
            <div className="mt-3">
              <textarea
                value={formik.values.persetujuan?.pst_alasan}
                readOnly
                className="w-full p-1 px-3 mt-2 text-gray-700 bg-white border border-gray-300 focus:ring-sky-600'
               rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2  focus:border-transparent"
                rows="4"
              />
            </div>
          ) : (
            <div className="mt-3">
              <label>Alasan</label>
              <textarea
                value={formik.values.persetujuan?.pst_alasan}
                onChange={(e) =>
                  formik.setFieldValue('persetujuan.pst_alasan', e.target.value)
                }
                className={`w-full mt-2 p-1 px-3 text-gray-700 bg-white border ${
                  formik.touched.persetujuan?.pst_alasan &&
                  formik.errors.persetujuan?.pst_alasan
                    ? 'border-red-500 focus:ring-red-600'
                    : 'border-gray-300  focus:ring-sky-600'
                } rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2  focus:border-transparent`}
                rows="4"
              />
            </div>
          )}
          {formik.touched.persetujuan?.pst_alasan &&
            formik.errors.persetujuan?.pst_alasan && (
              <p className="mt-1 text-sm italic text-red-500 ">
                {formik.errors.persetujuan?.pst_alasan}
              </p>
            )}
        </div>
      )}{' '}
      {data.persetujuan?.pst_status === 1 && (
        <table className="text-left ">
          <tbody>
            <tr>
              <th className="px-4 py-2 font-normal">Status</th>
              <td>:</td>
              <td className="px-4 py-2 font-bold text-green-700 ">
                Telah Di Setujui
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {data.persetujuan?.pst_status === 0 && (
        <table className="w-full text-left ">
          <tbody>
            <tr>
              <th className="px-4 py-2 ">Status</th>
              <td>:</td>
              <td className="px-4 py-2 font-bold text-red-600 ">
                Tidak Di Setujui
              </td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-normal">Alasan</th>
              <td>:</td>
              <td className="px-4 py-2 ">{data.persetujuan?.pst_alasan}</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default FormPesertaLelang;
