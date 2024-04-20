import api from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';

export const pjbService = () => {
  const { userToken } = useAuthContext();
  const getDatalLelangPjb = async (llsId) => {
    try {
      const response = await api.get(`/v1/KIPBJ/detail_lelang/${llsId}`);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mendapatkan Data');
    }
  };

  const getDokLelang = async (llsId) => {
    try {
      const response = await api.get(`v1/KIPBJ/dokumen/${llsId}`);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  return {
    getDatalLelangPjb,
    getDokLelang,
  };
};
