import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { InputForm, TextAreaForm } from '../Elements/Input';
import { useParams } from 'react-router-dom';
import { evaluasiService } from '../../services/evaluasi.service';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import Spinner from '../Elements/Spinner';

const TabEvaluasiHargaBiaya = ({ data, onUpdate }) => {
  const { psrId } = useParams();
  const { updateEvaluasi } = evaluasiService();

  const initialValues = {
    harga: {
      chk: [],
      nev_uraian: '',
      nev_harga_terkoreksi: data.peserta?.psr_harga || '',
    },
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await updateEvaluasi(psrId, values);
      if (response.status === 201) {
        toastsuccess('Berhasil Menyimpan');
        onUpdate();
      } else {
        toasterror('Terjadi Kesalahan Saat Menyimpan');
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

  useEffect(() => {
    formik.setValues({
      harga: {
        chk:
          data.harga?.chk?.map((item) => ({
            chk_id: item.chk_id,
            nev_id: item.nev_id,
          })) || [],
        nev_uraian: data.harga?.nev_uraian || '',
        nev_harga_terkoreksi: data.harga?.nev_harga_terkoreksi
          ? data.harga?.nev_harga_terkoreksi
          : data.peserta?.psr_harga,
      },
    });
  }, [data]);

  const handleCheckboxSelect = (item) => {
    const isDataSelected = formik.values.harga.chk.some(
      (selectedItem) => selectedItem.chk_id === item.chk_id
    );

    if (isDataSelected) {
      formik.setFieldValue(
        'harga.chk',
        formik.values.harga.chk.filter(
          (selectedItem) => selectedItem.chk_id !== item.chk_id
        )
      );
    } else {
      formik.setFieldValue('harga.chk', [
        ...formik.values.harga.chk,
        { chk_id: item.chk_id, nev_id: data.harga?.nev_id },
      ]);
    }
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-6">
        {data.checklist?.penawaran?.harga?.map((item, index) => (
          <div key={index} className="flex items-start mb-2">
            <label className="inline-flex mr-2 items-top">
              <input
                type="checkbox"
                checked={formik.values.harga.chk.some(
                  (selectedItem) => selectedItem.chk_id === item.chk_id
                )}
                onChange={() => handleCheckboxSelect(item)}
                className="w-4 h-4 text-blue-500"
                style={{ marginTop: '5px' }}
              />
              <span className="ml-2">{item.chk_nama}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <label className="mb-4 text-sm font-semibold capitalize">
          Harga Terkoreksi
        </label>
        <input
          type="number"
          className="w-full p-1 px-3 mt-2 bg-white border rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent number-input"
          {...formik.getFieldProps('harga.nev_harga_terkoreksi')}
        />
      </div>
      <TextAreaForm
        label="Alasan Tidak Lulus"
        {...formik.getFieldProps('harga.nev_uraian')}
      />
      <button
        type="submit"
        className={`px-4 py-2 font-semibold text-white capitalize transition duration-200 ease-in-out bg-blue-500 cursor-pointer rounded hover:bg-blue-700 hover:text-white ${
          formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? <Spinner /> : 'Simpan'}
      </button>
    </form>
  );
};

export default TabEvaluasiHargaBiaya;
