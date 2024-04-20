import api from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';

export const aktaService = () => {
  const { userToken } = useAuthContext();
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
        `v1/RKN/akta/${penyediaId}`,
        dataPenyedia,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengirim Data Akta');
    }
  };

  const editAkta = async (lhkId, dataPenyedia) => {
    try {
      const response = await api.get(`v1/RKN/akta/${lhkId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Akta');
    }
  };

  const updateAkta = async (lhkId, dataPenyedia) => {
    try {
      const response = await api.put(`v1/RKN/akta/${lhkId}`, dataPenyedia, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengirim Data Akta');
    }
  };

  return { getAkta, editAkta, postAkta, updateAkta };
};
