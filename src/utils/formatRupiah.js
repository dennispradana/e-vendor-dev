export const formatRp = (value) => {
  const values = parseFloat(value);
  if (isNaN(values)) {
    return 'Format Tidak Valid';
  }
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return formatter.format(values);
};
