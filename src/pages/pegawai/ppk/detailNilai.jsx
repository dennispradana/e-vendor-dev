import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ppkService } from '../../../services/ppk.service';
import DetailNilai from '../../../components/Fragments/DetailNilai';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';

const DetailPenilaian = () => {
  const { llsId, ktrId } = useParams();
  const { getDetailPenilaian } = ppkService();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDetailPenilaian(llsId, ktrId);
        setData(response.data);
      } catch (error) {
        toasterror(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Lelang', url: `/lelang/${data.lelang?.lls_id}` },
    { label: 'Detail Nilai' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <DetailNilai data={data} loading={loading} />
    </MainLayouts>
  );
};

export default DetailPenilaian;
