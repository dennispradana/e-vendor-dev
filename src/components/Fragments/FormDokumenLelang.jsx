import React from 'react';
import { InputForm } from '../Elements/Input';

const FormDokumenLelang = ({ formik, handleModalDok }) => {
  return (
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
