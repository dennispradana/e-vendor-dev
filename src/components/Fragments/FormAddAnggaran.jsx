import React from 'react';
import { useFormik } from 'formik';
import { paketService } from '../../services/paket.service';
import { useParams } from 'react-router-dom';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { IoIosClose } from 'react-icons/io';
import { formatRp } from '../../utils/formatRupiah';
import Spinner from '../Elements/Spinner';

const FormAddAnggaran = ({ detail, close, onUpdate, mode }) => {
  const { postAnggaran, updateAnggaran } = paketService();
  const { paketId } = useParams();
  const initialValues = {
    ang_id: detail.ang_id,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    let response;
    let message;
    try {
      if (mode === 'add') {
        response = await postAnggaran(paketId, values);
        message = 'Berhasil Menambah Anggaran';
      } else {
        response = await updateAnggaran(paketId, values);
        message = 'Update Sukses';
      }
      if (response.success) {
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
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  if (!detail || !detail.rup || !detail.rup.rup_id) {
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-[40vw] mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="p-5 border-b border-solid rounded-t border-blueGray-200">
                <div className="flex justify-end">
                  <button
                    className="p-1 bg-gray-200 rounded-full hover:bg-red-500 hover:text-white"
                    onClick={close}
                  >
                    <IoIosClose />
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold uppercase">Detail Paket</p>
                </div>
              </div>
              <div className="relative flex-auto px-6 my-6">
                <p className="p-4 italic font-bold text-center bg-gray-200">
                  {detail}
                </p>
              </div>
              <div className="flex items-center justify-center py-2 border-t border-solid rounded-b border-blueGray-200">
                <button
                  onClick={close}
                  className="p-3 font-bold text-red-500 hover:text-red-600 border-slate-200"
                  type="button"
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
      </>
    );
  }
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[70vw] mx-auto max-h-screen">
          <div className="relative py-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="p-5 border-b border-solid rounded-t border-blueGray-200">
                <div className="flex justify-end">
                  <button
                    className="p-1 bg-gray-200 rounded-full hover:bg-red-500 hover:text-white"
                    onClick={close}
                  >
                    <IoIosClose />
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold uppercase">Detail Paket</p>
                </div>
              </div>
              <div className="relative flex-auto p-6">
                <table className="w-full text-sm text-left border">
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2 max-w-[4rem]">Kode RUP</td>
                      <td>{detail.rup.rup_id}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 max-w-[4rem]">Nama Paket</td>
                      <td>{detail.rup.pkt_nama}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 max-w-[4rem]">
                        Nilai Pagu Paket
                      </td>
                      <td>{formatRp(detail.rup.angg_nilai)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 max-w-[4rem]">Tahun Anggaran</td>
                      <td>{detail.rup.angg_thn}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 max-w-[4rem]">
                        Jenis Pengadaan
                      </td>
                      <td>
                        {
                          {
                            1: 'Barang',
                            2: 'Pekerjaan Konstruksi',
                            3: 'Jasa Konsultansi',
                            4: 'Jasa Lainnya',
                          }[detail.rup.jns_pengadaan]
                        }
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 max-w-[4rem]">
                        Metode Pengadaan
                      </td>
                      <td>{detail.rup.mtd_pengadaan}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 max-w-[4rem]">Sumber Dana</td>
                      <td>{detail.rup.sbd_id}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 max-w-[4rem]">Kode Anggaran</td>
                      <td>{detail.rup.angg_rekening}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 max-w-[4rem]">Nilai</td>
                      <td>{formatRp(detail.rup.angg_nilai)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 max-w-[4rem]">Lokasi</td>
                      <td className="py-2 pr-4">
                        <table className="w-full text-sm text-left text-gray-500 border">
                          <thead className="bg-gray-200 border-b border-gray-300">
                            <tr>
                              <th className="px-6 py-2">Provinsi</th>
                              <th className="px-6 py-2">Kab/Kota</th>
                              <th className="px-6 py-2">Detail</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-6 py-2">
                                {detail.rup.lokasi.propinsi}
                              </td>
                              <td className="px-6 py-2">
                                {detail.rup.lokasi.kota}
                              </td>
                              <td className="px-6 py-2">
                                {detail.rup.lokasi.lokasi}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col items-center justify-center py-2 border-t border-solid rounded-b border-blueGray-200">
                <form onSubmit={formik.handleSubmit}>
                  <input
                    type="text"
                    {...formik.getFieldProps('ang_id')}
                    hidden
                  />
                  <button
                    className="p-3 font-bold text-blue-500 hover:text-blue-600 border-slate-200"
                    type="submit"
                  >
                    {formik.isSubmitting ? (
                      <Spinner />
                    ) : mode === 'add' ? (
                      'Tambah'
                    ) : (
                      'update'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </>
  );
};

export default FormAddAnggaran;
