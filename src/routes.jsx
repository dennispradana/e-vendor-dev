import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';
import {
  AdminAcces,
  PenyediaAcces,
  ProtectedRoute,
} from './utils/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import Login from './pages/login';
import RegisterPenyedia from './pages/penyedia/registerPenyedia';
import Unauthorized from './pages/401';
import NotFound from './pages/404';
import LandingPage from './pages/landingpage';
import Dashboard from './pages/dashboard';
import SettingPage from './pages/settingPage';
import AddPegawaiPage from './pages/pegawai/admin/addPegawai';
import ListPegawai from './pages/pegawai/admin/listPegawai';
import ListPenyedia from './pages/pegawai/admin/listPenyedia';
import UpdatePegawaiPage from './pages/pegawai/admin/updatePegawai';
import UpdatePenyediaPage from './pages/pegawai/admin/updatePenyedia';
import DataPenyedia from './pages/penyedia/dataPenyedia';
import Identitas from './pages/penyedia/dataPenyedia/identitas';
import IzinUsaha from './pages/penyedia/dataPenyedia/izinUsaha';
import AddIzinUsaha from './pages/penyedia/dataPenyedia/addIzinUsaha';

const AppRoute = () => {
  const auth = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-penyedia" element={<RegisterPenyedia />} />
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
          <Route element={<PenyediaAcces />}>
            <Route path="data-penyedia" element={<DataPenyedia />}>
              <Route
                path="/data-penyedia"
                element={<Navigate to="identitas" />}
              />
              <Route path="identitas" element={<Identitas />} />
              <Route path="izin-usaha" element={<IzinUsaha />} />
              <Route
                path="izin-usaha/tambah-izin-usaha"
                element={<AddIzinUsaha />}
              />
            </Route>
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
