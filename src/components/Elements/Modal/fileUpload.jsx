import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../Button';
import Spinner from '../Spinner';
import { fileService } from '../../../services/file.service';
import { toasterror, toastsuccess } from '../../../utils/ToastMessage';
import { BsFillTrashFill } from 'react-icons/bs';

export const IzinUsahaUpload = ({ close }) => {
  const { postIzinFile, getIzinFile, downloadIzinFile, deleteizinFile } =
    fileService();
  const [idContent, setIdContent] = useState('');
  const [files, setFiles] = useState([]);
  const [uploadCount, setUploadCount] = useState(0);
  const fileInputRef = useRef();

  const initialValues = {
    file: null,
    id_content: idContent,
  };

  const validationSchema = Yup.object({
    file: Yup.mixed()
      .required('File is required')
      .test('fileType', 'File type not supported', (value) => {
        if (value) {
          const supportedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ];
          const fileType = value.type;
          return supportedTypes.includes(fileType);
        }
        return true;
      }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const newValue = { ...values, id_content: idContent };
      const response = await postIzinFile(newValue);
      if (response) {
        setIdContent(response.ctn_id_content);
        toastsuccess('file berhasil diUpload');
        fileInputRef.current.value = null;
        formik.resetForm();
        setUploadCount(uploadCount + 1);
      }
    } catch (error) {
      toasterror(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const getTableFile = async () => {
      const response = await getIzinFile(idContent);
      setFiles(response);
    };
    getTableFile();
  }, [idContent, uploadCount]);

  const handleDownload = async (idContent, versi, fileName) => {
    try {
      const response = await downloadIzinFile(idContent, versi);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      if (response.status === 200) {
        toastsuccess('File Berhasil Diunduh');
      } else {
        toasterror('Gagal mengunduh file');
      }
    } catch (error) {
      toasterror(error.message);
    }
  };

  const handleDelete = async (idContent, versi) => {
    try {
      const response = await deleteizinFile(idContent, versi);
      if (response.status === 201) {
        setFiles((prevFiles) =>
          prevFiles.filter(
            (file) =>
              file.ctn_id_content !== idContent || file.ctn_versi !== versi
          )
        );
        toastsuccess(response.data);
      } else {
        toasterror(response.data);
      }
    } catch (error) {
      toasterror(error.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[70vw] mx-auto my-6 ">
          <div className="relative flex flex-col w-full px-3 py-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <form onSubmit={formik.handleSubmit} className="px-4">
              <div className="mb-4">
                <label className="block text-gray-600">
                  Pilih file untuk diunggah:
                </label>
                <input
                  type="file"
                  name="file"
                  accept=".pdf, .doc, .docx, .xlsx"
                  ref={fileInputRef}
                  onChange={(event) => {
                    formik.setFieldValue('file', event.currentTarget.files[0]);
                  }}
                />
              </div>
              <div className="my-2 text-sm text-center text-red-500 capitalize">
                {formik.errors.file && formik.touched.file ? (
                  <p>{formik.errors.file}</p>
                ) : null}
              </div>

              <Button
                cN={`btn bg-blue-600 text-white hover:bg-blue-800 ease-in duration-200 ${
                  formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? <Spinner /> : 'upload'}
              </Button>
            </form>
            <div className="relative flex flex-col h-[60vh] overflow-x-auto rounded-lg px-6 py-8">
              <div className="flex-grow">
                <table className="w-full text-sm text-left text-gray-600 md:text-base">
                  <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
                    <tr
                      role="row"
                      className="text-center border border-gray-200"
                    >
                      <th className="px-4 py-3 border border-gray-200">No</th>
                      <th className="px-4 py-3 border border-gray-200">
                        Nama File
                      </th>
                      <th className="px-4 py-3 border border-gray-200">
                        Tanggal Upload
                      </th>
                      <th className="px-4 py-3 border border-gray-200">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="overflow-y-auto ">
                    {files.length === 0 ? (
                      <tr className="capitalize bg-gray-200 border-b">
                        <td
                          colSpan="4"
                          className="px-6 py-4 italic font-semibold text-center"
                        >
                          belum ada file yang di Upload
                        </td>
                      </tr>
                    ) : (
                      files.map((file, index) => (
                        <tr
                          key={index}
                          className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                        >
                          <th
                            scope="row"
                            className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                          >
                            {index + 1}
                          </th>
                          <td className="px-4 py-4">
                            <button
                              onClick={() =>
                                handleDownload(
                                  file.ctn_id_content,
                                  file.ctn_versi,
                                  JSON.parse(file.blb_path).name
                                )
                              }
                              className="font-semibold hover:text-blue-500 hover:underline"
                            >
                              {JSON.parse(file.blb_path).name}
                            </button>
                          </td>
                          <td className="px-3 py-4 text-center">
                            {file.blb_date_time}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => {
                                handleDelete(
                                  file.ctn_id_content,
                                  file.ctn_versi
                                );
                              }}
                              className="mr-2 font-semibold text-blue-500 hover:text-red-500"
                            >
                              <BsFillTrashFill size="1.2rem" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <button
              onClick={close}
              className="p-3 font-bold text-red-500 border-b border-solid rounded-md rounded-t hover:text-red-600 border-slate-200"
              type="button"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </>
  );
};
