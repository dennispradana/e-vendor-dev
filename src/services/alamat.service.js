import wilayah from '../config/wilayah';

export const alamat = () => {
  const provinsi = async () => {
    try {
      const response = await wilayah.get('/propinsi');
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  const kota = async (provinsiId) => {
    try {
      const response = await wilayah.get(`/kota/${provinsiId}`);
      return response.data;
    } catch (error) {
      throw new Error('Gagal Mengambil Data');
    }
  };

  return { provinsi, kota };
};
