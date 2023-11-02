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

  const getIzinUsaha = async (penyediaId, lenght, page, search) => {
    try {
      const response = await api.get(
        `/penyedia/list_ijin/${penyediaId}?length=${lenght}&page=${page}&q=${search}`
      );
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

  const editIzinUsaha = async (iusId, dataPenyedia) => {
    try {
      const response = await api.get(`/penyedia/ijin/${iusId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Izin Usaha');
    }
  };

  const updateIzinUsaha = async (iusId, dataPenyedia) => {
    try {
      const response = await api.put(`/penyedia/ijin/${iusId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Izin Usaha');
    }
  };

  return {
    jenisIzin,
    getIzinUsaha,
    postIzinUsaha,
    editIzinUsaha,
    updateIzinUsaha,
  };
};
