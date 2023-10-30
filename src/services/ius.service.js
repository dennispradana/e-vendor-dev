import api from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';

export const iusService = () => {
  const { userToken } = useAuthContext();
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
        `v1/RKN/list_ijin/${penyediaId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Izin Usaha');
    }
  };

  const postIzinUsaha = async (iusId, dataPenyedia) => {
    try {
      const response = await api.post(
        `v1/RKN/ijin/${penyediaId}`,
        dataPenyedia,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Izin Usaha');
    }
  };

  const editIzinUsaha = async (iusId, dataPenyedia) => {
    try {
      const response = await api.get(`v1/RKN/ijin/${iusId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Izin Usaha');
    }
  };

  const updateIzinUsaha = async (iusId, dataPenyedia) => {
    try {
      const response = await api.put(`v1/RKN/ijin/${iusId}`, dataPenyedia, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
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
