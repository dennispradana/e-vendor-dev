import api from '../config/api';

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await api.post('auth/refresh-token', {
      refreshToken: refreshToken,
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Gagal mendapatkan token akses baru:', error);
    throw error;
  }
};
