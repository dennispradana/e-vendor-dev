import api from '../config/api';

export const peralatanService = () => {
  const getPeralatan = async (penyediaId, lenght, page, search) => {
    try {
      const response = await api.get(
        `v1/RKN/list_peralatan/${penyediaId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Peralatan');
    }
  };

  const postPeralatan = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.post(
        `/penyedia/peralatan/${penyediaId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Submit Data Peralatan');
    }
  };

  const editPeralatan = async (prlId, dataPenyedia) => {
    try {
      const response = await api.get(
        `/penyedia/peralatan/${prlId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Peralatan');
    }
  };

  const updatePeralatan = async (prlId, dataPenyedia) => {
    try {
      const response = await api.put(
        `/penyedia/peralatan/${prlId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Update Data Peralatan');
    }
  };

  return { getPeralatan, postPeralatan, editPeralatan, updatePeralatan };
};
