import api from '../config/api';

export const manajerialService = () => {
  const getManajer = async (penyediaId, lenght, page, search) => {
    try {
      const response = await api.get(
        `/penyedia/list_manajer/${penyediaId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Manajerial');
    }
  };

  const postManajer = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.post(
        `/penyedia/manajer/${penyediaId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Manajerial');
    }
  };

  const editManajer = async (manajerialId, dataPenyedia) => {
    try {
      const response = await api.get(
        `/penyedia/manajer/${manajerialId}`,
        dataPenyedia
      );
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Manajerial');
    }
  };

  const updateManajer = async (manajerialId, dataPenyedia) => {
    try {
      const response = await api.put(
        `/penyedia/manajer/${manajerialId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Manajerial');
    }
  };

  return { getManajer, postManajer, updateManajer, editManajer };
};
