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


const downloadDokument = async(dokumentName) => {
  try{
    const response = await fetch("http://localhost:3001/api/download/" + dokumentName, {
      method: "GET",
    })
    console.log(response)
  }catch(err){
    console.log(err)
    alert(err)
  }
}

export {formatDate, downloadDokument}