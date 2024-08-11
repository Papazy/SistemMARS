import { useAuth } from "../../auth/AuthContext";
import { useEffect, useState } from "react";
import { downloadDokument } from "../../config/utils";

const EditModalKru = ({tipe, isOpen, setIsOpen, rowId, onEditSuccess, data }) => {

  const [nama_cru, setNamaCru] = useState("");
  const [no_paspor, setNoPaspor] = useState("");
  const [kebangsaan_cru, setKebangsaanCRU] = useState("");
  const [tg_rencana_sign_on, setRencanaOn] = useState("");
  const [tg_rencana_sign_off, setRencanaOff] = useState("");
  const [nama_kapal, setNamaKapal] = useState("");
  const [kebangsaan_kapal, setKebangsaanKapal] = useState("");
  const [surat, setSurat] = useState("");
  const [waktu_lapor, setWaktuLapor] = useState("");
  const [nama_agen, setNamaAgen] = useState("");
  const [filename, setFilename] = useState("");
  const [date, setDate] = useState(null);
  const [dateLapor, setDateLapor] = useState(null);
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/kru/${tipe}/` + rowId,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
               
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setNamaCru(data.nama_cru)
          setNoPaspor(data.no_paspor)
          setKebangsaanCRU(data.kebangsaan_cru)
          if(tipe === "sign_on"){
            setRencanaOn(data.tg_rencana_sign_on)
          }else{
            setRencanaOff(data.tg_rencana_sign_off)
          }
          setNamaKapal(data.nama_kapal)
          setKebangsaanKapal(data.kebangsaan_kapal)
          setSurat(data.surat)
          setFilename(data.surat)
          setWaktuLapor(data.waktu_lapor)
          setNamaAgen(data.nama_agen)
          
        } else {
          console.log("Gagal mengambil data");
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  },[rowId, token, tipe])

  useEffect(()=>{
    if(tg_rencana_sign_on !== ""){
      setDate(new Date(tg_rencana_sign_on).toISOString().substring(0, 10))
    }else if(tg_rencana_sign_off !== ""){
      setDate(new Date(tg_rencana_sign_off).toISOString().substring(0, 10))
    }  
    if(waktu_lapor !== ""){
      setDateLapor(new Date(waktu_lapor).toISOString().substring(0, 10))
    }
  }, [tg_rencana_sign_on, tg_rencana_sign_off, waktu_lapor])
  
  
  if (!isOpen) return null;
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if(selectedFile &&  selectedFile.type === 'application/pdf' && selectedFile.size < 10 * 1024 * 1024){
      setFile(selectedFile);
    }else{
      alert('File harus berupa pdf dan ukuran file maksimal 10MB');
    }
    
  }

  const editRow = async (e, id) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("dokument", file);

    formData.append("nama_cru", nama_cru);
    formData.append("no_paspor", no_paspor);
    formData.append("kebangsaan_cru", kebangsaan_cru);
    if(tipe === "sign_on"){
      formData.append("tg_rencana_sign_on", date);
    }else{
      formData.append("tg_rencana_sign_off", date);
    }
    formData.append("surat", surat);
    formData.append("waktu_lapor", dateLapor);
    formData.append("nama_agen", nama_agen);
    formData.append("nama_kapal", nama_kapal);
    formData.append("kebangsaan_kapal", kebangsaan_kapal);
  


    try {
      const response = await fetch(
        `http://localhost:3001/api/kru/${tipe}/` + id,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      console.log(response);
      if (response.ok) {
        console.log("Data berhasil diperbarui");
        onEditSuccess();
      } else {
        console.log("Data gagal diperbarui");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsOpen(false);
    }
  };

  const handleClickOutside =(e) => {
    if(e.target.id ==='popup-modal'){
      setIsOpen(false)
    }
  }

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={
        "overflow-y-auto overflow-x-hidden z-50 justify-center items-center flex fixed bg-[rgba(0,0,0,0.1)] transition transform h-screen w-full py-20"
      }
      onClick={(e) => handleClickOutside(e)}
    >
      <div className="relative p-4 w-screen max-w-[100vh] max-h-full pb-20">
        <div className="relative bg-[#ffffff] rounded-lg shadow px-24 pb-20">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 ">
            <h3 className="mb-5 text-lg font-bold text-[#1d526c] text-center">
              Edit data
            </h3>
            <form
              className="flex justify-center items-center"
              onSubmit={(e) => {editRow(e, rowId)}}
              encType="multipart/form-data"
            >
              <div className="grid gap-[20px]">
                <div>
                  <div className="pl-[17px] font-bold">Nama Kru</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"


                      value={nama_cru}
                      onChange={(e) => setNamaCru(e.target.value)}
                      placeholder="Masukkan nama Agen Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">
                    No Paspor
                  </div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={no_paspor}
                      onChange={(e) => setNoPaspor(e.target.value)}
                      placeholder="Masukkan No Paspor"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Kebangsaan</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={kebangsaan_cru}
                      onChange={(e) => setKebangsaanCRU(e.target.value)}
                      placeholder="Masukkan Kebangsaan kru"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Tanggal Sign {tipe === 'sign_on' ? 'On' : 'Off'}</div>
                  <div className="pt-[11px]">
                    <input
                      type="date"

                      defaultValue={date}
                      onChange={(e) => setNamaKapal(e.target.value)}
                      placeholder="Masukkan Nama Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Nama Kapal</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={nama_kapal}
                      onChange={(e) => setNamaKapal(e.target.value)}
                      placeholder="Masukkan Nama Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Kebangsaan Kapal</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={kebangsaan_kapal}
                      onChange={(e) => setKebangsaanKapal(e.target.value)}
                      placeholder="Masukkan Kebangsaan Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">waktu_lapor</div>
                  <div className="pt-[11px]">
                    <input
                      type="date"
                      defaultValue={ dateLapor }
                      onChange={(e) => setWaktuLapor(e.target.value)}
                      placeholder="Masukkan waktu"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Nama Agen</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={nama_agen}
                      onChange={(e) => setNamaAgen(e.target.value)}
                      placeholder="Masukkan Nama Agen"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div className="">
                  <div className="pl-[17px] font-bold">Upload Dokumen</div>
                  <div className="pt-[11px]">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e)}
                      placeholder="Silahkan Upload Dokumen"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px] pt-[15px]"
                    />
                  </div>
                  <div className="text-md my-2">
                      Dokumen Anda : <button className="text-blue-600 cursor-pointer" onClick={()=>{downloadDokument(filename)}}>lihat disini</button>
                  </div>
                  <div className="font-semibold text-sm text-red-600 mt-2 ml-2 flex flex-col items-start">
                    &#9432; Dokumen maksimal 10mb, harap gabungkan seluruh
                    dokumen jadi satu
          
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-[214px] h-[45px] bg-[#1A719C] rounded-[10px] text-white"
                >
                  Submit Ship Data
                </button>
              </div>
              <div></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModalKru;
