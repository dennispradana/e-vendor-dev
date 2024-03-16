import React, { useEffect, useState } from 'react';
import MainLayouts from '../../../components/Layouts/MainLayouts';
import FormSppbj from '../../../components/Fragments/FormSppbj';
import { ppkService } from '../../../services/ppk.service';
import { useParams } from 'react-router-dom';
import { toasterror } from '../../../utils/ToastMessage';
import Breadcrumb from '../../../components/Elements/Breadcrumb';

const UpdateSppbj = () => {
  const { sppbjId } = useParams();
  const { getSppbj } = ppkService();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSppbj(sppbjId);
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
    { label: 'SPPBJ' },
  ];
  return (
    <MainLayouts>
      <Breadcrumb items={breadcrumbItems} />
      <FormSppbj data={data} loading={loading} sppbjId={sppbjId} />
    </MainLayouts>
  );
};

export default UpdateSppbj;
