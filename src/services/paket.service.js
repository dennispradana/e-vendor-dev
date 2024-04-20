import api from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';

export const paketService = () => {
  const { userToken } = useAuthContext();
  const getListPaket = async (userId, lenght, page, search) => {
    try {
      const response = await api.get(
        `/v1/PPK/list_paket/${userId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Paket');
    }
  };

  const getDataPaket = async (paketId, dataPaket) => {
    try {
      const response = await api.get(`/v1/PPK/paket/${paketId}`, dataPaket);
      return response.data;
    } catch (error) {
      throw new Error('Data Paket Tidak Tersedia');
    }
  };

  const updateDataPaket = async (paketId, dataPaket) => {
    try {
      const response = await api.put(`/v1/PPK/paket/${paketId}`, dataPaket, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Data Paket');
    }
  };

  const postRupForAnggaran = async (dataPaket) => {
    try {
      const response = await api.post('/v1/PPK/anggaran', dataPaket, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Data Paket Tidak Tersedia');
    }
  };

  const postAnggaran = async (paketId, dataAnggaran) => {
    try {
      const response = await api.post(
        `/v1/PPK/tambahangg/${paketId}`,
        dataAnggaran,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Menambah Anggaran');
    }
  };

  const updateAnggaran = async (paketId, dataAnggaran) => {
    try {
      const response = await api.post(
        `/v1/PPK/editangg/${paketId}`,
        dataAnggaran,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Anggaran');
    }
  };

  const paketInisiasi = async (dataPaket) => {
    try {
      const response = await api.post('/v1/PPK/InisiasiPaket', dataPaket, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Data Paket Tidak Tersedia');
    }
  };

  const getPilihPegawai = async (paketId, pegawaiId, dataPegawai) => {
    try {
      const response = await api.get(
        `/v1/KIPBJ/paket_pp/${paketId}?peg_id=${pegawaiId}`,
        dataPegawai
      );
      return response.data;
    } catch (error) {
      throw new Error('Kesalahan dalam menampilkan Pegawai');
    }
  };

  const getPilihPanitia = async (paketId, panitiaId, dataPanitia) => {
    try {
      const response = await api.get(
        `/v1/KIPBJ/paket_panitia/${paketId}?pnt_id=${panitiaId}`,
        dataPanitia
      );
      return response.data;
    } catch (error) {
      throw new Error('Kesalahan dalam menampilkan Panitia');
    }
  };

  const inisiasiLelang = async (paketId) => {
    try {
      const response = await api.get(`/v1/KIPBJ/InisiasiLelang/${paketId}`, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Data Paket Tidak Tersedia');
    }
  };

  const getPaketUp = async (userId, lenght, page, search) => {
    try {
      const response = await api.get(
        `/v1/PP/list_paketUp/${userId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Data Paket Tidak Tersedia');
    }
  };
  const getLelangUp = async (userId, lenght, page, search) => {
    try {
      const response = await api.get(
        `/v1/PP/list_lelangUp/${userId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Data Paket Tidak Tersedia');
    }
  };

  const getPaketDown = async (userId, lenght, page, search) => {
    try {
      const response = await api.get(
        `/v1/PP/list_paketDown/${userId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Data Paket Tidak Tersedia');
    }
  };

  const getLelangDown = async (userId, lenght, page, search) => {
    try {
      const response = await api.get(
        `/v1/PP/list_lelangDown/${userId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Data Paket Tidak Tersedia');
    }
  };

  const paketLelang = async (llsId) => {
    try {
      const response = await api.get(`/v1/PP/lelang/${llsId}`, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mendapatkan Data');
    }
  };

  const updatePaketLelang = async (llsId, dataPaket) => {
    try {
      const response = await api.put(`/v1/PP/lelang/${llsId}`, dataPaket, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Data Paket');
    }
  };

  const getKualifikasi = async (llsId, dataKulifikasi) => {
    try {
      const response = await api.get(
        `/v1/PP/kualifikasi/${llsId}`,
        dataKulifikasi
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mendapatkan Data');
    }
  };

  const updateKualifikasi = async (dllId, dataKulifikasi) => {
    try {
      const response = await api.put(
        `/v1/PP/chk_kualifikasi/${dllId}`,
        dataKulifikasi,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Data Paket');
    }
  };

  const getPenawaran = async (llsId, dataKulifikasi) => {
    try {
      const response = await api.get(
        `/v1/PP/penawaran/${llsId}`,
        dataKulifikasi
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mendapatkan Data');
    }
  };

  const updatePenawaran = async (dllId, dataKulifikasi) => {
    try {
      const response = await api.put(
        `/v1/PP/chk_penawaran/${dllId}`,
        dataKulifikasi,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Data Paket');
    }
  };

  const getPenyediaLelang = async (llsId, dataPenyedia) => {
    try {
      const response = await api.get(`/v1/PP/penyedia/${llsId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mendapatkan Data');
    }
  };

  const getPilihPenyediaLelang = async (llsId, rknId) => {
    try {
      const response = await api.get(
        `/v1/PP/tambah_peserta/${llsId}?rkn_id=${rknId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mendapatkan Data');
    }
  };

  const getDokKualifikasiPen = async (psrId, dataDok) => {
    try {
      const response = await api.get(`/v1/PP/pen_kual/${psrId}`, dataDok);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mendapatkan Data');
    }
  };

  const getDataEvaluasiPen = async (psrId, data) => {
    try {
      const response = await api.get(`/v1/PP/pen_penawaran/${psrId}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mendapatkan Data');
    }
  };

  const getDataDahsboardPPK = async (userId, lenght, page, search) => {
    try {
      const response = await api.get(
        `v1/PPK/lelang/${userId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  return {
    getListPaket,
    getDataPaket,
    updateDataPaket,
    inisiasiLelang,
    postRupForAnggaran,
    postAnggaran,
    updateAnggaran,
    getPilihPanitia,
    getPilihPegawai,
    paketInisiasi,
    getPaketUp,
    getPaketDown,
    paketLelang,
    updatePaketLelang,
    getKualifikasi,
    updateKualifikasi,
    getPenawaran,
    updatePenawaran,
    getPenyediaLelang,
    getPilihPenyediaLelang,
    getLelangUp,
    getLelangDown,
    getDokKualifikasiPen,
    getDataEvaluasiPen,
    getDataDahsboardPPK,
  };
};
