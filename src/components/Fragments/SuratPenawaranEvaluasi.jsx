import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { paketService } from '../../services/paket.service';
import { toasterror } from '../../utils/ToastMessage';
import { SkeletonItem } from '../Elements/Skelekton';
import { formatDate } from '../../utils/formatDate';
import { IoArrowBackOutline } from 'react-icons/io5';

const SuratPenawaranEvaluasi = () => {
  const { psrId } = useParams();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const { getDataEvaluasiPen } = paketService();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataEvaluasiPen(psrId);
        const responseData = response.data;
        setData(responseData);
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const renderStatus = () => {
    const status = data.peserta?.tgl_surat_penawaran;
    return status === null ? (
      <p>
        Status:
        <span className="px-2 py-1 ml-2 text-white bg-gray-700 rounded">
          Belum Setuju
        </span>
      </p>
    ) : (
      <p>
        Status:
        <span className="px-2 py-1 ml-2 text-white bg-green-700 rounded">
          Setuju
        </span>
      </p>
    );
  };

  const RenderContent = () => {
    return loading ? (
      <div className="page-padding">
        <SkeletonItem itemCount={10} cN="bg-gray-200 h-6" />
      </div>
    ) : (
      <>
        <div className="px-3 my-6">{renderStatus()}</div>
        <div className="px-3 py-2 text-justify border">
          <p className="pb-2">
            Sehubungan dengan undangan Pengadaan Langsung nomor:
            <span className="px-1 font-semibold">
              {data.dok_lelang?.dll_nomorsdp}
            </span>
            tanggal
            <span className="px-1 font-semibold">
              {formatDate(new Date(data.dok_lelang?.dll_tglsdp))}
            </span>
            dan setelah kami pelajari dengan saksama Dokumen Pengadaan, dengan
            ini kami mengajukan penawaran untuk pekerjaan
            <span className="px-1 font-semibold">{data.peserta?.pkt_nama}</span>
            sebesar yang tercantum pada surat penawaran
          </p>
          <p className="pb-2">
            Penawaran ini sudah memperhatikan ketentuan dan persyaratan yang
            tercantum dalam Dokumen Pengadaan Langsung untuk melaksanakan
            pekerjaan tersebut di atas.
          </p>
          <p className="pb-2">
            Penawaran ini berlaku selama
            <span className="px-2 py-1 font-semibold">
              {data.peserta?.masa_berlaku_penawaran}
            </span>
            hari kalender sejak tanggal surat penawaran ini.
          </p>
          <p className="pb-2">
            Sesuai dengan persyaratan pada Dokumen Pemilihan, bersama ini Surat
            kami lampirkan Persyaratan Dokumen dan Persyatan harga
          </p>
          <p className="pb-2">
            Dengan disampaikannya Surat Penawaran ini, maka kami menyatakan
            sanggup dan akan tunduk pada semua ketentuan yang tercantum dalam
            Dokumen Pengadaan.
          </p>
        </div>
        <button
          onClick={handleBack}
          className="flex items-center gap-2 my-4 text-black hover:text-blue-600 hover:underline"
        >
          <IoArrowBackOutline />
          Kembali
        </button>
      </>
    );
  };

  return (
    <div className="p-3 mb-10 bg-white rounded shadow-md">
      <RenderContent />
    </div>
  );
};

export default SuratPenawaranEvaluasi;
