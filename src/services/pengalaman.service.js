import api from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';

export const pengalamanService = () => {
  const { userToken } = useAuthContext();
  const getPengalaman = async (penyediaId, lenght, page, search) => {
    try {
      const response = await api.get(
        `v1/RKN/list_pengalaman/${penyediaId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data pengalaman');
    }
  };

  const postPengalaman = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.post(
        `v1/RKN/pengalaman/${penyediaId}`,
        dataPenyedia,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Submit Data Pengalaman');
    }
  };

  const editPengalaman = async (penId, dataPenyedia) => {
    try {
      const response = await api.get(
        `v1/RKN/pengalaman/${penId}`,
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
        `v1/RKN/pengalaman/${penId}`,
        dataPenyedia,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Update Data Pengalaman');
    }
  };

  return { getPengalaman, postPengalaman, editPengalaman, updatePengalaman };
};
