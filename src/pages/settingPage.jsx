import React from 'react';
import SettingLayout from '../components/Layouts/SettingLayout';
import FormSettingPeg from '../components/Fragments/FormSettingPeg';
import { useAuthContext } from '../contexts/AuthContext';
import { SkletonSetting } from '../components/Elements/Skelekton';
import FormSettingRkn from '../components/Fragments/FormSettingRkn';

const SettingPage = () => {
  const { user, loading } = useAuthContext();
  const settingForm =
    user.role === 'RKN' ? (
      <FormSettingRkn />
    ) : (
      <SettingLayout>
        {loading ? <SkletonSetting itemCount={8} /> : <FormSettingPeg />}
      </SettingLayout>
    );
  return settingForm;
};

export default SettingPage;
