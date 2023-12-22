import React from 'react';
import { SelectForm } from '../Elements/Input';

const options = [
  { value: 1, label: 'Lumsum' },
  { value: 2, label: 'Harga Satuan' },
  { value: 3, label: 'Gabungan Lumsum & Harga Satuan' },
  { value: 4, label: 'Putar Kunci' },
  { value: 10, label: 'Kontrak Payung' },
  { value: 13, label: 'Waktu Penugasan' },
  { value: 14, label: 'Biaya Plus Imbalan' },
];

const FormDokumenPengadaan = ({
  handleModalKAK,
  handleModalRK,
  handleModalIL,
  formik,
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6 text-sm">
        <div>
          <label>
            Kerangka Acuan Kerja (KAK) / Spesifikasi Teknis dan Gambar
          </label>
          {formik.touched.dok_persiapan?.dp_spek &&
            formik.errors.dok_persiapan?.dp_spek && (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.dok_persiapan?.dp_spek}
              </p>
            )}
        </div>
        <div className="px-10">
          <button
            type="button"
            onClick={handleModalKAK}
            className="px-2 py-2 font-bold text-white duration-200 ease-in rounded-lg bg-violet-400 hover:bg-violet-500"
          >
            Upload File
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-6 text-sm">
        <div>
          <label>Rancangan Kontrak</label>
          {formik.touched.dok_persiapan?.dp_sskk_attachment &&
            formik.errors.dok_persiapan?.dp_sskk_attachment && (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.dok_persiapan?.dp_sskk_attachment}
              </p>
            )}
        </div>
        <div className="px-10">
          <button
            type="button"
            onClick={handleModalRK}
            className="px-2 py-2 font-bold text-white duration-200 ease-in rounded-lg bg-violet-400 hover:bg-violet-500"
          >
            Upload File
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-6 text-sm">
        <div>
          <label>Informasi Lainya</label>
        </div>
        <div className="px-10">
          <button
            type="button"
            onClick={handleModalIL}
            className="px-2 py-2 font-bold text-white duration-200 ease-in rounded-lg bg-violet-400 hover:bg-violet-500"
          >
            Upload File
          </button>
        </div>
      </div>
      <div>
        <SelectForm
          label="Jenis Kontrak"
          options={options}
          {...formik.getFieldProps('paket.lls_kontrak_pekerjaan')}
          error={
            formik.touched.paket?.lls_kontrak_pekerjaan &&
            formik.errors.paket?.lls_kontrak_pekerjaan
          }
        />
      </div>
    </>
  );
};

export default FormDokumenPengadaan;
