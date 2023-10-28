import React, { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputForm, SelectForm } from '../Elements/Input';
import { penyediaService } from '../../services/penyedia.service';
import { toasterror } from '../../utils/ToastMessage';
import { AiFillCaretDown } from 'react-icons/ai';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import Spinner from '../Elements/Spinner';
import Button from '../Elements/Button';
import { IzinUsahaUpload } from '../Elements/Modal/fileUpload';

const options = [
  { value: 0, label: 'Tanggal' },
  { value: 1, label: 'Seumur Hidup' },
];

const optionsKualifikasi = [
  { value: 'Kecil', label: 'Kecil' },
  { value: 'Non-Kecil', label: 'Non-Kecil' },
];

const FormIzinUsaha = () => {
  const { jenisIzin } = penyediaService();
  const [jnsIzin, setJnsIzin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [showModal, setShowModal] = useState(false);

  const initialValues = {
    jni_nama: '',
    ius_no: '',
    status_berlaku: '',
    ius_berlaku: '',
    kls_id: '',
    ius_klasifikasi: '',
    ius_instansi: '',
    ius_id_attachment: '',
  };

  const validation = Yup.object({
    jni_nama: Yup.string().required('Pilih salah satu'),
    ius_no: Yup.string().required('Nomor surat harus diisi'),
    status_berlaku: Yup.string().required('Pilih salah satu'),
    ius_berlaku: Yup.date().test(
      'conditional-required',
      'Tanggal Berlaku harus diisi',
      function (value) {
        if (this.resolve(Yup.ref('status_berlaku')) === '0') {
          return !!value;
        }
        return true;
      }
    ),
    kls_id: Yup.string().required('Pilih salah satu'),
    ius_id_attachment: Yup.string().required('uploadFile terlebih dahulu'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const ius_klasifikasi = tags.join(', ');
      const dataToSend = {
        ...values,
        ius_klasifikasi,
      };
      console.log(dataToSend);
      formik.resetForm();
    } catch (error) {
      toasterror(error.message);
    } finally {
      setSubmitting(false);
      setTags([]);
      setIusIdAttachment('');
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const fetchDataBtkUsaha = async () => {
      try {
        const response = await jenisIzin();
        const result = response.data;
        setJnsIzin(result);
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataBtkUsaha();
  }, []);

  const filteredIzin =
    query === ''
      ? jnsIzin
      : jnsIzin.filter((izin) => {
          return izin.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return loading ? (
    <div className="flex items-center justify-center h-[70vh]">
      <Spinner />
    </div>
  ) : (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <p className="mb-3 text-sm font-semibold capitalize ">
            Pilih Jenis Usaha
          </p>
          <Combobox
            onChange={(value) => {
              formik.setFieldValue('jni_nama', value);
            }}
            value={formik.values.jni_nama}
          >
            <div className="relative mt-1">
              <div className="relative w-full">
                <Combobox.Input
                  className={`w-full p-1 px-3 text-gray-700 bg-white border ${
                    formik.touched.jni_nama && formik.errors.jni_nama
                      ? 'border-red-500 focus:ring-red-600'
                      : 'border-gray-300  focus:ring-sky-600'
                  } rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2  focus:border-transparent`}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Pilih Jenis Izin Usaha"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <AiFillCaretDown
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
              >
                <Combobox.Options className="absolute w-full px-3 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredIzin.length === 0 && query !== '' ? (
                    <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                      Nothing found.
                    </div>
                  ) : (
                    filteredIzin.map((izin, index) => (
                      <Combobox.Option
                        key={index}
                        value={izin.name}
                        className="cursor-pointer"
                      >
                        {izin.name}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
            {formik.touched.jni_nama && formik.errors.jni_nama && (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.jni_nama}
              </p>
            )}
          </Combobox>
        </div>
        <InputForm
          label="No Surat"
          type="text"
          {...formik.getFieldProps('ius_no')}
          error={formik.touched.ius_no && formik.errors.ius_no}
        />
        <div
          className={`grid ${
            formik.values.status_berlaku === '0' ? 'lg:grid-cols-2 gap-6' : ''
          }`}
        >
          <SelectForm
            label="status berlaku"
            {...formik.getFieldProps('status_berlaku')}
            options={options}
            error={
              formik.touched.status_berlaku && formik.errors.status_berlaku
            }
          />
          {formik.values.status_berlaku === '0' && (
            <InputForm
              label="Tanggal Berlaku"
              type="date"
              {...formik.getFieldProps('ius_berlaku')}
              error={formik.touched.ius_berlaku && formik.errors.ius_berlaku}
            />
          )}
        </div>
        <InputForm
          label="Instansi Pemberi"
          type="text"
          {...formik.getFieldProps('ius_instansi')}
          error={formik.touched.ius_instansi && formik.errors.ius_instansi}
        />

        <SelectForm
          label="Kualifikasi"
          {...formik.getFieldProps('kls_id')}
          options={optionsKualifikasi}
          error={formik.touched.kls_id && formik.errors.kls_id}
        />
        <div className="mb-6">
          <label className="mb-4 text-sm font-semibold capitalize">
            klasifikasi
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center px-3 py-1 text-sm rounded-full bg-sky-200 text-sky-700"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-red-500"
                >
                  <IoMdRemoveCircleOutline />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-2">
            <input
              type="text"
              name="ius_klasifikasi"
              className="w-[90%] p-1 px-3 text-gray-700 bg-white border-t border-b border-l border-gray-300 shadow-sm appearance-none focus:ring-sky-600 focus:outline-none focus:ring-2 focus:border-transparent rounded-l-md"
              placeholder="Add tags separated by commas"
              onChange={handleTagInputChange}
              value={tagInput}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="w-[10%] p-1 px-3 font-semibold text-white bg-violet-400 border-t border-b border-r border-violet-400 rounded-r-md hover:bg-violet-500"
            >
              Tambah
            </button>
          </div>
        </div>
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-white duration-200 ease-in btn bg-violet-400 hover:bg-violet-500"
          >
            Upload File
          </button>
        </div>

        {formik.errors.ius_id_attachment && (
          <p className="mt-2 text-sm italic text-red-500">
            {formik.errors.ius_id_attachment}
          </p>
        )}
        <div className="flex gap-4 mt-20">
          <Button
            cN={`btn bg-sky-500 text-white hover:bg-blue-600 ease-in duration-200 ${
              formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={formik.isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
      {showModal && <IzinUsahaUpload close={() => setShowModal(false)} />}
    </>
  );
};

export default FormIzinUsaha;
