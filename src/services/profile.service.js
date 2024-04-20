import api from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';

export const userProfile = () => {
  const { userToken } = useAuthContext();
  const getProfilePegawai = async (userId) => {
    try {
      const response = await api.get(`/v1/pegawai/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Menghambil Data');
    }
  };

  const getProfilePenyedia = async (userId) => {
    try {
      const response = await api.get(`/v1/RKN/penyedia/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Menghambil Data');
    }
  };

  const updateProfilePegawai = async (userId, userData) => {
    try {
      const response = await api.put(`/v1/pegawai/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Data');
    }
  };

  const updateProfilePenyedia = async (userId, userData) => {
    try {
      const response = await api.put(`/v1/RKN/penyedia/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Data');
    }
  };

  return {
    getProfilePegawai,
    updateProfilePegawai,
    getProfilePenyedia,
    updateProfilePenyedia,
  };
};
