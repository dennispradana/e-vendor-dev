import api from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';

export const sdmService = () => {
  const { userToken } = useAuthContext();
  const getSdm = async (penyediaId, lenght, page, search) => {
    try {
      const response = await api.get(
        `v1/RKN/list_staf/${penyediaId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Staf');
    }
  };

  const postSdm = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.post(
        `v1/RKN/staf/${penyediaId}`,
        dataPenyedia,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Submit Data Staf');
    }
  };

  const editSdm = async (stpId, dataPenyedia) => {
    try {
      const response = await api.get(`v1/RKN/staf/${stpId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Staf');
    }
  };

  const updateSdm = async (stpId, dataPenyedia) => {
    try {
      const response = await api.put(`v1/RKN/staf/${stpId}`, dataPenyedia, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Update Data Staf');
    }
  };

  return { getSdm, editSdm, postSdm, updateSdm };
};
