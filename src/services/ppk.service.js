import api from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';

export const ppkService = () => {
  const { userToken } = useAuthContext();
  const getDatalLelangPpk = async (llsId) => {
    try {
      const response = await api.get(`/v1/PPK/detail_lelang/${llsId}`);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mendapatkan Data');
    }
  };

  const getDokLelangPPK = async (llsId) => {
    try {
      const response = await api.get(`v1/PPK/dokumen/${llsId}`);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const getKontrakPPK = async (llsId) => {
    try {
      const response = await api.get(`v1/PPK/base_kontrak/${llsId}`);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const getSuratKontrak = async (llsId) => {
    try {
      const response = await api.get(`v1/PPK/init_sppbj/${llsId}`);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  return {
    getDatalLelangPpk,
    getDokLelangPPK,
    getKontrakPPK,
    getSuratKontrak,
  };
};
