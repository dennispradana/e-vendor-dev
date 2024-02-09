import api from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';

export const panitiaService = () => {
  const { userToken } = useAuthContext();
  const getPanitia = async (lenght, page, search) => {
    try {
      const response = await api.get(
        `/v1/KIPBJ/panitia?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Panitia');
    }
  };

  const getAnggotaPanitia = async (lenght, page, search) => {
    try {
      const response = await api.get(
        `/v1/KIPBJ/list_pegawai/PP?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Panitia');
    }
  };

  const updateAnggotaPanitia = async (panitiaId, dataPanitia) => {
    try {
      const response = await api.put(
        `/v1/KIPBJ/anggota/${panitiaId}`,
        dataPanitia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Menambah Data anggota');
    }
  };

  const deleteAnggotaPanitia = async (pegawaiId, panitiaId) => {
    try {
      const response = await api.get(
        `/v1/anggota?peg_id=${pegawaiId}&pnt_id=${panitiaId}`
      );
      return response;
    } catch (error) {
      throw new Error('Gagal Menambah Data anggota');
    }
  };

  const postPanitia = async (dataPanitia) => {
    try {
      const response = await api.post('/v1/KIPBJ/panitia', dataPanitia, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Menambah Data Panitia');
    }
  };

  const editPanitia = async (panitiaId, dataPanitia) => {
    try {
      const response = await api.get(
        `/v1/KIPBJ/panitia/${panitiaId}`,
        dataPanitia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data panitia');
    }
  };

  const updatePanitia = async (panitiaId, dataPanitia) => {
    try {
      const response = await api.put(
        `/v1/KIPBJ/panitia/${panitiaId}`,
        dataPanitia,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Data panitia');
    }
  };

  const getListPaket = async (userId, lenght, page, search) => {
    try {
      const response = await api.get(
        `/v1/KIPBJ/list_paket/${userId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Paket');
    }
  };

  const getDataPaket = async (paketId, dataPaket) => {
    try {
      const response = await api.get(`/v1/KIPBJ/paket/${paketId}`, dataPaket);
      return response.data;
    } catch (error) {
      throw new Error('Data Paket Tidak Tersedia');
    }
  };

  const updateDataPaket = async (paketId, dataPaket) => {
    try {
      const response = await api.put(`/v1/KIPBJ/paket/${paketId}`, dataPaket, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Data Paket');
    }
  };

  const getDataDahsboardPJB = async (userId, lenght, page, search) => {
    try {
      const response = await api.get(
        `v1/KIPBJ/lelang/${userId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  return {
    getPanitia,
    postPanitia,
    editPanitia,
    updatePanitia,
    getAnggotaPanitia,
    updateAnggotaPanitia,
    deleteAnggotaPanitia,
    getListPaket,
    getDataPaket,
    updateDataPaket,
    getDataDahsboardPJB,
  };
};
