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

  const getSppbj = async (sppbjId) => {
    try {
      const response = await api.get(`v1/PPK/sppbj/${sppbjId}`);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const postSppbj = async (llsId, dataKontrak) => {
    try {
      const response = await api.post(
        `v1/PPK/create_sppbj/${llsId}`,
        dataKontrak,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const updateSppbj = async (sppbjId, dataKontrak) => {
    try {
      const response = await api.put(`v1/PPK/sppbj/${sppbjId}`, dataKontrak, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
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
    getSppbj,
    postSppbj,
    updateSppbj,
  };
};
