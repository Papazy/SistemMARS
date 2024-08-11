import { useAuth } from "../../auth/AuthContext";
import { useEffect, useState } from "react";
import { downloadDokument } from "../../config/utils";

const EditModalKapal = ({tipe = "datang", isOpen, setIsOpen, rowId, onEditSuccess, data }) => {

  const [nama_agen_kapal, setNamaAgenKapal] = useState("");
  const [perusahaan_agen_kapal, setPerusahaanAgenKapal] = useState("");
  const [imo_number, setIMONumber] = useState("");
  const [nama_kapal, setNamaKapal] = useState("");
  const [kebangsaan_kapal, setKebangsaanKapal] = useState("");
  const [data_cru_indonesia, setDataCRUIndonesia] = useState("");
  const [data_cru_asing, setDataCRUAsing] = useState("");
  const [pelabuhan_asal, setPelabuhanAsal] = useState("");
  const [pelabuhan_tujuan, setPelabuhanTujuan] = useState("");
  const [service_location, setServiceLocation] = useState("");
  const [jadwal_kedatangan, setJadwalKedatangan] = useState("");
  const [tujuan_kedatangan, setTujuanKedatangan] = useState("");
  const [jadwal_keberangkatan, setJadwalKeberangkatan] = useState("");
  const [tujuan_keberangkatan, setTujuanKeberangkatan] = useState("");
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("")
  const [date, setDate] = useState(null);
  
  const { token } = useAuth();
  
  
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/kapal/${tipe}/` + rowId,
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
          setNamaAgenKapal(data.nama_agen_kapal);
          setPerusahaanAgenKapal(data.perusahaan_agen_kapal);
          setIMONumber(data.imo_number);
          setNamaKapal(data.nama_kapal);
          setKebangsaanKapal(data.kebangsaan_kapal);
          setDataCRUIndonesia(data.data_cru_indonesia);
          setDataCRUAsing(data.data_cru_asing);
          setPelabuhanAsal(data.pelabuhan_asal);
          setPelabuhanTujuan(data.pelabuhan_tujuan);
          setServiceLocation(data.service_location);
          if(tipe === "berangkat"){
            setJadwalKeberangkatan(data.jadwal_keberangkatan);
            setTujuanKeberangkatan(data.tujuan_keberangkatan);
          }else{
            setJadwalKedatangan(data.jadwal_kedatangan);
            setTujuanKedatangan(data.tujuan_kedatangan);
          }
          setFilename(data.dokument)
          
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
    if(jadwal_keberangkatan !== ""){
      setDate(new Date(jadwal_keberangkatan).toISOString().substring(0, 10))
    }else if(jadwal_kedatangan !== ""){
      setDate(new Date(jadwal_kedatangan).toISOString().substring(0, 10))
    }  
  }, [jadwal_keberangkatan, jadwal_kedatangan])
  
  
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

    formData.append("nama_agen_kapal", nama_agen_kapal);
    formData.append("perusahaan_agen_kapal", perusahaan_agen_kapal);
    formData.append("imo_number", imo_number);
    formData.append("nama_kapal", nama_kapal);
    formData.append("kebangsaan_kapal", kebangsaan_kapal);
    formData.append("data_cru_indonesia", data_cru_indonesia);
    formData.append("data_cru_asing", data_cru_asing);
    formData.append("pelabuhan_asal", pelabuhan_asal);
    formData.append("pelabuhan_tujuan", pelabuhan_tujuan);
    formData.append("service_location", service_location);
    formData.append("jadwal_keberangkatan", jadwal_keberangkatan);
    formData.append("tujuan_keberangkatan", tujuan_keberangkatan);
    formData.append("jadwal_kedatangan", jadwal_kedatangan);
    formData.append("tujuan_kedatangan", tujuan_kedatangan);
    
    console.log("data formdata")
    console.log(formData.get("dokument"));
    console.log(formData.get("nama_agen_kapal"));
    console.log(formData.get("perusahaan_agen_kapal"));
    console.log(formData.get("imo_number"));
    console.log(formData.get("nama_kapal"));
    console.log(formData.get("kebangsaan_kapal"));
    console.log(formData.get("data_cru_indonesia"));
    console.log(formData.get("data_cru_asing"));
    console.log(formData.get("pelabuhan_asal"));


    try {
      const response = await fetch(
        `http://localhost:3001/api/kapal/${tipe}/` + id,
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
                  <div className="pl-[17px] font-bold">Nama Agen Kapal</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={nama_agen_kapal}
                      onChange={(e) => setNamaAgenKapal(e.target.value)}
                      placeholder="Masukkan nama Agen Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">
                    Perusahaan Agen Kapal
                  </div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={perusahaan_agen_kapal}
                      onChange={(e) => setPerusahaanAgenKapal(e.target.value)}
                      placeholder="Masukkan Perusahaan Agen Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">IMO Number</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={imo_number}
                      onChange={(e) => setIMONumber(e.target.value)}
                      placeholder="Masukkan IMO Number"
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
                  <div className="pl-[17px] font-bold">Data Crew Indonesia</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={data_cru_indonesia}
                      onChange={(e) => setDataCRUIndonesia(e.target.value)}
                      placeholder="Masukkan Data Kru Indonesia"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Data Crew Asing</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={data_cru_asing}
                      onChange={(e) => setDataCRUAsing(e.target.value)}
                      placeholder="Masukkan Data Crew Asing"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">
                    Pelabuhan Asal Kapal
                  </div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={pelabuhan_asal}
                      onChange={(e) => setPelabuhanAsal(e.target.value)}
                      placeholder="Masukkan Pelabuhan Asal Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">
                    Pelabuhan Tujuan Kapal
                  </div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={pelabuhan_tujuan}
                      onChange={(e) => setPelabuhanTujuan(e.target.value)}
                      placeholder="Masukkan Pelabuhan Tujuan Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Lokasi Pelayanan</div>
                  <div className="pt-[11px] relative">
                    <select
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px] appearance-none"
                      value={service_location}
                      onChange={(e) => setServiceLocation(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Masukkan Lokasi Pelayanan
                      </option>
                      <option value="Kantor Imigrasi Kelas II TPI Lhokseumawe">
                        Kantor Imigrasi Kelas II TPI Lhokseumawe
                      </option>
                      <option value="Kantor Imigrasi Kelas II TPI Sabang">
                        Kantor Imigrasi Kelas II TPI Sabang
                      </option>
                      <option value="Kantor Imigrasi Kelas I TPI Banda Aceh">
                        Kantor Imigrasi Kelas I TPI Banda Aceh
                      </option>
                    </select>
                  </div>
                </div>
                <div>

                  <div className="pl-[17px] font-bold">
                    {tipe === "berangkat" ? "Jadwal Keberangkatan" : "Jadwal Kedatangan"}
                  </div>
                  <div className="pt-[11px] relative">
                    <input
                      type="date"
                      defaultValue={date}
                      placeholder="Pilih Jadwal Kedatangan Kapal"
                      onChange={(e) => setJadwalKedatangan(e.target.value)}
                      className="pl-[17px] pr-[20px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px] appearance-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">
                    {tipe === "berangkat" ? "Tujuan Keberangkatan" : "Tujuan Kedatangan"}
                  </div>
                  <div className="pt-[11px] relative">
                    <select
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px] appearance-none"
                      value={tipe === "berangkat" ? tujuan_keberangkatan : tujuan_kedatangan}
                      onChange={(e) => setTujuanKedatangan(e.target.value)}
                    >
                      <option value="Medical Evacuation">Medical Evacuation</option>
                      <option value="Clearance">Clearance</option>
                    </select>
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
                    <ul className="flex flex-col items-start">
                      <li>- Crew list</li>

                      <li>- Last port clearance </li>

                      <li>- Surat pemberitahuan </li>
                    </ul>
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

export default EditModalKapal;
