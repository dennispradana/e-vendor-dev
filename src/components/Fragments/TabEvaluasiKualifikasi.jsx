import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { TextAreaForm } from '../Elements/Input';
import { useParams } from 'react-router-dom';
import { evaluasiService } from '../../services/evaluasi.service';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import Spinner from '../Elements/Spinner';

const TabEvaluasiKualifikasi = ({ data, onUpdate }) => {
  const { psrId } = useParams();
  const { updateEvaluasi } = evaluasiService();

  const initialValues = {
    kualifikasi: {
      chk: [],
      nev_uraian: '',
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
      kualifikasi: {
        chk:
          data.kualifikasi?.chk?.map((item) => ({
            chk_id: item.chk_id,
            nev_id: item.nev_id,
          })) || [],
        nev_uraian: data.kualifikasi?.nev_uraian || '',
      },
    });
  }, [data]);

  const handleCheckboxSelect = (item) => {
    const isDataSelected = formik.values.kualifikasi.chk.some(
      (selectedItem) => selectedItem.chk_id === item.chk_id
    );

    if (isDataSelected) {
      formik.setFieldValue(
        'kualifikasi.chk',
        formik.values.kualifikasi.chk.filter(
          (selectedItem) => selectedItem.chk_id !== item.chk_id
        )
      );
    } else {
      formik.setFieldValue('kualifikasi.chk', [
        ...formik.values.kualifikasi.chk,
        { chk_id: item.chk_id, nev_id: data.kualifikasi?.nev_id },
      ]);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {Object.keys(data.checklist?.kualifikasi || {}).map((category) => (
        <div key={category} className="mb-6">
          <h2 className="mb-2 font-semibold">{category}</h2>
          {data.checklist?.kualifikasi[category]?.map((item, index) => (
            <div key={index} className="flex items-start mb-2">
              <label className="inline-flex mr-2 items-top">
                <input
                  type="checkbox"
                  checked={formik.values.kualifikasi.chk.some(
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
      ))}
      <TextAreaForm
        label="Alasan Tidak Lulus"
        {...formik.getFieldProps('kualifikasi.nev_uraian')}
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

export default TabEvaluasiKualifikasi;
