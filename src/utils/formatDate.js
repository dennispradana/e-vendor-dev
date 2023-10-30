export const formatDate = (date) => {
  const day = date.getDate().toString();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Augustus',
    'September',
    'Oktober',
    'Nopember',
    'Desember',
  ];
  const monthName = monthNames[monthIndex];

  return `${day} ${monthName} ${year}`;
};

export const getColorClass = (expirationDate) => {
  if (expirationDate) {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const oneMonthFromToday = new Date(today);
    oneMonthFromToday.setMonth(oneMonthFromToday.getMonth() + 1);

    if (expiration < today) {
      return 'text-red-500 font-semibold'; // Warna merah
    } else if (expiration < oneMonthFromToday) {
      return 'text-yellow-500 font-semibold'; // Warna kuning
    } else {
      return 'text-green-500 font-semibold'; // Warna hijau
    }
  }
  return 'text-black'; // Warna default jika tanggal tidak ada
};
