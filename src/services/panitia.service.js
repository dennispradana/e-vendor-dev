import api from '../config/api';

export const panitiaService = () => {
  const getPanitia = async (lenght, page, search) => {
    try {
      const response = await api.get(
        `/v1/panitia?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Panitia');
    }
  };

  const getAnggotaPanitia = async (usrgroup, lenght, page, search) => {
    try {
      const response = await api.get(
        `/v1/pegawai/${usrgroup}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Panitia');
    }
  };

  const postAnggotaPanitia = async (panitiaId, dataPanitia) => {
    try {
      const response = await api.post(`/v1/anggota/${panitiaId}`, dataPanitia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Menambah Data anggota');
    }
  };

  const postPanitia = async (dataPanitia) => {
    try {
      const response = await api.post('/v1/panitia', dataPanitia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Menambah Data Panitia');
    }
  };

  const editPanitia = async (panitiaId, dataPanitia) => {
    try {
      const response = await api.get(`/v1/panitia/${panitiaId}`, dataPanitia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data panitia');
    }
  };

  const updatePanitia = async (panitiaId, dataPanitia) => {
    try {
      const response = await api.put(`/v1/panitia/${panitiaId}`, dataPanitia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Data panitia');
    }
  };

  return {
    getPanitia,
    postPanitia,
    editPanitia,
    updatePanitia,
    getAnggotaPanitia,
    postAnggotaPanitia,
  };
};
