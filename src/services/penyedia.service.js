import api from '../config/api';

export const penyediaService = () => {
  const btkUsaha = async () => {
    try {
      const response = await api.get('v1/b_usaha');
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Bentuk Usaha');
    }
  };

  const registerPenyedia = async (dataPenyedia) => {
    try {
      const response = await api.post('v1/penyedia', dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mendaftar');
    }
  };

  const getPenyedia = async (lenght, page, search) => {
    try {
      const response = await api.get(
        `/v1/penyedia?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Penyedia');
    }
  };

  const editPenyedia = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.get(`v1/penyedia/${penyediaId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Penyedia');
    }
  };

  const updatePenyedia = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.put(`v1/penyedia/${penyediaId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Data Penyedia');
    }
  };

  const getIzinUsaha = async (penyediaId, dataPenyedia) => {
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

  return {
    btkUsaha,
    registerPenyedia,
    getPenyedia,
    editPenyedia,
    updatePenyedia,
    getIzinUsaha,
  };
};
