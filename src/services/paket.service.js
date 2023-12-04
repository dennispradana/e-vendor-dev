import api from '../config/api';

export const paketService = () => {
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

  return {
    getListPaket,
    getDataPaket,
    updateDataPaket,
    paketInisiasi,
    postRupForAnggaran,
    postAnggaran,
    updateAnggaran,
  };
};
