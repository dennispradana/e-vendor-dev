import React, { useEffect, useRef, useState } from 'react';
import { formatRp } from '../../utils/formatRupiah';
import * as XLSX from 'xlsx';

const FormHPS = ({ formik, dataPaket }) => {
  const initialData = Array.from({ length: 5 }, () => ({
    item: '',
    unit: '',
    vol: '',
    harga: '',
    pajak: 11,
    total_harga: '',
    keterangan: '',
  }));
  const [data, setData] = useState(initialData);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (
      dataPaket &&
      dataPaket.dok_persiapan &&
      dataPaket.dok_persiapan.dp_dkh
    ) {
      setData(dataPaket.dok_persiapan.dp_dkh);
    }
  }, [dataPaket]);

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
    formik.setFieldValue('dok_persiapan.dp_dkh', filteredData);
    formik.setFieldValue('paket.pkt_hps', total);
  };

  const handleExcelImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const importedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const dataRows = importedData.slice(1);

      const newRows = dataRows.map((row) => ({
        item: row[0] || '',
        unit: row[1] || '',
        vol: parseFloat(row[2]) || 1,
        harga: parseFloat(row[3]) || 0,
        pajak: parseFloat(row[4]) || 11,
        total_harga: totalHarga(
          parseFloat(row[2]) || 1,
          parseFloat(row[3]) || 0,
          parseFloat(row[4]) || 11
        ),
        keterangan: row[5] || '',
      }));

      const jumlahTotal = newRows.reduce(
        (sum, row) => sum + row.total_harga,
        0
      );

      setData(newRows);
      formik.setFieldValue('dok_persiapan.dp_dkh', newRows);
      formik.setFieldValue('paket.pkt_hps', jumlahTotal);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <button className="py-6" type="button">
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleExcelImport}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-slate-50 hover:file:bg-blue-700 bg-gray-50"
        />
      </button>
      <div className="relative overflow-x-auto">
        <table className="w-full text-xs text-left border border-collapse rounded-lg">
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
                    value={row.harga}
                    className="w-full p-1 px-3 bg-white border rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent number-input"
                    onChange={(e) =>
                      handleChange(
                        rowIndex,
                        'harga',
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    className="w-full p-1 px-3 text-center bg-white border rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent number-input"
                    value={row.pajak}
                    onChange={(e) =>
                      handleChange(
                        rowIndex,
                        'pajak',
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </td>
                <td className="px-4 py-2 border">
                  {formatRp(totalHarga(row.vol, row.harga, row.pajak))}
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    value={row.keterangan}
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
        {formik.errors.paket?.pkt_hps && (
          <p className="mt-2 text-sm italic text-red-500 ">
            {formik.errors.paket.pkt_hps}
          </p>
        )}
      </div>
    </>
  );
};

export default FormHPS;
