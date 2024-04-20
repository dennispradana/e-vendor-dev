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

  const getKontrak = async (kontrakId) => {
    try {
      const response = await api.get(`v1/PPK/kontrak/${kontrakId}`);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const updateKontrak = async (kontrakId, dataKontrak) => {
    try {
      const response = await api.put(
        `v1/PPK/kontrak/${kontrakId}`,
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

  const downloadFileSppbj = async (sppbjId) => {
    try {
      const response = await api.get(`v1/PPK/print_sppbj/${sppbjId}`, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      throw new Error('terjadi kesalahaan saat mengunduh File');
    }
  };

  const downloadFileKontrak = async (kontrakId) => {
    try {
      const response = await api.get(`v1/PPK/print_kontrak/${kontrakId}`, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      throw new Error('terjadi kesalahaan saat mengunduh File');
    }
  };

  const getSpk = async (spkId) => {
    try {
      const response = await api.get(`v1/PPK/spk/${spkId}`);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const updateSpk = async (spkId, dataSpk) => {
    try {
      const response = await api.put(`v1/PPK/spk/${spkId}`, dataSpk, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const downloadFileSpk = async (spkId) => {
    try {
      const response = await api.get(`v1/PPK/print_spk/${spkId}`, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      throw new Error('terjadi kesalahaan saat mengunduh File');
    }
  };

  const getPenilaian = async (llsId) => {
    try {
      const response = await api.get(`v1/PPK/nilai/${llsId}`);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const getDetailPenilaian = async (llsId, ktrId) => {
    try {
      const response = await api.get(`v1/PPK/detail_nilai/${llsId}/${ktrId}`);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const updateNilai = async (dataNilai) => {
    try {
      const response = await api.put(`v1/PPK/penilaian`, dataNilai, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Gagal Menyimpan Penilaian');
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
    getKontrak,
    updateKontrak,
    downloadFileSppbj,
    downloadFileKontrak,
    getSpk,
    updateSpk,
    downloadFileSpk,
    getPenilaian,
    getDetailPenilaian,
    updateNilai,
  };
};
