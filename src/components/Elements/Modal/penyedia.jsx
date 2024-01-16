import { useEffect, useState } from 'react';
import { toasterror, toastsuccess } from '../../../utils/ToastMessage';
import { penyediaService } from '../../../services/penyedia.service';
import { formatRp } from '../../../utils/formatRupiah';
import { IoIosCloseCircle } from 'react-icons/io';
import { SkeletonItem } from '../Skelekton';
import { useNavigate } from 'react-router-dom';
import { fileService } from '../../../services/file.service';
import Spinner from '../Spinner';
import { formatDate } from '../../../utils/formatDate';

export const ModalPaketBaru = ({ close, llsId }) => {
  const { getPaketBaru, getIkutLelang } = penyediaService();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPaketBaru(llsId);
        setData(response.data);
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const buttonIkutiLelang = async () => {
    try {
      const response = await getIkutLelang(llsId);
      if (response) {
        toastsuccess('Berhasil Mengikuti Lelang');
        navigate('/dashboard');
      } else {
        toasterror('Gagal Mengikuti Lelang');
      }
    } catch (error) {
      toasterror(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderKategori = () => {
    const kategori = data.lelang?.kgr_id;
    switch (kategori) {
      case '0':
        return <p>Pengadaan Barang</p>;
      case '1':
        return <p>Jasa Konsultansi Badan Usaha Non Konstruksi</p>;
      case '2':
        return <p>Pekerjaan Konstruksi</p>;
      case '3':
        return <p>Jasa Lainnya</p>;
      case '4':
        return <p>Jasa Konsultansi Perorangan Non Konstruksi</p>;
      case '5':
        return <p>Jasa Konsultansi Badan Usaha Konstruksi</p>;
      case '6':
        return <p>Jasa Konsultansi Perorangan Konstruksi</p>;
      case '7':
        return <p>Pekerjaan Konstruksi Terintegrasi</p>;
      default:
        return <p>Loading...</p>;
    }
  };

  const RenderDataPaket = () => {
    return (
      <table className="w-full mb-3 text-xs text-left">
        <tbody>
          <tr>
            <th className="px-4 py-2 border-b">Kode Paket</th>
            <td className="px-4 py-2 border-b">{data.lelang?.lls_id}</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b">Nama Paket</th>
            <td className="px-4 py-2 border-b">{data.lelang?.pkt_nama}</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b">Tahapan Saat ini</th>
            <td className="px-4 py-2 border-b">{data.lelang?.tahapan}</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b">Kategori</th>
            <td className="px-4 py-2 border-b">{renderKategori()}</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-b">Nilai HPS Paket</th>
            <td className="px-4 py-2 border-b">
              {formatRp(data.lelang?.pkt_hps)}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const RenderKualifikasi = () => {
    return (
      <div className="relative flex flex-col mb-3 overflow-x-auto rounded-lg">
        <div className="flex-grow">
          <table className="w-full text-xl text-left text-gray-600 md:text-base">
            <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
              <tr role="row" className="text-center border border-gray-200">
                <th className="px-2 py-2 border border-gray-200" colSpan="2">
                  Persyaratan Kualifikasi
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto text-xs">
              {data.kualifikasi?.length === 0 ? (
                <tr className="capitalize bg-gray-200 border-b">
                  <td
                    colSpan="2"
                    className="px-6 py-4 italic font-semibold text-center"
                  >
                    Tidak Ada Persyaratan Kualifikasi
                  </td>
                </tr>
              ) : (
                data.kualifikasi?.map((item, index) => (
                  <tr
                    key={item.ckm_id}
                    className="duration-150 ease-out bg-white border-b hover:bg-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-3 py-2 text-center text-gray-900 align-top whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-3 py-2 capitalize">{item.ckm_nama}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const RenderPaktaIntegritas = () => {
    return (
      <div className="mb-4">
        <div className="px-4 py-2">
          <p className="mb-3 text-center uppercase text-md">
            Pakta integristas
          </p>
          <p className="mb-2">Saya Menyetujui Bahwa :</p>
          <table className="w-full text-sm text-justify">
            <tbody>
              <tr>
                <th className="px-2 text-sm font-normal align-top">1.</th>
                <td className="pb-1">
                  Tidak akan melakukan praktek Korupsi, Kolusi dan/atau
                  Nepotisme;
                </td>
              </tr>
              <tr>
                <th className="px-2 text-sm font-normal align-top">2.</th>
                <td className="pb-1">
                  Akan melaporkan kepada pihak yang berwajib/berwenang apabila
                  mengetahui ada indikasi Korupsi, Kolusi dan/atau Nepotisme di
                  dalam proses pengadaan ini ;
                </td>
              </tr>
              <tr>
                <th className="px-2 text-sm font-normal align-top">3.</th>
                <td className="pb-1">
                  Dalam proses pengadaan ini, berjanji akan melaksanakan tugas
                  secara bersih, transparan dan professional dalam arti akan
                  mengarahkan segala kemampuan dan sumberdaya secara optimal
                  untuk memberikan hasil kerja yang terbaik mulai dari penyiapan
                  penawaran, pelaksanaan dan penyelesaian pekerjaan/kegiatan
                  ini;
                </td>
              </tr>
              <tr>
                <th className="px-2 text-sm font-normal align-top">4.</th>
                <td className="pb-1">
                  Apabila saya melanggar hal-hal yang telah saya nyatakan dalam
                  PAKTA INTEGRITAS ini saya bersedia dikenakan sanksi moral,
                  sanksi administrasi serta dituntut ganti rugi pidana sesuai
                  dengan ketentuan peraturan perundangundangan yang berlaku.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[70vw] mx-auto my-6 max-h-screen">
          <div className="relative flex flex-col w-full px-3 py-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="flex justify-end">
              <button className="mb-3" onClick={close}>
                <IoIosCloseCircle size="2rem" className="hover:text-red-600" />
              </button>
            </div>
            <div className="px-2 py-3 mb-6 font-semibold text-white bg-blue-400">
              Pendaftaran Paket
            </div>
            {loading ? (
              <SkeletonItem itemCount={4} cN="bg-gray-200 h-5" />
            ) : (
              <RenderDataPaket />
            )}
            {loading ? (
              <SkeletonItem itemCount={4} cN="bg-gray-200 h-5" />
            ) : (
              <RenderKualifikasi />
            )}
            {loading ? (
              <SkeletonItem itemCount={4} cN="bg-gray-200 h-5" />
            ) : (
              <RenderPaktaIntegritas />
            )}
            <div className="flex justify-center mt-5">
              <button
                className="px-3 py-2 font-bold text-white bg-green-600 border-b border-solid rounded-md rounded-t hover:bg-green-700 border-slate-200"
                type="button"
                onClick={() => buttonIkutiLelang()}
              >
                Setuju dan Ikuti Paket
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
    </>
  );
};

export const ModalUploadFile = ({ close, data }) => {
  const { getFile, downloadFile } = fileService();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTableFile = async () => {
      try {
        const response = await getFile(data.lainya.dok_id_attachment);
        setFiles(response);
      } catch (error) {
        setError('Belum ada file yang diunggah');
      } finally {
        setLoading(false);
      }
    };
    getTableFile();
  }, [data.lainya.dok_id_attachment]);

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

  const RenderTable = () => {
    return (
      <div className="relative flex flex-col h-[60vh] overflow-x-auto rounded-lg px-6 py-8">
        <div className="flex-grow">
          <table className="w-full text-sm text-left text-gray-600 md:text-sm">
            <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
              <tr role="row" className="text-center border border-gray-200">
                <th className="px-4 py-3 border border-gray-200">No</th>
                <th className="px-4 py-3 border border-gray-200">Nama File</th>
                <th className="px-4 py-3 border border-gray-200">
                  Tanggal Upload
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr className="h-56 capitalize bg-gray-200 border-b">
                  <td colSpan="4" className="text-center">
                    <Spinner />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="overflow-y-auto ">
                {files.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="4"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      {error}
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
                          className={`font-semibold hover:text-blue-500 hover:underline ${
                            downloading ? 'cursor-not-allowed' : ''
                          }`}
                          disabled={downloading}
                        >
                          {downloading
                            ? 'Download....'
                            : JSON.parse(file.blb_path).name}
                        </button>
                      </td>
                      <td className="px-3 py-4 text-center">
                        {formatDate(new Date(file.blb_date_time))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[70vw] mx-auto my-6 ">
          <div className="relative flex flex-col w-full px-3 py-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <RenderTable />
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

export const FileDokKirimPenawaran = ({ Id, close, data }) => {
  const { getFile, downloadFile } = fileService();
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getTableFile = async () => {
      try {
        const response = await getFile(Id);
        setFiles(response);
      } catch (error) {
        setError('Belum ada file yang diunggah');
      } finally {
        setLoading(false);
      }
    };
    getTableFile();
  }, [Id]);

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

  const RenderTable = () => {
    return (
      <div className="relative flex flex-col h-[60vh] overflow-x-auto rounded-lg px-6 py-8">
        <div className="flex-grow">
          <table className="w-full text-sm text-left text-gray-600 md:text-sm">
            <thead className="sticky top-0 text-xs uppercase bg-gray-800 rounded-lg md:text-sm text-gray-50">
              <tr role="row" className="text-center border border-gray-200">
                <th className="px-4 py-3 border border-gray-200">No</th>
                <th className="px-4 py-3 border border-gray-200">Nama File</th>
                <th className="px-4 py-3 border border-gray-200">
                  Tanggal Upload
                </th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr className="h-56 capitalize bg-gray-200 border-b">
                  <td colSpan="3" className="text-center">
                    <Spinner />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="overflow-y-auto ">
                {files.length === 0 ? (
                  <tr className="capitalize bg-gray-200 border-b">
                    <td
                      colSpan="3"
                      className="px-6 py-4 italic font-semibold text-center"
                    >
                      {error}
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
                          className={`font-semibold hover:text-blue-500 hover:underline ${
                            downloading ? 'cursor-not-allowed' : ''
                          }`}
                          disabled={downloading}
                        >
                          {downloading
                            ? 'Download....'
                            : JSON.parse(file.blb_path).name}
                        </button>
                      </td>
                      <td className="px-3 py-4 text-center">
                        {file.blb_date_time}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-[70vw] mx-auto my-6 ">
          <div className="relative flex flex-col w-full px-3 py-6 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="font-semibold text-center">{data}</div>
            <RenderTable />
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
