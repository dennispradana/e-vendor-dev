import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { paketService } from '../../services/paket.service';
import FormDataPaketLelang from './FormDataPaketLelang';
import TableHpsLelang from './TableHpsLelang';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Spinner from '../Elements/Spinner';
import Stepper from '../Elements/Stepper';
import {
  Kualifikasi,
  LelangPenyedia,
  ModalIL,
  ModalKAK,
  ModalRK,
  Penawaran,
} from '../Elements/Modal/pp';
import { formatEditDate } from '../../utils/formatDate';
import FormJadwaalLelang from './FormJadwaalLelang';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import FormDokumenLelang from './FormDokumenLelang';
import { FileUploadPemilihan } from '../Elements/Modal/fileUpload';
import FormPesertaLelang from './FormPesertaLelang';
import FormPersyaratanLelang from './FormPersyaratanLelang';

const FormLelang = () => {
  const { paketLelang, updatePaketLelang } = paketService();
  const { llsId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [dataPaket, setDataPaket] = useState('');
  const [loading, setLoading] = useState(false);
  const steps = [
    'Data Paket',
    'HPS',
    'Jadwal',
    'Dokumen Pengadaan',
    'persyratan',
    'Peserta',
  ];
  const [showModalKAK, setShowModalKAK] = useState(false);
  const [showModalRK, setShowModalRK] = useState(false);
  const [showModalIL, setShowModalIL] = useState(false);
  const [showModaDok, setShowModaDok] = useState(false);
  const [showModalKulaifikasi, setShowModalKulaifikasi] = useState(false);
  const [showModalPenawaran, setShowModalPenawaran] = useState(false);
  const [showModalPenyedia, setShowModalPenyedia] = useState(false);
  const [selectKualifikasi, setSelectKualifikasi] = useState([]);
  const [selectPenawaran, setSelectPenawaran] = useState([]);
  const [dllId, setDllId] = useState('');
  const navigate = useNavigate();

  const fetchDataPaket = async () => {
    try {
      setLoading(true);
      const response = await paketLelang(llsId);
      const paket = response.data;
      setDataPaket(paket);
      setSelectKualifikasi(
        paket.checklist?.kualifikasi.map((item) => ({
          ckm_id: item.ckm_id,
        }))
      );
      setSelectPenawaran(
        paket.checklist?.penawaran.map((item) => ({
          ckm_id: item.ckm_id,
        }))
      );
    } catch (error) {
      toasterror(error.message);
    } finally {
      setLoading(false);
    }
  };

  const initialStepValues = [
    {
      nonLel: {
        kgr_id: '',
        lls_bentuk_usaha: '',
      },
    },
    {
      nonLel: {
        pkt_hps: '',
      },
    },
    {
      jadwal: dataPaket.jadwal?.map((item) => ({
        akt_id: item.akt_id || '',
        nama: item.nama || '',
        dtj_tglawal: item.dtj_tglawal
          ? formatEditDate(new Date(item.dtj_tglawal))
          : '',
        dtj_tglakhir: item.dtj_tglakhir
          ? formatEditDate(new Date(item.dtj_tglakhir))
          : '',
        dtj_id: item.dtj_id || '',
      })),
    },
    {
      dokumen: {
        dll_id: dataPaket.dokumen?.dll_id,
        dll_nomorsdp: '',
        dll_tglsdp: '',
        durasi: '',
        dll_id_attachment: '',
        dll_versi: dataPaket.dokumen?.dll_versi,
      },
    },
    {
      dokumen: {
        dll_id: dataPaket.dokumen?.dll_id,
      },
    },
    {
      persetujuan: {
        pst_status: dataPaket.persetujuan?.pst_status || '',
        pst_alasan: '',
      },
    },
  ];

  const validationSchemas = [
    Yup.object({
      nonLel: Yup.object({
        kgr_id: Yup.string().required('harus di isi'),
        lls_bentuk_usaha: Yup.string().required('harus di isi'),
      }),
    }),
    Yup.object({
      nonLel: Yup.object({
        pkt_hps: Yup.string().required('Hps Tidak Valid'),
      }),
    }),
    Yup.object({
      jadwal: Yup.array().of(
        Yup.object({
          dtj_tglawal: Yup.string().required('harus di isi'),
          dtj_tglakhir: Yup.string().required('harus di isi'),
        })
      ),
    }),
    Yup.object({
      dokumen: Yup.object({
        dll_nomorsdp: Yup.string().required('harus di isi'),
        dll_tglsdp: Yup.string().required('harus di isi'),
        durasi: Yup.string().required('harus di isi'),
        dll_id_attachment: Yup.string().required('harus di isi'),
      }),
    }),
    Yup.object({
      dokumen: Yup.object({
        dll_id: Yup.string().required('harus di isi'),
      }),
    }),
    Yup.object({
      persetujuan: Yup.object({
        pst_status: Yup.string().required('harus di isi'),
        pst_alasan: Yup.string().required('harus di isi'),
      }),
    }),
  ];

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updatePaketLelang(llsId, values);
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
      nonLel: {
        kgr_id: dataPaket.nonLel?.kgr_id || '',
        lls_bentuk_usaha: dataPaket.nonLel?.lls_bentuk_usaha || '',
        pkt_hps: dataPaket.nonLel?.pkt_hps || '',
      },
      jadwal: dataPaket.jadwal?.map((item) => ({
        akt_id: item.akt_id || '',
        nama: item.nama || '',
        dtj_tglawal: item.dtj_tglawal
          ? formatEditDate(new Date(item.dtj_tglawal))
          : '',
        dtj_tglakhir: item.dtj_tglakhir
          ? formatEditDate(new Date(item.dtj_tglakhir))
          : '',
        dtj_id: item.dtj_id || '',
      })),
      dokumen: {
        dll_id: dataPaket.dokumen?.dll_id || '',
        dll_nomorsdp: dataPaket.dokumen?.dll_nomorsdp || '',
        dll_tglsdp: dataPaket.dokumen?.dll_tglsdp
          ? formatEditDate(new Date(dataPaket.dokumen?.dll_tglsdp))
          : '',
        durasi: dataPaket.dokumen?.durasi || '',
        dll_id_attachment: dataPaket.dokumen?.dll_id_attachment || '',
        dll_versi: dataPaket.dokumen?.dll_versi || '',
      },
      persetujuan: {
        pst_status: dataPaket.persetujuan?.pst_status,
        pst_alasan: dataPaket.persetujuan?.pst_alasan || '',
      },
    });
  }, [dataPaket]);

  useEffect(() => {
    fetchDataPaket();
  }, []);

  const handleDataUpadate = async () => {
    await fetchDataPaket();
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleNext = async () => {
    if (formik.isValid) {
      try {
        formik.setSubmitting(true);
        await formik.submitForm();
        if (currentStep === steps.length) {
          navigate('/data-paket');
          toastsuccess('Berhasil Menyimpan Data');
        } else {
          await fetchDataPaket();
          setCurrentStep((prevStep) => prevStep + 1);
        }
      } catch (error) {
        toasterror(error.message);
      } finally {
        formik.setSubmitting(false);
      }
    }
  };

  const handleModalKAK = () => {
    setShowModalKAK(!showModalKAK);
  };
  const handleModalRK = () => {
    setShowModalRK(!showModalRK);
  };
  const handleModalIL = () => {
    setShowModalIL(!showModalIL);
  };

  const handleShowDok = () => {
    setShowModaDok(true);
  };

  const handleCloseDok = (dllIdAttachment) => {
    setShowModaDok(false);
    setDllId(dllIdAttachment);
    formik.setFieldValue('dokumen.dll_id_attachment', dllIdAttachment);
  };

  const handleModalKualifikasi = () => {
    setShowModalKulaifikasi(!showModalKulaifikasi);
  };

  const handleModalPenawaran = () => {
    setShowModalPenawaran(!showModalPenawaran);
  };

  const handleModalPenyedia = () => {
    setShowModalPenyedia(!showModalPenyedia);
  };

  const displayStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormDataPaketLelang
            datas={dataPaket}
            loading={loading}
            handleModalKAK={handleModalKAK}
            handleModalRK={handleModalRK}
            handleModalIL={handleModalIL}
            formik={formik}
          />
        );
      case 2:
        return (
          <TableHpsLelang data={dataPaket} loading={loading} formik={formik} />
        );
      case 3:
        return (
          <FormJadwaalLelang
            datas={dataPaket}
            loading={loading}
            formik={formik}
          />
        );
      case 4:
        return (
          <FormDokumenLelang formik={formik} handleModalDok={handleShowDok} />
        );
      case 5:
        return (
          <FormPersyaratanLelang
            data={dataPaket}
            handleModalKualifikasi={handleModalKualifikasi}
            handleModalPenawaran={handleModalPenawaran}
          />
        );
      case 6:
        return (
          <FormPesertaLelang
            data={dataPaket}
            formik={formik}
            handleModalPeserta={handleModalPenyedia}
          />
        );
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
            {currentStep <= 5 && (
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
                ) : currentStep === 5 ? (
                  'Simpan'
                ) : (
                  'Selanjutnya'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
      {showModalKAK && <ModalKAK close={handleModalKAK} data={dataPaket} />}
      {showModalRK && <ModalRK close={handleModalRK} data={dataPaket} />}
      {showModalIL && <ModalIL close={handleModalIL} data={dataPaket} />}
      {showModaDok && (
        <FileUploadPemilihan
          Id={
            dataPaket.dokumen?.dll_id_attachment !== null
              ? dataPaket.dokumen?.dll_id_attachment
              : dllId
          }
          close={handleCloseDok}
        />
      )}
      {showModalKulaifikasi && (
        <Kualifikasi
          close={handleModalKualifikasi}
          llsId={llsId}
          dllIdDok={dataPaket.dokumen?.dll_id}
          selectedKualifikasi={selectKualifikasi}
          onUpdate={handleDataUpadate}
        />
      )}
      {showModalPenawaran && (
        <Penawaran
          close={handleModalPenawaran}
          llsId={llsId}
          dllIdDok={dataPaket.dokumen?.dll_id}
          selectedPenawaran={selectPenawaran}
          onUpdate={handleDataUpadate}
        />
      )}
      {showModalPenyedia && (
        <LelangPenyedia
          close={handleModalPenyedia}
          llsId={llsId}
          onUpdate={handleDataUpadate}
        />
      )}
    </>
  );
};

export default FormLelang;
