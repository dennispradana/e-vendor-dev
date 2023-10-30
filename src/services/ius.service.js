import api from '../config/api';

export const iusService = () => {
  const jenisIzin = async () => {
    try {
      const response = await api.get('jenis_ijin');
      return response;
    } catch (error) {
      throw new Error('Gagal Mengambil Jenis Izin');
    }
  };

  const getIzinUsaha = async (penyediaId, data) => {
    try {
      const response = await api.get(`/penyedia/list_ijin/${penyediaId}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Izin Usaha');
    }
  };

  const postIzinUsaha = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.post(
        `/penyedia/ijin/${penyediaId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Izin Usaha');
    }
  };

  const editIzinUsaha = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.get(
        `/penyedia/ijin/${penyediaId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Izin Usaha');
    }
  };

  return { jenisIzin, getIzinUsaha, postIzinUsaha, editIzinUsaha };
};
