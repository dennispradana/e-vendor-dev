import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayouts from '../../components/Layouts/MainLayouts';
import Breadcrumb from '../../components/Elements/Breadcrumb';
import FormKirimPenawaran from '../../components/Fragments/FormKirimPenawaran';
import { penyediaService } from '../../services/penyedia.service';
import Spinner from '../../components/Elements/Spinner';
import TablePenawaranRkn from '../../components/Fragments/TablePenawaranRkn';

const SendPenawaran = () => {
  const { llsId } = useParams();
  const { getPenawaran } = penyediaService();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Penawaran', url: `/penawaran/${llsId}` },
    { label: 'Kirim Penawaran' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPenawaran(llsId);
        setData(response.data);
      } catch (error) {
        toasterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const RenderContent = () => {
    return data.lelang?.tahapan2 === 'PEMASUKAN_PENAWARAN' ? (
      <FormKirimPenawaran />
    ) : (
      <TablePenawaranRkn />
    );
  };

  return (
    <MainLayouts type="RKN">
      <Breadcrumb items={breadcrumbItems} />
      {loading ? (
        <div className="h-[60vh] flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <RenderContent />
      )}
    </MainLayouts>
  );
};

export default SendPenawaran;
