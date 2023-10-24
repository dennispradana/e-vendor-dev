import React from 'react';
import SettingPegLayout from '../components/Layouts/SettingPegLayout';
import FormSettingPeg from '../components/Fragments/FormSettingPeg';
import { useAuthContext } from '../contexts/AuthContext';
import { SkletonSetting } from '../components/Elements/Skelekton';
import FormSettingRkn from '../components/Fragments/FormSettingRkn';
import SettingRknLayout from '../components/Layouts/SettingRknLayout';

const SettingPage = () => {
  const { user, loading } = useAuthContext();
  const settingForm =
    user.role === 'RKN' ? (
      <SettingRknLayout>
        <FormSettingRkn />
      </SettingRknLayout>
    ) : (
      <SettingPegLayout>
        {loading ? <SkletonSetting itemCount={8} /> : <FormSettingPeg />}
      </SettingPegLayout>
    );
  return settingForm;
};

export default SettingPage;
