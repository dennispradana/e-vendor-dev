import api from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';

export const manajerialService = () => {
  const { userToken } = useAuthContext();
  const getManajer = async (penyediaId, lenght, page, search) => {
    try {
      const response = await api.get(
        `v1/RKN/list_manajer/${penyediaId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Manajerial');
    }
  };

  const postManajer = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.post(
        `v1/RKN/manajer/${penyediaId}`,
        dataPenyedia,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Manajerial');
    }
  };

  const editManajer = async (manajerialId, dataPenyedia) => {
    try {
      const response = await api.get(
        `v1/RKN/manajer/${manajerialId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Manajerial');
    }
  };

  const updateManajer = async (manajerialId, dataPenyedia) => {
    try {
      const response = await api.put(
        `v1/RKN/manajer/${manajerialId}`,
        dataPenyedia,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Manajerial');
    }
  };

  return { getManajer, postManajer, updateManajer, editManajer };
};
