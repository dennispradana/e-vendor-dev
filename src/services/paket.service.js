import api from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';

export const paketService = () => {
  const { userToken } = useAuthContext();
  const getListPaket = async (lenght, page, search) => {
    try {
      const response = await api.get(
        `/v1/list_paket?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Paket');
    }
  };

  const getDataPaket = async (paketId, dataPaket) => {
    try {
      const response = await api.get(`/v1/paket/${paketId}`, dataPaket);
      return response.data;
    } catch (error) {
      throw new Error('Data Paket Tidak Tersedia');
    }
  };

  const updateDataPaket = async (paketId, dataPaket) => {
    try {
      const response = await api.put(`/v1/paket/${paketId}`, dataPaket);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Data Paket');
    }
  };

  const postRupForAnggaran = async (dataPaket) => {
    try {
      const response = await api.post('/v1/anggaran', dataPaket);
      return response.data;
    } catch (error) {
      throw new Error('Data Paket Tidak Tersedia');
    }
  };

  const postAnggaran = async (paketId, dataAnggaran) => {
    try {
      const response = await api.post(
        `/v1/tambahangg/${paketId}`,
        dataAnggaran
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Menambah Anggaran');
    }
  };

  const updateAnggaran = async (paketId, dataAnggaran) => {
    try {
      const response = await api.post(`/v1/editangg/${paketId}`, dataAnggaran);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Anggaran');
    }
  };

  const paketInisiasi = async (dataPaket) => {
    try {
      const response = await api.post('/v1/InisiasiPaket', dataPaket);
      return response.data;
    } catch (error) {
      throw new Error('Data Paket Tidak Tersedia');
    }
  };

  const getPilihPegawai = async (paketId, pegawaiId, dataPegawai) => {
    try {
      const response = await api.get(
        `/v1/paket_pp/${paketId}?peg_id=${pegawaiId}`,
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
        `/v1/paket_panitia/${paketId}?pnt_id=${panitiaId}`,
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
  };
};
