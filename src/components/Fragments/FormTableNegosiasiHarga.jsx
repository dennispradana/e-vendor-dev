import React, { useEffect, useState } from 'react';
import { formatRp } from '../../utils/formatRupiah';

const FormTableNegosiasiHarga = ({ dataHarga, formik }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataHarga && dataHarga.negosiasi && dataHarga.negosiasi.nev_dkh) {
      const newData = dataHarga.negosiasi.nev_dkh.map((row) => ({
        ...row,
        vol: row.vol || '',
        harga: row.harga || '',
        pajak: row.pajak || '',
        total_harga: row.total_harga || '',
        keterangan: row.keterangan || '',
      }));
      setData(newData);
    } else {
      const newData = dataHarga.peserta?.psr_dkh.map((row) => ({
        ...row,
        vol: row.vol || '',
        harga: row.harga || '',
        pajak: row.pajak || '',
        total_harga: row.total_harga || '',
        keterangan: row.keterangan || '',
      }));
      setData(newData);
    }
  }, [dataHarga]);

  const totalHarga = (vol, harga, pajak) => {
    const total = harga * vol + (harga * vol * pajak) / 100;
    if (isNaN(total)) {
      return 0;
    }
    return total;
  };

  const jumlahTotal = () => {
    const total = data.reduce(
      (total, row) => total + parseFloat(row.total_harga || 0),
      0
    );
    return total;
  };

  const handleChange = (rowIndex, field, value) => {
    const newData = [...data];
    newData[rowIndex][field] = value;

    if (field === 'vol' || field === 'harga' || field === 'pajak') {
      const vol = parseFloat(newData[rowIndex].vol) || 0;
      const harga = parseFloat(newData[rowIndex].harga) || 0;
      const pajak = parseFloat(newData[rowIndex].pajak);

      newData[rowIndex].total_harga = isNaN(totalHarga(vol, harga, pajak))
        ? ''
        : totalHarga(vol, harga, pajak);
    }
    const total = jumlahTotal();
    setData(newData);
    const filteredData = newData.filter(
      (row) =>
        row.total_harga !== null &&
        row.total_harga !== '' &&
        row.total_harga !== 0
    );
    formik.setFieldValue('negosiasi.nev_dkh', filteredData);
    formik.setFieldValue('negosiasi.nev_harga', total);
    formik.setFieldValue('negosiasi.nev_harga_negosiasi', total);
  };
  return (
    <div className="relative my-6 overflow-x-auto">
      <table className="w-full mb-6 text-xs text-left border border-collapse rounded-lg">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-2 text-center bg-gray-100 border"
            >
              Jenis Barang/Jasa
            </th>
            <th
              scope="col"
              className="w-[5rem] px-6 py-2 border bg-gray-100 text-center"
            >
              Satuan
            </th>
            <th
              scope="col"
              className="w-[5rem] px-6 py-2 border bg-gray-100 text-center"
            >
              Vol
            </th>
            <th
              scope="col"
              className="px-6 py-2 text-center bg-gray-100 border"
            >
              Harga/Biaya
            </th>
            <th
              scope="col"
              className="px-6 py-2 border w-[7rem] bg-gray-100 text-center"
            >
              Pajak (%)
            </th>
            <th
              scope="col"
              className="px-6 py-2 border w-[14rem] bg-gray-100 text-center"
            >
              Total
            </th>
            <th
              scope="col"
              className="px-6 py-2 text-center bg-gray-100 border"
            >
              Keterangan
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-4 py-2 border">
                <input
                  readOnly
                  type="text"
                  value={row.item}
                  className="w-full p-1 px-3 bg-white border rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                  onChange={(e) =>
                    handleChange(rowIndex, 'item', e.target.value)
                  }
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  readOnly
                  type="text"
                  value={row.unit}
                  className="w-full p-1 px-3 bg-white border rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                  onChange={(e) =>
                    handleChange(rowIndex, 'unit', e.target.value)
                  }
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="number"
                  value={row.vol}
                  className="w-full p-1 px-3 bg-white border rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent number-input"
                  onChange={(e) =>
                    handleChange(rowIndex, 'vol', parseFloat(e.target.value))
                  }
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="number"
                  value={row.harga || ''}
                  className="w-full p-1 px-3 bg-white border rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent number-input"
                  onChange={(e) =>
                    handleChange(rowIndex, 'harga', parseFloat(e.target.value))
                  }
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  readOnly
                  type="number"
                  className="w-full p-1 px-3 text-center bg-white border rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent number-input"
                  value={row.pajak}
                  onChange={(e) =>
                    handleChange(rowIndex, 'pajak', parseFloat(e.target.value))
                  }
                />
              </td>
              <td className="px-4 py-2 border">
                {formatRp(totalHarga(row.vol, row.harga, row.pajak))}
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="text"
                  value={row.keterangan || ''}
                  className="w-full p-1 px-3 bg-white border rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                  onChange={(e) =>
                    handleChange(rowIndex, 'keterangan', e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5" className="pr-2 font-bold text-right border">
              Total Harga:
            </td>
            <td colSpan="2" className="px-3 py-2 border">
              {formatRp(jumlahTotal())}
            </td>
          </tr>
        </tfoot>
      </table>
      <table className="w-full text-xs text-left border border-collapse rounded-lg">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-2 text-center bg-gray-100 border"
            >
              Harga Penawaran
            </th>
            <th
              scope="col"
              className="px-6 py-2 text-center bg-gray-100 border"
            >
              Harga Terkoreksi
            </th>
            <th
              scope="col"
              className="px-6 py-2 text-center bg-gray-100 border"
            >
              Harga Negosiasi
            </th>
            <th
              scope="col"
              className="px-6 py-2 text-center bg-gray-100 border"
            >
              Urutan
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 text-center border">
              {dataHarga.negosiasi?.nev_harga !== null
                ? formatRp(dataHarga.negosiasi?.nev_harga)
                : formatRp(dataHarga.peserta?.psr_harga)}
            </td>
            <td className="px-4 py-2 text-center border">
              {dataHarga.negosiasi?.nev_harga_terkoreksi !== null
                ? formatRp(dataHarga.negosiasi?.nev_harga_terkoreksi)
                : formatRp(dataHarga.peserta?.psr_harga_terkoreksi)}
            </td>
            <td className="px-4 py-2 border">
              <input
                type="number"
                {...formik.getFieldProps('negosiasi.nev_harga_negosiasi')}
                value={
                  formik.values.negosiasi.nev_harga_negosiasi !== undefined
                    ? formik.values.negosiasi.nev_harga_negosiasi
                    : ''
                }
                className="w-full p-1 px-3 bg-white border rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent number-input"
              />
            </td>
            <td className="px-4 py-2 border">
              <input
                type="number"
                {...formik.getFieldProps('negosiasi.nev_urutan')}
                value={
                  formik.values.negosiasi.nev_urutan !== undefined
                    ? formik.values.negosiasi.nev_urutan
                    : ''
                }
                className="w-full p-1 px-3 bg-white border rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent number-input"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FormTableNegosiasiHarga;
