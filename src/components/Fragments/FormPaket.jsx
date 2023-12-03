import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormDataPaket from './FormDataPaket';
import FormDokumenPengadaan from './FormDokumenPengadaan';
import FormHPS from './FormHPS';
import Stepper from '../Elements/Stepper';
import FormAnggaran from './FormAnggaran';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { paketService } from '../../services/paket.service';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FileUploadIL,
  FileUploadKAK,
  FileUploadRK,
} from '../Elements/Modal/fileUpload';
import Spinner from '../Elements/Spinner';

const FormPaket = () => {
  const { getDataPaket, updateDataPaket } = paketService();
  const { paketId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [dataPaket, setDataPaket] = useState(false);
  const [mode, setMode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModalAnggran, setShowModalAnggaran] = useState(false);
  const [showModalKAK, setShowModalKAK] = useState(false);
  const [showModalRK, setShowModalRK] = useState(false);
  const [showModalIL, setShowModalIL] = useState(false);
  const [dpSpekId, setDpSpekId] = useState('');
  const [dpSskkId, setDpSskkId] = useState('');
  const [dpLainId, setLainId] = useState('');
  const steps = ['Data Paket', 'Dokumen Persiapan', 'HPS'];
  const navigate = useNavigate();

  const initialStepValues = [
    {
      paket: {
        pkt_nama: '',
      },
      lokasi: [
        {
          pkt_lokasi: '',
          prop: '',
          kota: '',
        },
      ],
    },
    {
      paket: {
        lls_kontrak_pekerjaan: '',
      },
      dok_persiapan: {
        dp_spek: '',
        dp_sskk: '',
        dp_lainya: '',
      },
    },
    {
      paket: {
        pkt_hps: '',
      },
      dok_persiapan: {
        dp_dkh: [
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
      },
    },
  ];

  const validationSchemas = [
    Yup.object({
      paket: Yup.object({
        pkt_nama: Yup.string().required('harus di isi'),
      }),
      lokasi: Yup.array().of(
        Yup.object({
          pkt_lokasi: Yup.string().required('harus di isi'),
          prop: Yup.string().required('harus di isi'),
          kota: Yup.string().required('harus di isi'),
        })
      ),
    }),
    Yup.object({
      paket: Yup.object({
        lls_kontrak_pekerjaan: Yup.string().required('harus diisi'),
      }),
      dok_persiapan: Yup.object({
        dp_spek: Yup.string().required('harus diisi'),
      }),
    }),
    Yup.object({
      paket: Yup.object({
        pkt_hps: Yup.string()
          .test(
            'data tidak boleh kosong',
            'data tidak boleh kosong',
            (value) => {
              return value !== '' && parseFloat(value) !== 0;
            }
          )
          .required('data tidak boleh kosong'),
      }),
    }),
  ];

  const fetchDataPaket = async () => {
    try {
      const response = await getDataPaket(paketId);
      const paket = response.data;
      setDataPaket(paket);
    } catch (error) {
      toasterror(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateDataPaket(paketId, values);
    } catch (error) {
      toasterror(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: initialStepValues[currentStep - 1],
    validationSchema: validationSchemas[currentStep - 1],
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.setValues({
      paket: {
        pkt_nama: dataPaket.paket?.pkt_nama || '',
        lls_kontrak_pekerjaan: dataPaket.paket?.lls_kontrak_pekerjaan || '',
        pkt_hps: dataPaket.paket?.pkt_hps || '',
      },
      lokasi: dataPaket.lokasi?.map((lokasiItem) => ({
        pkt_lokasi: lokasiItem.pkt_lokasi || '',
        prop: lokasiItem.prop || '',
        kota: lokasiItem.kota || '',
      })),
      dok_persiapan: {
        dp_spek: dataPaket.dok_persiapan?.dp_spek || '',
        dp_sskk: dataPaket.dok_persiapan?.dp_sskk || '',
        dp_lainya: dataPaket.dok_persiapan?.dp_lainya || '',
        dp_dkh: dataPaket.dok_persiapan?.dp_dkh?.map((item) => ({
          item: item.item || '',
          unit: item.unit || '',
          vol: item.vol || '',
          harga: item.harga || '',
          pajak: item.pajak || 11,
          total_harga: item.total_harga || '',
          keterangan: item.keterangan || '',
        })),
      },
    });
  }, [dataPaket]);

  const handleDataPaketUpadate = async () => {
    await fetchDataPaket();
  };

  useEffect(() => {
    fetchDataPaket();
  }, []);

  const handleNext = async () => {
    if (formik.isValid) {
      if (currentStep === steps.length) {
        try {
          formik.setSubmitting(true);
          await formik.submitForm();
          navigate('/daftar-paket');
          toastsuccess('Berhasil Menyimpan Data');
        } catch (error) {
          toasterror(error.message);
        } finally {
          formik.setSubmitting(false);
        }
      } else {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleModalAddAnggaran = () => {
    setShowModalAnggaran(true);
    setMode('add');
  };

  const handleModalUpdateAnggaran = () => {
    setShowModalAnggaran(true);
    setMode('update');
  };

  const handleModalAnggaran = () => {
    setShowModalAnggaran(false);
  };

  const handleOpenModalKAK = () => {
    setShowModalKAK(true);
  };

  const handleCloseModalKAK = (dpSpekIdAttachment) => {
    setShowModalKAK(false);
    setDpSpekId(dpSpekIdAttachment);
    formik.setFieldValue('dok_persiapan.dp_spek', dpSpekIdAttachment);
  };

  const handleOpenModaRK = () => {
    setShowModalRK(true);
  };

  const handleCloseModalRK = (dpSskkIdAttachment) => {
    setShowModalRK(false);
    setDpSskkId(dpSskkIdAttachment);
    formik.setFieldValue('dok_persiapan.dp_sskk', dpSskkIdAttachment);
  };

  const handleOpenModaIL = () => {
    setShowModalIL(true);
  };

  const handleCloseModalIL = (dpLainIdAttachment) => {
    setShowModalIL(false);
    setLainId(dpLainIdAttachment);
    formik.setFieldValue('dok_persiapan.dp_lainya', dpLainIdAttachment);
  };

  const displayStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormDataPaket
            modalAdd={handleModalAddAnggaran}
            modalUpdate={handleModalUpdateAnggaran}
            datas={dataPaket}
            formik={formik}
          />
        );
      case 2:
        return (
          <FormDokumenPengadaan
            formik={formik}
            handleModalKAK={handleOpenModalKAK}
            handleModalRK={handleOpenModaRK}
            handleModalIL={handleOpenModaIL}
          />
        );
      case 3:
        return <FormHPS formik={formik} dataPaket={dataPaket} />;
      default:
        return null;
    }
  };
  return loading ? (
    <div className="h-[60vh] flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <>
      <div className="py-10 mb-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
        <Stepper steps={steps} currentStep={currentStep} />
        <form onSubmit={formik.handleSubmit}>
          {displayStep()}
          <div className="flex gap-5 mt-6">
            {currentStep === 1 && (
              <button
                type="button"
                className={`px-4 py-2 font-semibold capitalize transition duration-200 ease-in-out bg-white border-2 cursor-not-allowed text-slate-400 rounded-xl border-slate-300 ${
                  formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={formik.isSubmitting}
              >
                Kembali
              </button>
            )}
            {currentStep > 1 && (
              <button
                type="button"
                className={`px-4 py-2 font-semibold capitalize transition duration-200 ease-in-out bg-white border-2 cursor-pointer text-slate-400 rounded-xl border-slate-300 hover:bg-slate-700 hover:text-white ${
                  formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handlePrevious}
                disabled={formik.isSubmitting}
              >
                Kembali
              </button>
            )}
            {currentStep <= 3 && (
              <button
                type="submit"
                className={`px-4 py-2 font-semibold text-white capitalize transition duration-200 ease-in-out bg-blue-500 cursor-pointer rounded-xl hover:bg-blue-700 hover:text-white ${
                  formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleNext}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <Spinner />
                ) : currentStep === 3 ? (
                  'Simpan'
                ) : (
                  'Selanjutnya'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
      {showModalAnggran && (
        <FormAnggaran
          close={handleModalAnggaran}
          onUpdate={handleDataPaketUpadate}
          mode={mode}
        />
      )}
      {showModalKAK && (
        <FileUploadKAK
          close={handleCloseModalKAK}
          Id={
            dataPaket.dok_persiapan?.dp_spek !== null
              ? dataPaket.dok_persiapan?.dp_spek
              : dpSpekId
          }
        />
      )}
      {showModalRK && (
        <FileUploadRK
          close={handleCloseModalRK}
          Id={
            dataPaket.dok_persiapan?.dp_sskk !== null
              ? dataPaket.dok_persiapan?.dp_sskk
              : dpSskkId
          }
        />
      )}
      {showModalIL && (
        <FileUploadIL
          close={handleCloseModalIL}
          Id={
            dataPaket.dok_persiapan?.dp_lainya !== null
              ? dataPaket.dok_persiapan?.dp_lainya
              : dpLainId
          }
        />
      )}
    </>
  );
};

export default FormPaket;
