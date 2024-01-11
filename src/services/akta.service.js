import api from '../config/api';

export const aktaService = () => {
  const getAkta = async (penyediaId, lenght, page, search) => {
    try {
      const response = await api.get(
        `v1/RKN/list_akta/${penyediaId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Akta');
    }
  };

  const postAkta = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.post(
        `/penyedia/akta/${penyediaId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengirim Data Akta');
    }
  };

  const editAkta = async (lhkId, dataPenyedia) => {
    try {
      const response = await api.get(`/penyedia/akta/${lhkId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Akta');
    }
  };

  const updateAkta = async (lhkId, dataPenyedia) => {
    try {
      const response = await api.put(`/penyedia/akta/${lhkId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengirim Data Akta');
    }
  };

  return { getAkta, editAkta, postAkta, updateAkta };
};
