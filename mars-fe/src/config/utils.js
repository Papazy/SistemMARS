const formatDate = (isoDate) =>{
  const date = new Date(isoDate);
  return date.toLocaleString('id-ID', {
    weekday: 'long', // menampilkan hari dalam seminggu (opsional)
    year: 'numeric',
    month: 'long', // menampilkan nama bulan
    day: 'numeric',
    hour12: false // menggunakan format 24 jam
  })
}
const formatDateWithTime = (isoDate) =>{
  const date = new Date(isoDate);
  return date.toLocaleString('id-ID', {
    weekday: 'long', // menampilkan hari dalam seminggu (opsional)
    year: 'numeric',
    month: 'long', // menampilkan nama bulan
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // menggunakan format 24 jam
  })
}

const downloadDokument = async (dokumentName) => {
  try {
    const response = await fetch("http://localhost:3001/api/download/" + dokumentName, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error('Failed to download file');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = dokumentName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url); // Clean up after the download
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

export {formatDate, formatDateWithTime, downloadDokument}