import React, { Fragment, useEffect, useState } from 'react';
import { InputForm, TextAreaForm } from '../Elements/Input';
import Button from '../Elements/Button';
import { penyediaService } from '../../services/penyedia.service';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { SkeletonItem } from '../Elements/Skelekton';
import { alamat } from '../../services/alamat.service';
import { Combobox, Transition } from '@headlessui/react';
import { AiFillCaretDown } from 'react-icons/ai';

const FormPeyediaEdit = () => {
  const [datas, setDatas] = useState({});
  const { provinsi, kota } = alamat();
  const { btkUsaha, editPenyedia, updatePenyedia } = penyediaService();
  const [bentukUsaha, setBentukUsaha] = useState([]);
  const [alamatData, setAlamatData] = useState({
    provinsi: [],
    kota: [],
  });
  const { penyediaId } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedProv, setSelectedProv] = useState(null);
  const [isSelectedProv, setIsSelectedProv] = useState(false);

  const initialValues = {
    btu_id: '',
    rkn_namauser: '',
    rkn_nama: '',
    rkn_alamat: '',
    rkn_kodepos: '',
    rkn_prop: '',
    rkn_kota: '',
    rkn_npwp: '',
    rkn_email: '',
    rkn_pkp: '',
    rkn_telepon: '',
    rkn_isactive: '',
    rkn_status: '',
    rkn_status_verifikasi: '',
  };

  const validation = Yup.object({
    btu_id: Yup.string().required('Pilih salah satu'),
    rkn_namauser: Yup.string().required('User-ID harus diisi'),
    rkn_nama: Yup.string().required('Nama Perusahaan harus diisi'),
    rkn_alamat: Yup.string().required('Alamat Perusahaan harus diisi'),
    rkn_kodepos: Yup.string().required('KodePos harus diisi'),
    rkn_prop: Yup.string().required('Pilih salah satu'),
    rkn_kota: Yup.string().required('Pilih salah satu'),
    rkn_email: Yup.string()
      .required('Email harus diisi')
      .email('Format e-mail tidak valid'),
    rkn_pkp: Yup.string().required('PKP harus diisi'),
    rkn_telepon: Yup.string().required('Telepon harus diisi'),
    rkn_npwp: Yup.string()
      .matches(
        /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\.?[0-9]{1}-?[0-9]{3}\.?[0-9]{3}$/,
        'NPWP tidak valid'
      )
      .required('NPWP harus diisi'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updatePenyedia(penyediaId, values);
      toastsuccess('Update Sukses');
      navigate('/daftar-penyedia');
    } catch (error) {
      toasterror(error.message);
    } finally {
      setSubmitting(false);
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
        const response = await btkUsaha();
        const result = response.data;
        setBentukUsaha(result);
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataBtkUsaha();
  }, []);

  useEffect(() => {
    const fetchDataProv = async () => {
      try {
        const dataProvinsi = await provinsi();
        setAlamatData((prevAlamatData) => ({
          ...prevAlamatData,
          provinsi: dataProvinsi,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataProv();
  }, []);

  useEffect(() => {
    const fetchDataKota = async () => {
      if (selectedProv) {
        try {
          const dataKota = await kota(selectedProv);
          setAlamatData((prevAlamatData) => ({
            ...prevAlamatData,
            kota: dataKota,
          }));
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchDataKota();
  }, [selectedProv]);

  const filteredProv =
    query === ''
      ? alamatData.provinsi
      : alamatData.provinsi.filter((prov) => {
          return prov.name.toLowerCase().includes(query.toLowerCase());
        });

  const filteredkota =
    query === ''
      ? alamatData.kota
      : alamatData.kota.filter((kota) => {
          return kota.name.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await editPenyedia(penyediaId);
        const dataPenyedia = response.user;
        setDatas(dataPenyedia);
        setLoading(false);
      } catch (error) {
        toasterror(error.message);
      }
    };
    fetchData();
  }, [penyediaId]);

  useEffect(() => {
    formik.setValues({
      btu_id: datas.btu_id || '',
      rkn_namauser: datas.rkn_namauser || '',
      rkn_nama: datas.rkn_nama || '',
      rkn_alamat: datas.rkn_alamat || '',
      rkn_kodepos: datas.rkn_kodepos || '',
      rkn_prop: datas.rkn_prop || '',
      rkn_kota: datas.rkn_kota || '',
      rkn_npwp: datas.rkn_npwp || '',
      rkn_email: datas.rkn_email || '',
      rkn_pkp: datas.rkn_pkp || '',
      rkn_telepon: datas.rkn_telepon || '',
      rkn_isactive: datas.rkn_isactive || '',
      rkn_status: datas.rkn_status || '',
      rkn_status_verifikasi: datas.rkn_status_verifikasi || '',
    });
  }, [datas]);

  const handleVerifikasi = (values, setValues) => {
    setValues({
      ...values,
      rkn_status: '1',
      rkn_status_verifikasi: 'verif',
    });
  };

  const handleNonAktifkan = (values, setValues) => {
    setValues({
      ...values,
      rkn_isactive: '0',
      rkn_status_verifikasi: 'verif',
    });
  };

  const handleAktifkan = (values, setValues) => {
    setValues({
      ...values,
      rkn_isactive: '1',
      rkn_status_verifikasi: 'verif',
    });
  };

  const renderStatus = () => {
    const verif =
      formik.values.rkn_isactive === '1' &&
      formik.values.rkn_status === '1' &&
      formik.values.rkn_status_verifikasi === 'verif';
    const nonVerif = formik.values.rkn_status_verifikasi === 'non';
    const nonAktif = formik.values.rkn_isactive === '0';

    switch (true) {
      case verif:
        return (
          <div>
            <Button
              type="button"
              cN="btn bg-red-500 text-white  hover:bg-red-600 ease-in duration-200"
              onClick={() => handleNonAktifkan(formik.values, formik.setValues)}
            >
              Non-Aktifkan
            </Button>
          </div>
        );

      case nonVerif:
        return (
          <div className="flex gap-4">
            <Button
              cN="btn bg-green-500 text-white  hover:bg-green-600 ease-in duration-200"
              type="button"
              onClick={() => handleVerifikasi(formik.values, formik.setValues)}
            >
              Verifikasi
            </Button>
            <Button
              type="button"
              cN="btn bg-red-500 text-white  hover:bg-red-600 ease-in duration-200"
              onClick={() => handleNonAktifkan(formik.values, formik.setValues)}
            >
              Non-Aktifkan
            </Button>
          </div>
        );

      case nonAktif:
        return (
          <div className="flex gap-4">
            <Button
              type="button"
              cN="btn bg-blue-500 text-white  hover:bg-blue-600 ease-in duration-200"
              onClick={() => handleAktifkan(formik.values, formik.setValues)}
            >
              Aktifkan
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return loading ? (
    <>
      <SkeletonItem itemCount={1} cN="bg-gray-200 h-6 w-1/4" />
      <div className="py-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
        <SkeletonItem itemCount={10} cN="bg-gray-200 h-8" />
      </div>
    </>
  ) : (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-6">
        <label className="text-sm font-semibold capitalize ">
          Pilih Bentuk Usaha
        </label>
        <select
          className={`w-full mt-2 p-1 px-3 text-gray-700 bg-white border ${
            formik.errors.btu_id
              ? 'border-red-500 focus:ring-red-600'
              : 'border-gray-300  focus:ring-sky-600'
          } rounded-md shadow-sm focus:outline-none focus:ring-2  focus:border-transparent`}
          {...formik.getFieldProps('btu_id')}
        >
          <option value="" disabled hidden>
            Pilih Salah Satu Bentuk Usaha
          </option>
          {loading ? (
            <option value="" disabled>
              Loading...
            </option>
          ) : (
            bentukUsaha.map((option) => (
              <option key={option.btu_id} value={option.btu_id}>
                {option.btu_nama}
              </option>
            ))
          )}
        </select>
        {formik.errors.btu_id && (
          <p className="mt-2 text-sm italic text-red-500">
            {formik.errors.btu_id}
          </p>
        )}
      </div>
      <div className="mb-6">
        <label className="mb-4 text-sm font-semibold capitalize ">
          User ID
        </label>
        <input
          className="w-full p-1 px-3 mt-2 text-gray-400 bg-white border rounded-md shadow-sm appearance-none focus:ring-sky-600 focus:outline-none focus:ring-2 focus:border-transparent"
          {...formik.getFieldProps('rkn_namauser')}
          disabled
        />
      </div>

      <InputForm
        label="Nama Perusahaan"
        type="text"
        {...formik.getFieldProps('rkn_nama')}
        disabled
        error={formik.touched.rkn_nama && formik.errors.rkn_nama}
      />
      <InputForm
        label="E-mail"
        type="email"
        {...formik.getFieldProps('rkn_email')}
        error={formik.touched.rkn_email && formik.errors.rkn_email}
      />
      <InputForm
        label="No. Telepon"
        type="text"
        {...formik.getFieldProps('rkn_telepon')}
        error={formik.touched.rkn_telepon && formik.errors.rkn_telepon}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <InputForm
          label="NPWP"
          type="text"
          {...formik.getFieldProps('rkn_npwp')}
          error={formik.touched.rkn_npwp && formik.errors.rkn_npwp}
        />
        <InputForm
          label="No PKP"
          type="text"
          {...formik.getFieldProps('rkn_pkp')}
          error={formik.touched.rkn_pkp && formik.errors.rkn_pkp}
        />

        <InputForm
          label="Kode Pos"
          type="text"
          {...formik.getFieldProps('rkn_kodepos')}
          error={formik.touched.rkn_kodepos && formik.errors.rkn_kodepos}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="mb-6">
          <p className="mb-3 text-sm font-semibold capitalize ">
            Pilih Provinsi
          </p>
          <Combobox
            onChange={(value) => {
              formik.setFieldValue('rkn_prop', value.name);
              setSelectedProv(value.id);
              setIsSelectedProv(true);
              formik.setFieldValue('rkn_kota', '');
            }}
            value={formik.values.rkn_prop}
          >
            <div className="relative mt-1">
              <div className="relative w-full">
                <Combobox.Input
                  className={`w-full p-1 px-3 text-gray-700 bg-white border ${
                    formik.touched.rkn_prop && formik.errors.rkn_prop
                      ? 'border-red-500 focus:ring-red-600'
                      : 'border-gray-300  focus:ring-sky-600'
                  } rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2  focus:border-transparent`}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Pilih Propinsi"
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
                  {filteredProv.length === 0 && query !== '' ? (
                    <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                      Nothing found.
                    </div>
                  ) : (
                    filteredProv.map((prov) => (
                      <Combobox.Option
                        key={prov.id}
                        value={prov}
                        className="cursor-pointer"
                      >
                        {prov.name}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
            {formik.touched.rkn_prop && formik.errors.rkn_prop && (
              <p className="mt-2 text-sm italic text-red-500">
                {formik.errors.rkn_prop}
              </p>
            )}
          </Combobox>
        </div>
        <div className="mb-6">
          <p className="mb-3 text-sm font-semibold capitalize ">
            Pilih Kota/Kabupaten
          </p>
          <Combobox
            onChange={(value) => {
              formik.setFieldValue('rkn_kota', value);
            }}
            value={formik.values.rkn_kota}
            disabled={!isSelectedProv}
          >
            <div className="relative mt-1">
              <div className="relative w-full">
                <Combobox.Input
                  className={`w-full p-1 px-3 text-gray-700 bg-white border ${
                    formik.touched.rkn_kota && formik.errors.rkn_kota
                      ? 'border-red-500 focus:ring-red-600'
                      : 'border-gray-300  focus:ring-sky-600'
                  } rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2  focus:border-transparent`}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Pilih Kota"
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
                  {filteredkota.length === 0 && query !== '' ? (
                    <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                      Nothing found.
                    </div>
                  ) : (
                    filteredkota.map((prov) => (
                      <Combobox.Option
                        key={prov.id}
                        value={prov.name}
                        className="cursor-pointer"
                      >
                        {prov.name}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          {formik.touched.rkn_kota && formik.errors.rkn_kota && (
            <p className="mt-2 text-sm italic text-red-500">
              {formik.errors.rkn_kota}
            </p>
          )}
        </div>
      </div>
      <TextAreaForm
        label="Alamat"
        {...formik.getFieldProps('rkn_alamat')}
        error={formik.touched.rkn_alamat && formik.errors.rkn_alamat}
      />

      <div className="flex gap-4">
        <Button
          cN={`btn bg-sky-500 text-white  hover:bg-blue-600 ease-in duration-200 ${
            formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={formik.isSubmitting}
        >
          Update
        </Button>
        {renderStatus()}
      </div>
    </form>
  );
};

export default FormPeyediaEdit;
