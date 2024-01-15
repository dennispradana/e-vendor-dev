import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FormSuratPenawaran from './FormSuratPenawaran';
import FormPenawaranTeknis from './FormPenawaranTeknis';
import FormPenawaranHarga from './FormPenawaranHarga';
import { useNavigate, useParams } from 'react-router-dom';
import { penyediaService } from '../../services/penyedia.service';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { useFormik } from 'formik';
import Spinner from '../Elements/Spinner';
import { FileUploadDokKirimPenawaran } from '../Elements/Modal/fileUpload';

const FormKirimPenawaran = () => {
  const { llsId } = useParams();
  const { getKirimPenawaran, putKirimPenawaran } = penyediaService();
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModalHarga, setShowModalHarga] = useState(false);
  const [selectedTeknisIndex, setSelectedTeknisIndex] = useState(null);
  const [selectedHargaIndex, setSelectedHargaIndex] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getKirimPenawaran(llsId);
      setData(response.data);
    } catch (error) {
      toasterror(error.message);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    peserta: {
      masa_berlaku_penawaran: '',
      psr_harga: '',
      psr_dkh: [
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
    checklist: {
      harga: [
        {
          chk_id: '',
          dok_id_attachment: '',
        },
      ],
      teknis: [
        {
          chk_id: '',
          dok_id_attachment: '',
        },
      ],
    },
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await putKirimPenawaran(llsId, values);
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
      peserta: {
        masa_berlaku_penawaran:
          data.peserta?.masa_berlaku_penawaran === null
            ? data.dok_lelang?.durasi
            : data.peserta?.masa_berlaku_penawaran || '',
        psr_dkh: data.peserta?.psr_dkh?.map((item) => ({
          item: item.item || '',
          unit: item.unit || '',
          vol: item.vol || '',
          harga: item.harga || '',
          pajak: item.pajak || 11,
          total_harga: item.total_harga || '',
          keterangan: item.keterangan || '',
        })),
        psr_harga: data.peserta?.psr_harga || '',
      },
      checklist: {
        harga: data.checklist?.harga?.map((item) => ({
          chk_id: item.chk_id,
          dok_id_attachment: item.dok_id_attachment || '',
        })),
        teknis: data.checklist?.teknis?.map((item) => ({
          chk_id: item.chk_id,
          dok_id_attachment: item.dok_id_attachment || '',
        })),
      },
    });
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleNext = async () => {
    if (formik.isValid) {
      try {
        formik.setSubmitting(true);
        await formik.submitForm();
        if (currentStep === 2) {
          navigate(`/penawaran/${llsId}`);
          toastsuccess('Berhasil Mengirim Penawaran');
        } else {
          await fetchData();
          setCurrentStep((prevStep) => prevStep + 1);
        }
      } catch (error) {
        toasterror(error.message);
      } finally {
        formik.setSubmitting(false);
      }
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleOpenModal = (index) => {
    setSelectedTeknisIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = async (dokIdAttachment) => {
    const updatedTeknis = [...formik.values.checklist.teknis];
    if (selectedTeknisIndex !== null) {
      updatedTeknis[selectedTeknisIndex].dok_id_attachment =
        dokIdAttachment || updatedTeknis[selectedTeknisIndex].dok_id_attachment;
    }

    formik.setValues({
      ...formik.values,
      checklist: {
        ...formik.values.checklist,
        teknis: updatedTeknis,
      },
    });

    try {
      formik.setSubmitting(true);
      await formik.submitForm();
      await fetchData();
      setShowModal(false);
    } catch (error) {
      toasterror(error.message);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const handleOpenModalHarga = (index) => {
    setSelectedHargaIndex(index);
    setShowModalHarga(true);
  };

  const handleCloseModalHarga = async (dokIdAttachment) => {
    const updatedHarga = [...formik.values.checklist.harga];
    if (selectedHargaIndex !== null) {
      updatedHarga[selectedHargaIndex].dok_id_attachment =
        dokIdAttachment || updatedHarga[selectedHargaIndex].dok_id_attachment;
    }

    formik.setValues({
      ...formik.values,
      harga: {
        ...formik.values.harga,
        harga: updatedHarga,
      },
    });

    try {
      formik.setSubmitting(true);
      await formik.submitForm();
      await fetchData();
      setShowModalHarga(false);
    } catch (error) {
      toasterror(error.message);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const renderFormContent = () => {
    switch (currentStep) {
      case 0:
        return <FormSuratPenawaran data={data} formik={formik} />;
      case 1:
        return (
          <FormPenawaranTeknis
            data={data}
            modal={(index) => handleOpenModal(index)}
          />
        );
      case 2:
        return (
          <FormPenawaranHarga
            dataHarga={data}
            formik={formik}
            modal={(index) => handleOpenModalHarga(index)}
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
      <form className="mb-10" onSubmit={formik.handleSubmit}>
        <Tabs
          selectedIndex={currentStep}
          onSelect={(index) => setCurrentStep(index)}
          selectedTabClassName="bg-violet-600 text-white rounded-t"
        >
          <TabList>
            {['Surat Penawaran', 'Penawaran Teknis', 'Penawaran Harga', ,].map(
              (title, index) => (
                <Tab key={index}>{title}</Tab>
              )
            )}
          </TabList>
          {Array.from({ length: 3 }, (_, index) => (
            <TabPanel key={index}>
              <div className="mb-6">{renderFormContent()}</div>
              <div className="flex items-center justify-between px-6">
                {currentStep === 0 && (
                  <button
                    className="px-2 py-2 text-white bg-gray-400 rounded w-[10rem]"
                    onClick={handlePrev}
                    disabled
                  >
                    Sebelumnya
                  </button>
                )}
                {currentStep > 0 && (
                  <button
                    type="button"
                    className="px-3 py-2 text-white bg-gray-400 hover:bg-gray-600 rounded w-[10rem]"
                    onClick={handlePrev}
                  >
                    Sebelumnya
                  </button>
                )}
                {currentStep <= 2 && (
                  <button
                    type="submit"
                    className={`px-4 py-2 font-semibold text-white capitalize transition duration-200 ease-in-out bg-blue-500 cursor-pointer rounded hover:bg-blue-700 hover:text-white ${
                      formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleNext}
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? (
                      <Spinner />
                    ) : currentStep === 2 ? (
                      'Simpan'
                    ) : (
                      'Selanjutnya'
                    )}
                  </button>
                )}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </form>
      {showModal && (
        <FileUploadDokKirimPenawaran
          close={handleCloseModal}
          Id={data.checklist?.teknis?.[selectedTeknisIndex]?.dok_id_attachment}
        />
      )}
      {showModalHarga && (
        <FileUploadDokKirimPenawaran
          close={handleCloseModalHarga}
          Id={data.checklist?.harga?.[selectedHargaIndex]?.dok_id_attachment}
        />
      )}
    </>
  );
};

export default FormKirimPenawaran;
