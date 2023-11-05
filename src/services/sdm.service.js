import api from '../config/api';

export const sdmService = () => {
  const getSdm = async (penyediaId, lenght, page, search) => {
    try {
      const response = await api.get(
        `/penyedia/list_staf/${penyediaId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Staf');
    }
  };

  const postSdm = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.post(
        `/penyedia/staf/${penyediaId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Submit Data Staf');
    }
  };

  const editSdm = async (stpId, dataPenyedia) => {
    try {
      const response = await api.get(`/penyedia/staf/${stpId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Staf');
    }
  };

  const updateSdm = async (stpId, dataPenyedia) => {
    try {
      const response = await api.put(`/penyedia/staf/${stpId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Update Data Staf');
    }
  };

  return { getSdm, editSdm, postSdm, updateSdm };
};
