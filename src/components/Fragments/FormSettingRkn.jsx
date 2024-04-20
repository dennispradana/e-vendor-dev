import React, { Fragment, useEffect, useState } from 'react';
import { InputForm, TextAreaForm } from '../Elements/Input';
import Button from '../Elements/Button';
import { penyediaService } from '../../services/penyedia.service';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toasterror, toastsuccess } from '../../utils/ToastMessage';
import { SkeletonItem } from '../Elements/Skelekton';
import { alamat } from '../../services/alamat.service';
import { Combobox, Transition } from '@headlessui/react';
import { AiFillCaretDown } from 'react-icons/ai';
import { useAuthContext } from '../../contexts/AuthContext';
import { userProfile } from '../../services/profile.service';
import Modal from '../Elements/Modal';

const FormSettingRkn = () => {
  const { user } = useAuthContext();
  const [dataUser, setDataUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getProfilePenyedia, updateProfilePenyedia } = userProfile();
  const { provinsi, kota } = alamat();
  const { btkUsaha } = penyediaService();
  const [bentukUsaha, setBentukUsaha] = useState([]);
  const [alamatData, setAlamatData] = useState({
    provinsi: [],
    kota: [],
  });
  const [query, setQuery] = useState('');
  const [selectedProv, setSelectedProv] = useState(null);
  const [isSelectedProv, setIsSelectedProv] = useState(false);
  const navigate = useNavigate();

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
    rkn_mobile_phone: '',
  };

  const validation = Yup.object({
    btu_id: Yup.string().required('Pilih salah satu'),
    rkn_namauser: Yup.string().required('User-ID harus diisi'),
    rkn_nama: Yup.string().required('Nama Perusahaan harus diisi'),
    rkn_alamat: Yup.string().required('Alamat Perusahaan harus diisi'),
    rkn_prop: Yup.string().required('Pilih salah satu'),
    rkn_kota: Yup.string().required('Pilih salah satu'),
    rkn_email: Yup.string()
      .required('Email harus diisi')
      .email('Format e-mail tidak valid'),
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
      const updateValues = { ...values, rkn_status_verifikasi: 'non' };
      await updateProfilePenyedia(user.user_id, updateValues);
      toastsuccess('Update Sukses');
      navigate('/dashboard');
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
        const response = await getProfilePenyedia(user.user_id);
        setDataUser(response.user);
        setLoading(false);
      } catch (error) {
        toasterror(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    formik.setValues({
      btu_id: dataUser.btu_id || '',
      rkn_namauser: dataUser.rkn_namauser || '',
      rkn_nama: dataUser.rkn_nama || '',
      rkn_alamat: dataUser.rkn_alamat || '',
      rkn_kodepos: dataUser.rkn_kodepos || '',
      rkn_prop: dataUser.rkn_prop || '',
      rkn_kota: dataUser.rkn_kota || '',
      rkn_npwp: dataUser.rkn_npwp || '',
      rkn_email: dataUser.rkn_email || '',
      rkn_pkp: dataUser.rkn_pkp || '',
      rkn_telepon: dataUser.rkn_telepon || '',
      rkn_isactive: dataUser.rkn_isactive || '',
      rkn_status: dataUser.rkn_status || '',
      rkn_status_verifikasi: dataUser.rkn_status_verifikasi || '',
      rkn_mobile_phone: dataUser.rkn_mobile_phone || '',
    });
  }, [dataUser]);
  const formatNpwp = (value) => {
    if (typeof value === 'string') {
      return value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})/,
        '$1.$2.$3.$4-$5.$6'
      );
    }
    return value;
  };

  const handleNPWPChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatNpwp(rawValue);
    formik.setFieldValue('rkn_npwp', formattedValue);
  };

  const handleBack = () => {
    history.back();
    setIsModalOpen(false);
  };

  const handleContinue = () => {
    setIsModalOpen(false);
  };

  return loading ? (
    <>
      <SkeletonItem itemCount={1} cN="bg-gray-200 h-6 w-1/4" />
      <div className="py-10 shadow-xl rounded-xl backdrop-blur-sm bg-white/60 page-padding">
        <SkeletonItem itemCount={10} cN="bg-gray-200 h-8" />
      </div>
    </>
  ) : (
    <>
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
        <InputForm
          label="No. Handphone"
          type="text"
          {...formik.getFieldProps('rkn_mobile_phone')}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <InputForm
            label="NPWP"
            type="text"
            {...formik.getFieldProps('rkn_npwp')}
            onChange={handleNPWPChange}
            error={formik.touched.rkn_npwp && formik.errors.rkn_npwp}
          />
          <InputForm
            label="No PKP"
            type="text"
            {...formik.getFieldProps('rkn_pkp')}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
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
          <InputForm
            label="Kode Pos"
            type="text"
            {...formik.getFieldProps('rkn_kodepos')}
            error={formik.touched.rkn_kodepos && formik.errors.rkn_kodepos}
          />
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
            Simpan
          </Button>
          <Button
            cN={`btn bg-red-500 text-white  hover:bg-red-600 ease-in duration-200 ${
              formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="button"
            disabled={formik.isSubmitting}
            onClick={() => setIsModalOpen(true)}
          >
            kembali
          </Button>
        </div>
      </form>
      {isModalOpen && (
        <Modal
          onBack={handleBack}
          onContinue={handleContinue}
          modalText=" Perbuahan belum tersimpan"
          onBackText="keluar"
          onContinueText="lanjutkan"
          showBackButton={true}
          showContinueButton={true}
        />
      )}
    </>
  );
};

export default FormSettingRkn;
