import React, { useEffect } from 'react';
import { SkeletonItem } from '../Elements/Skelekton';
import Button from '../Elements/Button';
import { TextAreaForm } from '../Elements/Input';
import { useFormik } from 'formik';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';

const DetailNilai = ({ data, loading }) => {
  const initialValues = {
    nilai: {
      inf_tamb: '',
      ktr_id: '',
      lls_id: '',
      ref_id: '',
    },
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const newValues = {
      nilai: {
        ...values.nilai,
        ktr_id: data.pertanyaan?.ktr_id,
        lls_id: data.lelang?.lls_id,
      },
    };
    try {
      console.log(newValues);
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
      nilai: {
        inf_tamb: data.nilai?.inf_tamb || '',
        ktr_id: data.nilai?.ktr_id || '',
        lls_id: data.nilai?.lls_id || '',
        ref_id: data.nilai?.ref_id || '',
      },
    });
  }, [data]);

  const Informasi = () => {
    return (
      <table className="w-full text-sm text-left border border-collapse">
        <tbody>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">Kode Tender</th>
            <td className="px-4 py-2 border-b">{data.lelang?.lls_id}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Indikator Penilaian
            </th>
            <td className="px-4 py-2 border-b">{data.pertanyaan?.ktr_nama}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 align-top border-b border-r">
              Bobot Nilai (%)
            </th>
            <td className="px-4 py-2 border-b">
              {data.pertanyaan?.base_bobot}%
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const handleJawabanChange = (refId) => {
    formik.setFieldValue('nilai.ref_id', refId);
  };

  const inputJawaban = (item) => {
    return (
      <div className="flex align-top cursor-pointer">
        <input
          type="radio"
          className="w-3"
          checked={formik.values.nilai.ref_id === item.ref_id}
          onChange={() => handleJawabanChange(item.ref_id)}
        />
        <label className="pl-2 ">{item.ktr_uraian}</label>
      </div>
    );
  };

  const handleBack = () => {
    history.back();
  };

  return loading ? (
    <SkeletonItem itemCount={1} cN="bg-gray-200 h-36" />
  ) : (
    <form onSubmit={formik.handleSubmit}>
      <div className="py-10 mb-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
        <Informasi />
        <p className="px-3 py-5 my-5 font-bold uppercase border-b text-sky-700">
          Penilaian Penyedia
        </p>
        <div className="mb-5">
          <p className="mb-3 font-bold">Pertanyaan:</p>
          <p>{data.pertanyaan?.ktr_nama}</p>
        </div>
        <div className="mb-4">
          <p className="mb-3 font-bold">Jawaban:</p>
          {data.jawaban?.map((item, index) => (
            <div key={index} className="mb-2">
              {inputJawaban(item)}
            </div>
          ))}
        </div>
        <TextAreaForm
          label="Komentar Tambahan (opsioanal)"
          {...formik.getFieldProps('nilai.inf_tamb')}
        />
      </div>
      <div className="flex justify-between my-6">
        <Button
          cN={`btn bg-sky-500 text-white hover:bg-blue-600 ease-in duration-200`}
          type="submit"
        >
          Kirim
        </Button>
        <Button
          cN={`btn bg-green-600 text-white hover:bg-green-700 ease-in duration-200`}
          type="button"
          onClick={() => handleBack()}
        >
          Kembali
        </Button>
      </div>
    </form>
  );
};

export default DetailNilai;
