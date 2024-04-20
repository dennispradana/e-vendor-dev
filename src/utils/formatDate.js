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

export const formatDateTime = (date) => {
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
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${monthName} ${year} - ${hours}:${minutes}`;
};

export const formatEditDate = (date) => {
  const year = date.getFullYear(); // Mendapatkan tahun (yyyy)
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mendapatkan bulan (mm)
  const day = date.getDate().toString().padStart(2, '0'); // Mendapatkan tanggal (dd)

  return `${year}-${month}-${day}`;
};

export const getColorClass = (expirationDate) => {
  if (expirationDate) {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const oneMonthFromToday = new Date(today);
    oneMonthFromToday.setMonth(oneMonthFromToday.getMonth() + 1);

    if (expiration < today) {
      return 'text-red-500 font-semibold';
    } else if (expiration < oneMonthFromToday) {
      return 'text-yellow-500 font-semibold';
    } else {
      return 'text-green-500 font-semibold';
    }
  }
  return 'text-black';
};
