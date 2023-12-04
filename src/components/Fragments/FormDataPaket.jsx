import React, { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { alamat } from '../../services/alamat.service';
import { AiFillCaretDown } from 'react-icons/ai';
import { toasterror } from '../../utils/ToastMessage';
import { formatRp } from '../../utils/formatRupiah';
import Spinner from '../Elements/Spinner';
import { BsFillTrashFill } from 'react-icons/bs';

const FormDataPaket = ({ modalUpdate, modalAdd, datas, loading, formik }) => {
  const { provinsi, kota } = alamat();
  const [query, setQuery] = useState('');
  const [selectedProv, setSelectedProv] = useState(null);
  const [isSelectedProv, setIsSelectedProv] = useState(false);
  const [alamatData, setAlamatData] = useState({
    provinsi: [],
    kota: [],
  });

  useEffect(() => {
    const fetchDataProv = async () => {
      try {
        const dataProvinsi = await provinsi();
        setAlamatData((prevAlamatData) => ({
          ...prevAlamatData,
          provinsi: dataProvinsi,
        }));
      } catch (error) {
        toasterror(error);
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
          toasterror(error);
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

  const handleAddAlamat = () => {
    formik.setFieldValue('lokasi', [
      ...formik.values.lokasi,
      { pkt_lokasi: '', prop: '', kota: '' },
    ]);
  };

  const handleDeleteAlamat = (index) => {
    const updatedLokasi = [...formik.values.lokasi];
    updatedLokasi.splice(index, 1);

    formik.setFieldValue('lokasi', updatedLokasi);
  };

  return loading ? (
    <div className="h-[60vh] flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <>
      <table className="w-full text-xs text-left border border-collapse">
        <tbody>
          <tr>
            <th className="px-4 py-2 border-b border-r">
              Rencana Umum Pengadaan
            </th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-xs text-left text-gray-500 border border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 py-2 bg-gray-100 border">Kode RUP</th>
                    <th className="px-6 py-2 bg-gray-100 border">Nama Paket</th>
                    <th className="px-6 py-2 bg-gray-100 border">
                      Sumber Dana
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.anggaran?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-2 py-2 border-r">{item.rup_id}</td>
                      <td className="px-2 py-2 border-r">{item.ang_nama}</td>
                      <td className="px-2 py-2 border-r">{item.sbd_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="p-2 mt-2 text-white capitalize bg-blue-500 rounded-md"
                  onClick={modalAdd}
                >
                  Tambah Rencana Pengadaan
                </button>
                <button
                  type="button"
                  className="p-2 mt-2 text-white capitalize bg-green-500 rounded-md"
                  onClick={modalUpdate}
                >
                  update Rencana Pengadaan
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b border-r">Anggaran</th>
            <td className="px-4 py-2 border-b">
              <table className="w-full text-xs text-left text-gray-500 border border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 py-2 bg-gray-100 border">Tahun</th>
                    <th className="px-6 py-2 bg-gray-100 border">
                      Sumber Dana
                    </th>
                    <th className="px-6 py-2 bg-gray-100 border">MAK</th>
                    <th className="px-6 py-2 bg-gray-100 border">Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.anggaran?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-2 py-2 border-r">{item.ang_tahun}</td>
                      <td className="px-2 py-2 border-r">{item.sbd_id}</td>
                      <td className="px-2 py-2 border-r">
                        {item.ang_koderekening}
                      </td>
                      <td className="px-2 py-2 border-r">
                        {formatRp(item.ang_nilai)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b border-r">Nama Paket</th>
            <td className="px-4 py-2 border-b">
              <textarea
                rows="4"
                className="w-full p-1 px-3 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                {...formik.getFieldProps('paket.pkt_nama')}
              />
              {formik.errors && (
                <p className="mt-2 text-sm italic text-red-500">
                  {formik.errors.paket?.pkt_nama}
                </p>
              )}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b border-r">Nilai Pagu Paket</th>
            <td className="px-4 py-2 border-b">
              {formatRp(datas.paket?.pkt_pagu)}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b border-r">Lokasi</th>
            <td className="w-5/6 px-4 py-2 border-b">
              <table className="w-full text-xs text-left text-gray-500 border border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 py-2 bg-gray-100 border">Provinsi</th>
                    <th className="px-6 py-2 bg-gray-100 border">Kab/Kota</th>
                    <th className="px-6 py-2 bg-gray-100 border">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {formik.values.lokasi?.map((lokasiItem, index) => (
                    <tr key={index}>
                      <td className="px-2 py-2 border-r">
                        <Combobox
                          onChange={(value) => {
                            formik.setFieldValue(
                              `lokasi[${index}].prop`,
                              value.name
                            );
                            setSelectedProv(value.id);
                            setIsSelectedProv(true);
                            formik.setFieldValue(`lokasi[${index}].kota`, '');
                          }}
                          value={lokasiItem.prop}
                        >
                          <div className="relative mt-1">
                            <div className="relative w-full">
                              <Combobox.Input
                                className={`w-full p-1 px-3 text-gray-700 bg-white border  rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2  focus:border-transparent`}
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                }
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
                              <Combobox.Options className="absolute z-10 w-full px-3 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                        </Combobox>
                      </td>
                      <td className="px-2 py-2 border-r">
                        <Combobox
                          onChange={(value) => {
                            formik.setFieldValue(
                              `lokasi[${index}].kota`,
                              value
                            );
                          }}
                          value={lokasiItem.kota}
                          disabled={!isSelectedProv}
                        >
                          <div className="relative mt-1">
                            <div className="relative w-full">
                              <Combobox.Input
                                className={`w-full p-1 px-3 text-gray-700 bg-white border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2  focus:border-transparent`}
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                }
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
                              <Combobox.Options className="absolute z-10 w-full px-3 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                      </td>
                      <td className="flex items-center gap-4 px-2 py-2 border-r">
                        <input
                          type="text"
                          className="w-full p-1 px-3 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                          {...formik.getFieldProps(
                            `lokasi[${index}].pkt_lokasi`
                          )}
                        />
                        {formik.values.lokasi.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteAlamat(index)}
                            className="text-red-500 cursor-pointer"
                          >
                            <BsFillTrashFill />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddAlamat}
                  className="p-2 mt-2 text-white bg-blue-500 rounded-md"
                >
                  Tambah lokasi
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FormDataPaket;
