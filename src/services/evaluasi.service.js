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

  const getFile = async (idContent, fileData, maxRetries = 3) => {
    let retries = 0;

    while (retries < maxRetries) {
      try {
        const response = await api.get(
          `v1/list?id_content=${idContent}`,
          fileData
        );
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.log(
            `Rate limit exceeded. Retrying in ${Math.pow(2, retries)} seconds.`
          );
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, retries) * 1000)
          );
          retries++;
        } else {
          throw new Error('Terjadi kesalahan saat menampilkan file');
        }
      }
    }

    throw new Error('Gagal mendapatkan file setelah beberapa percobaan');
  };

  return {
    getEvaluasi,
    getDokEvaluasi,
    getFile,
  };
};
