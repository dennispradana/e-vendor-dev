import api from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';

export const pegawaiService = () => {
  const { userToken } = useAuthContext();

  const getPegawai = async (lenght, page, search) => {
    try {
      const response = await api.get(
        `/v1/pegawai?length=${lenght}&page=${page}&q=${search}`,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Pegawai');
    }
  };

  const postPegawai = async (dataPegawai) => {
    try {
      const response = await api.post('/v1/pegawai', dataPegawai, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Menambah Data Pegawai');
    }
  };

  const editPegawai = async (pegawaiId, dataPegawai) => {
    try {
      const response = await api.get(`/v1/pegawai/${pegawaiId}`, dataPegawai, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Pegawai');
    }
  };

  const updatePegawai = async (pegawaiId, dataPegawai) => {
    try {
      const response = await api.put(`/v1/pegawai/${pegawaiId}`, dataPegawai, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Data Pegawai');
    }
  };
  return { getPegawai, postPegawai, updatePegawai, editPegawai };
};
