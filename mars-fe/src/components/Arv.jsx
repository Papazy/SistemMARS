import React from "react";
import logofix from "../assets/logofix.png";
import { useState } from "react";
import Modal from "./ModalAuth";
import { useAuth } from "../auth/AuthContext";

const Arv = () => {
  const {token, user} = useAuth()
  const [nama_agen_kapal, setNamaAgenKapal] = useState(()=> user.username || "");
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
  const [file, setFile] = useState(null);

  
  // handle ketika ganti file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      selectedFile.type === "application/pdf" &&
      selectedFile.size < 10 * 1024 * 1024
    ) {
      setFile(selectedFile);
    } else {
      alert("File harus berupa pdf dan ukuran file maksimal 10MB");
    }
  };
  

  const [isShowModal, setShowModal] = useState(false)

  const handleDataKedatangan = async (e) => {
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
    formData.append("jadwal_kedatangan", jadwal_kedatangan);
    formData.append("tujuan_kedatangan", tujuan_kedatangan);
    try {
      const response = await fetch(
        "http://localhost:3001/api/createDatangKapal",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response.ok) {
        setShowModal(true)
      } else {
        alert("failed");
      }
    } catch (error) {
      console.log("Error upload data: ", error);
      alert("Error ketika upload data");
    }
  };
  
  const closeModal = () => {
    setShowModal(false);
    
  };

  return (
    <div>
      {isShowModal && <Modal onClose={closeModal} link={"https://www.marinetraffic.com/en/ais/details/ships/imo:"+imo_number}/> }
      <div className="px-[50px] py-[50px]">
        <div className="flex justify-between items-centergap-[100px] absolute">
          <a className="" href="/">
            <img className="w-[113px] h-[101px]" src={logofix} alt="" />
          </a>
        </div>
        <div className=" flex justify-center gap-[50px] text-[24px] font-bold mt-10 ">
          <ul className="flex justify-center gap-[50px] border rounded-2xl px-5 py-2">
            <li>
              <a className="text-[#1A719C]" href="/arrival">
                FORM KEDATANGAN
              </a>
            </li>
            <div className="border-l-2"></div>
            <li>
              <a className="hover:text-[#1A719C]" href="/departure">
                FORM KEBERANGKATAN
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-[48px] font-bold flex pt-[50px] justify-center gap-[10px]">
            <div>FORM</div>
            <div className="text-[#1A719C]">KEDATANGAN</div>
            <div>KAPAL</div>
          </div>
          <div className="flex justify-center font-bold text-[20px] text-[#5C5C68]">
            <div className="pt-[11px]">Silahkan isi data dibawah</div>
          </div>
        </div>
        <div className="pt-[48px] flex justify-center">
          <div className="flex text-left text-[20px]">
            <form
              className="flex justify-between items-end gap-[54px]"
              onSubmit={handleDataKedatangan}
              encType="multipart/form-data"
            >
              <div className="grid gap-[30px]">
                <div>
                  <div className="pl-[17px] font-bold">Nama Agen Kapal</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={nama_agen_kapal}
                      onChange={(e) => setNamaAgenKapal(e.target.value)}
                      placeholder="Masukkan nama Agen Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Perusahaan Agen Kapal</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={perusahaan_agen_kapal}
                      onChange={(e) => setPerusahaanAgenKapal(e.target.value)}
                      placeholder="Masukkan Perusahaan Agen Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
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
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
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
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
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
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
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
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
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
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Pelabuhan Asal Kapal</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={pelabuhan_asal}
                      onChange={(e) => setPelabuhanAsal(e.target.value)}
                      placeholder="Masukkan Pelabuhan Asal Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Pelabuhan Tujuan Kapal</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={pelabuhan_tujuan}
                      onChange={(e) => setPelabuhanTujuan(e.target.value)}
                      placeholder="Masukkan Pelabuhan Tujuan Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Lokasi Pelayanan</div>
                  <div className="pt-[11px] relative">
                    <select
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px] appearance-none"
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
                  <div className="pl-[17px] font-bold">Jadwal Kedatangan Kapal</div>
                  <div className="pt-[11px] relative">
                    <input
                      type="date"
                      value={jadwal_kedatangan}
                      placeholder="Pilih Jadwal Kedatangan Kapal"
                      onChange={(e) => setJadwalKedatangan(e.target.value)}
                      className="pl-[17px] pr-[20px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px] appearance-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Tujuan Kedatangan</div>
                  <div className="pt-[11px] relative">
                    <select
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px] appearance-none"
                      value={tujuan_kedatangan}
                      onChange={(e) => setTujuanKedatangan(e.target.value)}
                    >
                      <option>Pilih Tujuan Kedatangan</option>
                      <option value="Medical Evacuation">
                        Medical Evacuation
                      </option>
                      <option value="Clearance">Clearance</option>
                    </select>
                  </div>
                </div>
                <div className="">
                  <div className="pl-[17px] font-bold">Upload Dokumen</div>
                  <div className="pt-[11px]">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      placeholder="Silahkan Upload Dokumen"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px] pt-[15px]"
                    />
                  </div>
                  <div className="font-semibold text-sm text-red-600 mt-2 ml-2">
                    &#9432; Dokumen maksimal 10mb, harap gabungkan seluruh dokumen jadi satu
                    <ul>
                    <li>- Crew list</li>

                    <li>- Last port clearance </li>
                    
                    <li>- Surat pemberitahuan </li>

                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-[214px] h-[65px] bg-[#1A719C] rounded-[20px] text-white"
                >
                  Submit Ship Data
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="pt-[200px]">
        <div className="footer h-[100px] bg-[#1A719C] flex justify-center place-items-center font-bold text-[20px] text-white">
          Integrated of Banda Aceh, Sabang, and Lhokseumawe Information System
        </div>
      </div>
    </div>
  );
};

export default Arv;
