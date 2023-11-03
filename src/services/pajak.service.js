import api from '../config/api';

export const pajakService = () => {
  const getPajak = async (penyediaId, lenght, page, search) => {
    try {
      const response = await api.get(
        `/penyedia/list_pajak/${penyediaId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Pajak');
    }
  };

  const postPajak = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.post(
        `/penyedia/pajak/${penyediaId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Submit Data Pajak');
    }
  };

  const editPajak = async (pjkId, dataPenyedia) => {
    try {
      const response = await api.get(`/penyedia/pajak/${pjkId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Pajak');
    }
  };

  const updatePajak = async (pjkId, dataPenyedia) => {
    try {
      const response = await api.put(`/penyedia/pajak/${pjkId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Update Data Pajak');
    }
  };

  return {
    getPajak,
    postPajak,
    editPajak,
    updatePajak,
  };
};
