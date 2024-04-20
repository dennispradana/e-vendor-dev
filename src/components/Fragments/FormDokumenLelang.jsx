import React from 'react';
import { InputForm } from '../Elements/Input';

const FormDokumenLelang = ({ formik, handleModalDok, type }) => {
  return type === 'readOnly' ? (
    <>
      <div className="flex flex-col mb-6">
        <label>Nomor Dokumen Pemilihan</label>
        <input
          type="text"
          className="w-full p-1 px-3 mt-2 text-gray-700 bg-white border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:border-transparent"
          {...formik.getFieldProps('dokumen.dll_nomorsdp')}
          readOnly
        />
      </div>
      <div className="flex flex-col mb-6">
        <label>Tanggal Dokumen Pemilihan</label>
        <input
          type="date"
          className="w-full p-1 px-3 mt-2 text-gray-700 bg-white border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:border-transparent"
          {...formik.getFieldProps('dokumen.dll_tglsdp')}
          readOnly
        />
      </div>
      <div className="flex flex-col mb-6">
        <label>Masa Berlaku Penawaran (Hari)</label>
        <input
          type="text"
          className="w-full p-1 px-3 mt-2 text-gray-700 bg-white border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:border-transparent"
          {...formik.getFieldProps('dokumen.durasi')}
          readOnly
        />
      </div>
      <table className="w-full text-xs text-left border border-collapse">
        <tbody>
          <tr>
            <th className="px-4 py-2 border-b border-r">
              Dokumen Pemilihan
              {formik.touched.dokumen?.dll_id_attachment &&
                formik.errors.dokumen?.dll_id_attachment && (
                  <p className="mt-1 text-sm italic text-red-500 ">
                    {formik.errors.dokumen?.dll_id_attachment}
                  </p>
                )}
            </th>
            <td className="px-4 py-4 text-sm border-b">
              <button
                type="button"
                onClick={handleModalDok}
                className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-800 w-[10rem]"
              >
                Lihat Dokumen
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  ) : (
    <>
      <InputForm
        label="Nomor Dokumen Pemilihan"
        type="text"
        {...formik.getFieldProps('dokumen.dll_nomorsdp')}
        error={
          formik.touched.dokumen?.dll_nomorsdp &&
          formik.errors.dokumen?.dll_nomorsdp
        }
      />
      <InputForm
        label="Tanggal Dokumen Pemilihan"
        type="date"
        {...formik.getFieldProps('dokumen.dll_tglsdp')}
        error={
          formik.touched.dokumen?.dll_tglsdp &&
          formik.errors.dokumen?.dll_tglsdp
        }
      />
      <InputForm
        label="Masa Berlaku Penawaran (Hari)"
        type="text"
        {...formik.getFieldProps('dokumen.durasi')}
        error={formik.touched.dokumen?.durasi && formik.errors.content?.durasi}
      />
      <table className="w-full text-xs text-left border border-collapse">
        <tbody>
          <tr>
            <th className="px-4 py-2 border-b border-r">
              Dokumen Pemilihan
              {formik.touched.dokumen?.dll_id_attachment &&
                formik.errors.dokumen?.dll_id_attachment && (
                  <p className="mt-1 text-sm italic text-red-500 ">
                    {formik.errors.dokumen?.dll_id_attachment}
                  </p>
                )}
            </th>
            <td className="px-4 py-4 text-sm border-b">
              {' '}
              <button
                type="button"
                onClick={handleModalDok}
                className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-800 w-[10rem]"
              >
                Tambah Dokumen
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FormDokumenLelang;
