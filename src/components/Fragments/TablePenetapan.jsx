import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { evaluasiService } from '../../services/evaluasi.service';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import Spinner from '../Elements/Spinner';
import { useFormik } from 'formik';
import FormTableNegosiasiHarga from './FormTableNegosiasiHarga';

const TablePenetapan = () => {
  const { psrId } = useParams();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const { getDokEvaluasiPeserta, updateEvaluasi } = evaluasiService();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getDokEvaluasiPeserta(psrId);
      setData(response.data);
    } catch (error) {
      toasterror(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initialValues = {
    negosiasi: {
      nev_dkh: [
        {
          item: '',
          unit: '',
          vol: '',
          harga: '',
          pajak: 11,
          total_harga: '',
          keterangan: '',
        },
      ],
      nev_harga: '',
      nev_harga_negosiasi: '',
      nev_urutan: '',
    },
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await updateEvaluasi(psrId, values);
      if (response.status === 201) {
        toastsuccess('Berhasil Menyimpan');
        navigate(-1);
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
      negosiasi: {
        nev_dkh:
          data.negosiasi?.nev_dkh !== null
            ? data.negosiasi?.nev_dkh.map((item) => ({
                item: item.item || '',
                unit: item.unit || '',
                vol: item.vol || '',
                harga: item.harga || '',
                pajak: item.pajak || 11,
                total_harga: item.total_harga || '',
                keterangan: item.keterangan || '',
              }))
            : data.peserta?.psr_dkh.map((item) => ({
                item: item.item || '',
                unit: item.unit || '',
                vol: item.vol || '',
                harga: item.harga || '',
                pajak: item.pajak || 11,
                total_harga: item.total_harga || '',
                keterangan: item.keterangan || '',
              })),
        nev_harga_negosiasi: data.negosiasi?.nev_harga_negosiasi
          ? data.negosiasi?.nev_harga_negosiasi
          : data.peserta?.psr_harga,
        nev_urutan: data.negosiasi?.nev_urutan || '',
        nev_harga: data.negosiasi?.nev_harga
          ? data.negosiasi?.nev_harga
          : data.peserta?.psr_harga,
      },
    });
  }, [data]);

  const handleBack = () => {
    navigate(-1);
  };

  console.log(data);

  const RenderDataLelang = () => {
    return (
      <table className="w-full text-sm text-left border border-collapse">
        <tbody>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">Nama Peserta</th>
            <td className="px-4 py-2 capitalize border-b">
              {data.peserta?.rkn_nama}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return loading ? (
    <div className="h-[60vh] flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-5 mb-10 bg-white rounded-lg shadow-md">
        <RenderDataLelang />
        <FormTableNegosiasiHarga dataHarga={data} formik={formik} />
        <div className="flex items-center gap-6 my-10">
          <button
            className={`px-4 py-2 font-semibold text-white capitalize transition duration-200 ease-in-out bg-gray-500 cursor-pointer rounded hover:bg-gray-700 hover:text-white ${
              formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={formik.isSubmitting}
            onClick={() => handleBack()}
          >
            Kembali
          </button>
          <button
            type="submit"
            className={`px-4 py-2 font-semibold text-white capitalize transition duration-200 ease-in-out bg-blue-500 cursor-pointer rounded hover:bg-blue-700 hover:text-white ${
              formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <Spinner /> : 'Simpan'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TablePenetapan;
