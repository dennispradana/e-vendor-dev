import api from '../config/api';

export const fileService = () => {
  const postFile = async (fileData) => {
    try {
      const response = await api.post('/v1/upload', fileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('terjadi kesalahan saat Mengupload File');
    }
  };
  const getFile = async (idContent, fileData) => {
    try {
      const response = await api.get(
        `v1/list?id_content=${idContent}`,
        fileData
      );
      return response.data;
    } catch (error) {
      throw new Error('terjasi keselahaan saat Menampilkan File');
    }
  };

  const downloadFile = async (idContent, versi, fileName) => {
    try {
      const response = await api.get(
        `v1/download?id_content=${idContent}&versi=${versi}`,
        fileName
      );
      return response;
    } catch (error) {
      throw new Error('terjadi kesalahaan saat mengunduh File');
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await api.get('/template', {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      throw new Error('terjadi kesalahaan saat mengunduh File');
    }
  };

  const deleteFile = async (idContent, versi) => {
    try {
      const response = await api.get(
        `v1/delete?id_content=${idContent}&versi=${versi}`
      );
      return response;
    } catch (error) {
      throw new Error('terjadi kesalahan saat menghapus File');
    }
  };

  return { postFile, getFile, downloadFile, deleteFile, downloadTemplate };
};
