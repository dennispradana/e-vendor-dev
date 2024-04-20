import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { paketService } from '../../services/paket.service';
import { DownloadTeknis } from '../Elements/Button/DownloadButton';
import Spinner from '../Elements/Spinner';
import { IoArrowBackOutline } from 'react-icons/io5';

const TableAdministrasiTeknis = () => {
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

  const RenderAdministarsi = () => {
    return (
      <div className="my-6 border-b ">
        <p className="mb-1 text-sm font-semibold">Teknis</p>
        {data.teknis?.length === 0 ? (
          <p className="text-xs text-justify">Tidak ada Persyaratan Teknis</p>
        ) : (
          data.teknis?.map((item, index) => (
            <div key={item.chk_id} className="mb-6">
              <div className="flex gap-2 p-1">
                <p className="text-xs text-justify align-top">
                  {index + 1 + '.'}
                </p>
                <p className="text-xs text-justify">{item.chk_nama}</p>
              </div>
              <DownloadTeknis data={item.dok_id_attachment} />
            </div>
          ))
        )}
      </div>
    );
  };

  const RenderContent = () => {
    return loading ? (
      <div className="h-[60vh] flex justify-center items-center">
        <Spinner />
      </div>
    ) : (
      <>
        <RenderAdministarsi />
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-black hover:text-blue-600 hover:underline"
        >
          <IoArrowBackOutline />
          Kembali
        </button>
      </>
    );
  };

  return (
    <div className="p-5 mb-10 bg-white rounded shadow-md">
      <RenderContent />
    </div>
  );
};

export default TableAdministrasiTeknis;
