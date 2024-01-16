import api from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';

export const pajakService = () => {
  const { userToken } = useAuthContext();
  const getPajak = async (penyediaId, lenght, page, search) => {
    try {
      const response = await api.get(
        `v1/RKN/list_pajak/${penyediaId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Pajak');
    }
  };

  const postPajak = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.post(
        `v1/RKN/pajak/${penyediaId}`,
        dataPenyedia,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Submit Data Pajak');
    }
  };

  const editPajak = async (pjkId, dataPenyedia) => {
    try {
      const response = await api.get(`v1/RKN/pajak/${pjkId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Pajak');
    }
  };

  const updatePajak = async (pjkId, dataPenyedia) => {
    try {
      const response = await api.put(`v1/RKN/pajak/${pjkId}`, dataPenyedia, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
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
