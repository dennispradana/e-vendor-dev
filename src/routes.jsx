import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';
import { AdminAcces, ProtectedRoute } from './utils/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import Unauthorized from './pages/401';
import NotFound from './pages/404';
import LandingPage from './pages/landingpage';
import Dashboard from './pages/pegawai/dashboard';
import SettingPage from './pages/pegawai/settingPage';
import LoginPegawaiPage from './pages/pegawai/loginPegawai';
import AddPegawaiPage from './pages/pegawai/admin/addPegawai';
import ListPegawai from './pages/pegawai/admin/listPegawai';
import ListPenyedia from './pages/pegawai/admin/listPenyedia';
import UpdatePegawaiPage from './pages/pegawai/admin/updatePegawai';
import UpdatePenyediaPage from './pages/pegawai/admin/updatePenyedia';
import LoginPenyediaPage from './pages/penyedia/loginPenyedia';
import RegisterPenyedia from './pages/penyedia/registerPenyedia';

const AppRoute = () => {
  const auth = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPegawaiPage />} />
        <Route path="/login/penyedia" element={<LoginPenyediaPage />} />
        <Route path="/register/penyedia" element={<RegisterPenyedia />} />
        <Route element={<ProtectedRoute token={auth.userToken} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<SettingPage />} />
          <Route element={<AdminAcces />}>
            <Route path="/daftar-pegawai" element={<ListPegawai />} />
            <Route
              path="/daftar-pegawai/edit/:pegawaiId"
              element={<UpdatePegawaiPage />}
            />
            <Route path="/tambah-pegawai" element={<AddPegawaiPage />} />
            <Route path="/daftar-penyedia" element={<ListPenyedia />} />
            <Route
              path="/daftar-penyedia/edit/:penyediaId"
              element={<UpdatePenyediaPage />}
            />
          </Route>
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default AppRoute;
