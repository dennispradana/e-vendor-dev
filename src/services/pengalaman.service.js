import api from '../config/api';

export const pengalamanService = () => {
  const getPengalaman = async (penyediaId, lenght, page, search) => {
    try {
      const response = await api.get(
        `/penyedia/list_pengalaman/${penyediaId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data pengalaman');
    }
  };

  const postPengalaman = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.post(
        `/penyedia/pengalaman/${penyediaId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Submit Data Pengalaman');
    }
  };

  const editPengalaman = async (penId, dataPenyedia) => {
    try {
      const response = await api.get(
        `/penyedia/pengalaman/${penId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Pengalaman');
    }
  };

  const updatePengalaman = async (penId, dataPenyedia) => {
    try {
      const response = await api.put(
        `/penyedia/pengalaman/${penId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Update Data Pengalaman');
    }
  };

  return { getPengalaman, postPengalaman, editPengalaman, updatePengalaman };
};
