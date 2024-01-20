import { useEffect, useState } from 'react';
import { toasterror, toastsuccess } from '../../../utils/ToastMessage';
import { FaFileDownload } from 'react-icons/fa';
import { fileService } from '../../../services/file.service';
import { SkeletonItem } from '../Skelekton';

export const Download = ({ data }) => {
  const { getFile, downloadFile } = fileService();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTableFile = async () => {
      try {
        const response = await getFile(data);
        setFiles(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getTableFile();
  }, []);

  const handleDownload = async (idContent, versi, fileName) => {
    try {
      const response = await downloadFile(idContent, versi);
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

  return loading ? (
    <>
      <SkeletonItem itemCount={1} cN="bg-gray-200 h-4 w-1/4" />
    </>
  ) : files.length === 0 ? (
    <p className="px-6 py-4 text-sm italic font-semibold">{error}</p>
  ) : (
    files.map((file, index) => (
      <div key={index}>
        <button
          onClick={() => {
            if (!downloading) {
              setDownloading(true);
              handleDownload(
                file.ctn_id_content,
                file.ctn_versi,
                JSON.parse(file.blb_path).name
              ).then(() => setDownloading(false));
            }
          }}
          className={`flex items-center px-4 mt-6 font-semibold text-sm text-blue-400 hover:text-blue-700 hover:underline gap-4 ${
            downloading ? 'cursor-not-allowed' : ''
          }`}
          disabled={downloading}
        >
          <FaFileDownload />
          {downloading ? 'Download....' : JSON.parse(file.blb_path).name}
        </button>
      </div>
    ))
  );
};
