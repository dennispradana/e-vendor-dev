import api from '../config/api';

export const evaluasiService = () => {
  const getEvaluasi = async (llsId) => {
    try {
      const response = await api.get(`v1/PP/eval_lelang/${llsId}`);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const getDokEvaluasi = async (llsId, dataDokumen) => {
    try {
      const response = await api.get(`v1/PP/dokumen/${llsId}`, dataDokumen);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  return {
    getEvaluasi,
    getDokEvaluasi,
  };
};
