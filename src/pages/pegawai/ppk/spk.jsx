import React, { useEffect, useState } from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import Breadcrumb from '../../../components/Elements/Breadcrumb';
import FormSPK from '../../../components/Fragments/FormSPK';
import { useParams } from 'react-router-dom';
import { ppkService } from '../../../services/ppk.service';
import { toasterror } from '../../../utils/ToastMessage';

const SpkPPK = () => {
  const { spkId } = useParams();
  const { getSpk } = ppkService();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSpk(spkId);
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
    { label: 'SPK' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <FormSPK loading={loading} data={data} spkId={spkId} />
    </MainLayouts>
  );
};

export default SpkPPK;
