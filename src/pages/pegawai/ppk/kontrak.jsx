import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ppkService } from '../../../services/ppk.service';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import FormKontrakPPk from '../../../components/Fragments/FormKontrakPPk';

const KontrakPPK = () => {
  const { kontrakId } = useParams();
  const { getKontrak } = ppkService();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getKontrak(kontrakId);
        setData(response.data);
      } catch (error) {
        toasterror(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(data);

  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Lelang', url: `/lelang/${data.lelang?.lls_id}` },
    { label: 'Kontrak' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <FormKontrakPPk loading={loading} data={data} kontrakId={kontrakId} />
    </MainLayouts>
  );
};

export default KontrakPPK;
