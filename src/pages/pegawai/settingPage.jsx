import React from 'react';
import SettingLayout from '../../components/Layouts/SettingLayout';
import FormSetting from '../../components/Fragments/FormSetting';
import { useAuthContext } from '../../contexts/AuthContext';
import { SkletonSetting } from '../../components/Elements/Skelekton';

const SettingPage = () => {
  const { loading } = useAuthContext();

  return (
    <SettingLayout>
      {loading ? <SkletonSetting itemCount={8} /> : <FormSetting />}
    </SettingLayout>
  );
};

export default SettingPage;
