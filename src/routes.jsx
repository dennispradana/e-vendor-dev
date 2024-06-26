import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';
import {
  AdminAcces,
  KipbjAccess,
  PenyediaAcces,
  PpAccess,
  PpkAccess,
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
import AddIzinUsaha from './pages/penyedia/addIzinUsaha';
import UpdateIzinUsaha from './pages/penyedia/updateIzinUsaha';
import Akta from './pages/penyedia/dataPenyedia/akta';
import AddAkta from './pages/penyedia/addAkta';
import UpdateAkta from './pages/penyedia/updateAkta';
import Manajerial from './pages/penyedia/dataPenyedia/manajerial';
import AddManajerial from './pages/penyedia/addManajerial';
import UpdateManajerial from './pages/penyedia/updateManajerial';
import TenagaAhli from './pages/penyedia/dataPenyedia/tenagaAhli';
import AddTenagaAhli from './pages/penyedia/addTenagaAhli';
import Pengalaman from './pages/penyedia/dataPenyedia/pengalaman';
import AddPengalaman from './pages/penyedia/addPengalaman';
import Peralatan from './pages/penyedia/dataPenyedia/peralatan';
import AddPeralatan from './pages/penyedia/addPeralatan';
import Pajak from './pages/penyedia/dataPenyedia/pajak';
import AddPajak from './pages/penyedia/addPajak';
import UpdatePajak from './pages/penyedia/updatePajak';
import UpdatePengalaman from './pages/penyedia/updatePengalaman';
import UpdatePeralatan from './pages/penyedia/updatePeralatan';
import ListPanitia from './pages/pegawai/kipbj/listPanitia';
import UpdatePanitia from './pages/pegawai/kipbj/updatePanita';
import AddPanitia from './pages/pegawai/kipbj/addPanitia';
import DetailPanitia from './pages/pegawai/kipbj/detailPanitia';
import ListPaket from './pages/pegawai/ppk/listPaket';
import UpdatePaket from './pages/pegawai/ppk/updatePaket';
import ListPejabatPengadaan from './pages/pegawai/kipbj/listPejabatPengadaan';
import ListPaketPJB from './pages/pegawai/kipbj/listPaket';
import UpdatePaketPJB from './pages/pegawai/kipbj/updatePaketPJB';
import DetailPaketPjb from './pages/pegawai/kipbj/detailPaket';
import DetailPaketPpk from './pages/pegawai/ppk/detailPaket';
import DataPaket from './pages/pegawai/pp/dataPaket';
import Down from './pages/pegawai/pp/dataPaket/down';
import Up from './pages/pegawai/pp/dataPaket/up';
import UpdateLelang from './pages/pegawai/pp/updateLelang';
import DaftarPaketBaru from './pages/penyedia/daftarPaketBaru';
import Penawaran from './pages/penyedia/penawaran';
import DokRKN from './pages/penyedia/dokRkn';
import AddDataKualifikasi from './pages/penyedia/addDataKualifikasi';
import SendPenawaran from './pages/penyedia/sendPenawaran';
import DetailLelang from './pages/pegawai/pp/detailLelang';
import Evaluasi from './pages/pegawai/pp/evaluasi';
import DokEvaluasi from './pages/pegawai/pp/dokEvaluasi';
import DokKualifikasiPen from './pages/pegawai/pp/dokKualifikasiPen';
import DokAdministrasiTeknis from './pages/pegawai/pp/dokAdministrasiTeknis';
import DokHarga from './pages/pegawai/pp/dokHarga';
import DokSuratPenawaranEvaluasi from './pages/pegawai/pp/dokSuratPenawaran';
import EvaluasiPeserta from './pages/pegawai/pp/evaluasiPeseta';
import Penetapan from './pages/pegawai/pp/penetapan';
import Verifikasi from './pages/pegawai/pp/verifikasi';
import DetailLelangKIPJB from './pages/pegawai/kipbj/detailLelang';
import DokLelangKIPJB from './pages/pegawai/kipbj/dokLelang';
import LelangPPK from './pages/pegawai/ppk/lelangPPK';
import DokumenPPK from './pages/pegawai/ppk/dokPPK';
import UpdateSppbj from './pages/pegawai/ppk/updateSppbj';
import KontrakPPK from './pages/pegawai/ppk/kontrak';
import SpkPPK from './pages/pegawai/ppk/spk';
import DetailPenilaian from './pages/pegawai/ppk/detailNilai';

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

              <Route path="akta" element={<Akta />} />
              <Route path="manajerial" element={<Manajerial />} />
              <Route path="sdm" element={<TenagaAhli />} />
              <Route path="pengalaman" element={<Pengalaman />} />
              <Route path="peralatan" element={<Peralatan />} />
              <Route path="pajak" element={<Pajak />} />
            </Route>
            <Route path="/tambah-izin-usaha" element={<AddIzinUsaha />} />
            <Route
              path="/edit-izin-usaha/:penyediaIusId"
              element={<UpdateIzinUsaha />}
            />
            <Route path="/tambah-akta" element={<AddAkta />} />
            <Route path="/edit-akta/:penyediaLhkpId" element={<UpdateAkta />} />
            <Route path="/tambah-manajerial" element={<AddManajerial />} />
            <Route
              path="/edit-manajerial/:penyediaManajerId"
              element={<UpdateManajerial />}
            />
            <Route path="/tambah-sdm" element={<AddTenagaAhli />} />
            <Route
              path="/edit-sdm/:penyediaStpId"
              element={<AddTenagaAhli />}
            />
            <Route path="/tambah-pengalaman" element={<AddPengalaman />} />
            <Route
              path="/edit-pengalaman/:penyediaPenId"
              element={<UpdatePengalaman />}
            />
            <Route path="/tambah-peralatan" element={<AddPeralatan />} />
            <Route
              path="/edit-peralatan/:penyediaPrlId"
              element={<UpdatePeralatan />}
            />
            <Route path="/tambah-pajak" element={<AddPajak />} />
            <Route
              path="/edit-pajak/:penyediaPjkId"
              element={<UpdatePajak />}
            />
            <Route path="/paket-baru" element={<DaftarPaketBaru />} />
            <Route path="/penawaran/:llsId" element={<Penawaran />} />
            <Route path="/dokumen-penawaran/:llsId" element={<DokRKN />} />
            <Route
              path="/dokumen-kualifikasi/:llsId"
              element={<AddDataKualifikasi />}
            />
            <Route path="/kirim-penawaran/:llsId" element={<SendPenawaran />} />
            <Route path="/paket-baru" element={<DaftarPaketBaru />} />
            <Route path="/penawaran/:llsId" element={<Penawaran />} />
            <Route path="/dokumen-penawaran/:llsId" element={<DokRKN />} />
            <Route
              path="/dokumen-kualifikasi/:llsId"
              element={<AddDataKualifikasi />}
            />
            <Route path="/kirim-penawaran/:llsId" element={<SendPenawaran />} />
          </Route>
          <Route element={<KipbjAccess />}>
            <Route path="/daftar-panitia" element={<ListPanitia />} />
            <Route
              path="/daftar-panitia/detail/:panitiaId"
              element={<DetailPanitia />}
            />
            <Route
              path="/daftar-panitia/edit/:panitiaId"
              element={<UpdatePanitia />}
            />
            <Route path="/tambah-panitia" element={<AddPanitia />} />
            <Route path="/daftar-pp" element={<ListPejabatPengadaan />} />
            <Route path="/paket" element={<ListPaketPJB />} />
            <Route path="/paket/:paketId" element={<UpdatePaketPJB />} />
            <Route path="/paket/detail/:paketId" element={<DetailPaketPjb />} />
            <Route
              path="/detail-lelang/:llsId"
              element={<DetailLelangKIPJB />}
            />
            <Route path="/dokumen-Lelang/:llsId" element={<DokLelangKIPJB />} />
          </Route>
          <Route element={<PpkAccess />}>
            <Route path="/daftar-paket" element={<ListPaket />} />
            <Route path="/daftar-paket/:paketId" element={<UpdatePaket />} />
            <Route
              path="/daftar-paket/detail/:paketId"
              element={<DetailPaketPpk />}
            />
            <Route path="/lelang/:llsId" element={<LelangPPK />} />
            <Route path="/dokumen-PPK/:llsId" element={<DokumenPPK />} />
            <Route path="/sppbj/:sppbjId" element={<UpdateSppbj />} />
            <Route path="/kontrak/:kontrakId" element={<KontrakPPK />} />
            <Route path="/spk/:spkId" element={<SpkPPK />} />
            <Route
              path="/detail-nilai/:llsId/:ktrId"
              element={<DetailPenilaian />}
            />
          </Route>
          <Route element={<PpAccess />}>
            <Route path="data-paket" element={<DataPaket />}>
              <Route path="/data-paket" element={<Navigate to="down" />} />
              <Route path="down" element={<Down />} />
              <Route path="up" element={<Up />} />
            </Route>
            <Route path="evaluasi/:llsId" element={<Evaluasi />} />
            <Route
              path="evaluasi/dokumen-kulifikasi/:psrId"
              element={<DokKualifikasiPen />}
            />
            <Route
              path="evaluasi/administrasi/:psrId"
              element={<DokAdministrasiTeknis />}
            />
            <Route
              path="evaluasi/surat-penawaran/:psrId"
              element={<DokSuratPenawaranEvaluasi />}
            />
            <Route
              path="evaluasi/peserta/:psrId"
              element={<EvaluasiPeserta />}
            />
            <Route path="evaluasi/harga/:psrId" element={<DokHarga />} />
            <Route path="evaluasi/penetapan/:psrId" element={<Penetapan />} />
            <Route path="evaluasi/verifikasi/:psrId" element={<Verifikasi />} />
            <Route path="dokumen-evaluasi/:llsId" element={<DokEvaluasi />} />
            <Route path="/data-paket/:llsId" element={<UpdateLelang />} />
            <Route
              path="/data-paket/detail/:llsId"
              element={<DetailLelang />}
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
