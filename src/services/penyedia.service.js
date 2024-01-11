import api from '../config/api';
import { useAuthContext } from '../contexts/AuthContext';

export const penyediaService = () => {
  const { userToken } = useAuthContext();
  const btkUsaha = async () => {
    try {
      const response = await api.get('v1/b_usaha');
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Bentuk Usaha');
    }
  };

  const jenisIzin = async () => {
    try {
      const response = await api.get('jenis_ijin');
      return response;
    } catch (error) {
      throw new Error('Gagal Mengambil Jenis Izin');
    }
  };

  const registerPenyedia = async (dataPenyedia) => {
    try {
      const response = await api.post('v1/penyedia', dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mendaftar');
    }
  };

  const getPenyedia = async (lenght, page, search) => {
    try {
      const response = await api.get(
        `/v1/penyedia?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Penyedia');
    }
  };

  const editPenyedia = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.get(`v1/penyedia/${penyediaId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Penyedia');
    }
  };

  const updatePenyedia = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.put(`v1/penyedia/${penyediaId}`, dataPenyedia);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Data Penyedia');
    }
  };

  const getIzinUsaha = async (penyediaId, dataPenyedia) => {
    try {
      const response = await api.get(
        `/penyedia/ijin/${penyediaId}`,
        dataPenyedia
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data Izin Usaha');
    }
  };

  const getAllPaketBaru = async (userId, lenght, page, search) => {
    try {
      const response = await api.get(
        `v1/RKN/paket_baru/${userId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const getPaketBaru = async (llsId, dataPaket) => {
    try {
      const response = await api.get(`v1/RKN/paket/${llsId}`, dataPaket);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const getIkutLelang = async (llsId) => {
    try {
      const response = await api.get(`v1/RKN/ikut_lelang/${llsId}`, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Terjadi Kesalahan');
    }
  };

  const getDataDahsboardRKN = async (userId, lenght, page, search) => {
    try {
      const response = await api.get(
        `v1/RKN/lelang/${userId}?length=${lenght}&page=${page}&q=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const getPenawaran = async (llsId) => {
    try {
      const response = await api.get(`v1/RKN/penawaran/${llsId}`, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const getDokPenawaran = async (llsId, dataDokumen) => {
    try {
      const response = await api.get(`v1/RKN/dokumen/${llsId}`, dataDokumen);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const getDokKualifikasi = async (llsId) => {
    try {
      const response = await api.get(`v1/RKN/kualifikasi/${llsId}`, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const updateDokKualifikasi = async (llsId, dataKulifikasi) => {
    try {
      const response = await api.put(
        `v1/RKN/kualifikasi/${llsId}`,
        dataKulifikasi,
        {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Gagal Memperbarui Data');
    }
  };

  return {
    btkUsaha,
    jenisIzin,
    registerPenyedia,
    getPenyedia,
    editPenyedia,
    updatePenyedia,
    getIzinUsaha,
    getAllPaketBaru,
    getPaketBaru,
    getIkutLelang,
    getDataDahsboardRKN,
    getPenawaran,
    getDokPenawaran,
    getDokKualifikasi,
    updateDokKualifikasi,
  };
};
