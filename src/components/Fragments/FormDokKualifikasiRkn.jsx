import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { penyediaService } from '../../services/penyedia.service';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { useNavigate, useParams } from 'react-router-dom';
import { formatRp } from '../../utils/formatRupiah';
import TabIzinUsaha from './TabIzinUsaha';
import TabAkta from './TabAkta';
import TabManajerial from './TabManajerial';
import TabTenagaAhli from './TabTenagaAhli';
import TabPengalaman from './TabPengalaman';
import TabPeralatan from './TabPeralatan';
import TabPajak from './TabPajak';
import Spinner from '../Elements/Spinner';
import { useFormik } from 'formik';
import { FileUploadDokKualifikasi } from '../Elements/Modal/fileUpload';

const initialState = {
  data: [],
  izinUsaha: [],
  landasanHukum: [],
  manajerial: [],
  pajak: [],
  pengalaman: [],
  peralatan: [],
  lainya: '',
};

const FormDokKualifikasiRkn = () => {
  const { llsId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const { getDokKualifikasi, updateDokKualifikasi } = penyediaService();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(initialState);
  const { data } = state;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [dokIdAttachment, setDokIdAttachment] = useState('');

  const fetchData = async () => {
    try {
      const response = await getDokKualifikasi(llsId);
      setState((prev) => ({
        ...prev,
        data: response.data,
      }));
    } catch (error) {
      toasterror(error.message);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    izinusaha: data.izinusaha?.map((item) => ({
      ius_id: item.ius_id || '',
    })),
    landasanhukum: data.landasanhukum?.map((item) => ({
      lhkp_id: item.lhkp_id || '',
    })),
    manajerial: data.manajerial?.map((item) => ({
      id_manajerial: item.id_manajerial || '',
    })),
    stafahli: data.stafahli?.map((item) => ({
      stp_id: item.stp_id || '',
    })),
    pengalaman: data.pengalaman?.map((item) => ({
      pen_id: item.pen_id || '',
    })),
    peralatan: data.peralatan?.map((item) => ({
      id_prl: item.id_prl || '',
    })),
    pajak: data.pajak?.map((item) => ({
      pjk_id: item.pjk_id || '',
    })),
    lainya: data.lainya?.dok_id_attachment || '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateDokKualifikasi(llsId, values);
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
      izinusaha: data.izinusaha?.map((item) => ({
        ius_id: item.ius_id || '',
      })),
      landasanhukum: data.landasanhukum?.map((item) => ({
        lhkp_id: item.lhkp_id || '',
      })),
      manajerial: data.manajerial?.map((item) => ({
        id_manajerial: item.id_manajerial || '',
      })),
      stafahli: data.stafahli?.map((item) => ({
        stp_id: item.stp_id || '',
      })),
      pengalaman: data.pengalaman?.map((item) => ({
        pen_id: item.pen_id || '',
      })),
      peralatan: data.peralatan?.map((item) => ({
        id_prl: item.id_prl || '',
      })),
      pajak: data.pajak?.map((item) => ({
        pjk_id: item.pjk_id || '',
      })),
      lainya: data.lainya?.dok_id_attachment || '',
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
        if (currentStep === 7) {
          navigate(`/penawaran/${llsId}`);
          toastsuccess('Berhasil Menyimpan Data');
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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = (dokIdAttachment) => {
    setShowModal(false);
    setDokIdAttachment(dokIdAttachment);
    formik.setFieldValue('lainya.dok_id_attachment', dokIdAttachment);
  };

  const renderFormContent = () => {
    switch (currentStep) {
      case 0:
        return <TabIzinUsaha type="form" formik={formik} />;
      case 1:
        return <TabAkta type="form" formik={formik} />;
      case 2:
        return <TabManajerial type="form" formik={formik} />;
      case 3:
        return <TabTenagaAhli type="form" formik={formik} />;
      case 4:
        return <TabPengalaman type="form" formik={formik} />;
      case 5:
        return <TabPeralatan type="form" formik={formik} />;
      case 6:
        return <TabPajak type="form" formik={formik} />;
      case 7:
        return (
          <div className="my-10">
            <button
              type="button"
              onClick={handleOpenModal}
              className="w-full py-2 font-bold text-white duration-200 ease-in rounded-lg bg-violet-400 hover:bg-violet-500"
            >
              Upload File
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const RenderDataLelang = () => {
    return (
      <table className="w-full mb-10 text-sm text-left border border-collapse">
        <tbody>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">Kode Paket</th>
            <td className="px-4 py-2 border-b">{data.lelang?.lls_id}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">Nama Paket</th>
            <td className="px-4 py-2 border-b">{data.lelang?.pkt_nama}</td>
          </tr>
          <tr>
            <th className="w-1/4 px-4 py-2 border-b border-r">Nilai HPS</th>
            <td className="px-4 py-2 border-b">
              {formatRp(data.lelang?.pkt_hps)}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return loading ? (
    <div className="flex items-center justify-center h-[70vh]">
      <Spinner />
    </div>
  ) : (
    <>
      <form onSubmit={formik.handleSubmit} className="mb-10">
        <RenderDataLelang />
        <Tabs
          selectedIndex={currentStep}
          onSelect={(index) => setCurrentStep(index)}
          selectedTabClassName="bg-violet-600 text-white rounded-t"
        >
          <TabList>
            {[
              'Izin Usaha',
              'Akta',
              'Manajerial',
              'Tenaga Ahli',
              'Pengalaman',
              'Peralatan',
              'Pajak',
              'Kualifikasi Lainya',
            ].map((title, index) => (
              <Tab key={index}>{title}</Tab>
            ))}
          </TabList>
          {Array.from({ length: 8 }, (_, index) => (
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
                {currentStep <= 7 && (
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
                    ) : currentStep === 7 ? (
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
        <FileUploadDokKualifikasi
          close={handleCloseModal}
          Id={
            data.lainya?.dok_id_attachment
              ? data.lainya?.dok_id_attachment
              : dokIdAttachment
          }
        />
      )}
    </>
  );
};

export default FormDokKualifikasiRkn;
