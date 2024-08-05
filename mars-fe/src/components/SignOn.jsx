import React from "react";
import logofix from "../assets/logofix.png";
import { useState } from "react";
import Modal from "./ModalAuth";

const SignOn = () => {
  const [nama_cru, setNamaCru] = useState("");
  const [no_paspor, setNoPaspor] = useState("");
  const [kebangsaan_cru, setKebangsaanCRU] = useState("");
  const [tg_rencana_sign_on, setRencanaOn] = useState("");
  const [nama_kapal, setNamaKapal] = useState("");
  const [kebangsaan_kapal, setKebangsaanKapal] = useState("");
  const [surat, setSurat] = useState("");
  const [waktu_lapor, setWaktuLapor] = useState("");
  const [nama_agen, setNamaAgen] = useState("");

  const [file, setFile] = useState(null);
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
  const handleDataSignOn = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("dokument", file);

    formData.append("nama_cru", nama_cru);
    formData.append("no_paspor", no_paspor);
    formData.append("kebangsaan_cru", kebangsaan_cru);
    formData.append("tg_rencana_sign_on", tg_rencana_sign_on);
    formData.append("surat", surat);
    formData.append("waktu_lapor", waktu_lapor);
    formData.append("nama_agen", nama_agen);
    formData.append("nama_kapal", nama_kapal);
    formData.append("kebangsaan_kapal", kebangsaan_kapal);

    try {
      const response = await fetch(
        "http://localhost:3001/api/createSignOnCru",
        {
          method: "POST",
          body: formData,
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
      {isShowModal && <Modal onClose={closeModal}/> }
      <div className="px-[50px] py-[50px]">
      <div className="flex justify-between items-centergap-[100px] absolute">
          <a className="" href="/">
            <img className="w-[113px] h-[101px]" src={logofix} alt="" />
          </a>
        </div>
        <div className=" flex justify-center gap-[50px] text-[24px] font-bold mt-10 ">
          <ul className="flex justify-center gap-[50px] border rounded-2xl px-5 py-2">
            <li>
              <a className="text-[#1A719C]" href="/sign-on">
              Sign-On Form
              </a>
            </li>
            <div className="border-l-2"></div>
            <li>
              <a className="hover:text-[#1A719C]" href="/sign-off">
              Sign-Off Form
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-[48px] font-bold flex pt-[50px] justify-center gap-[10px]">
            <div>Crew</div>
            <div className="text-[#1A719C]">Sign-On</div>
            <div>Data Form</div>
          </div>
          <div className="flex justify-center font-bold text-[20px] text-[#5C5C68]">
            <div className="pt-[11px]">Fill in your crew details</div>
          </div>
        </div>
        <div className="pt-[48px] flex justify-center">
          <div className="flex  text-left text-[20px]">
            <form
              className="flex justify-between items-end gap-[54px]"
              onSubmit={handleDataSignOn}
              encType="multipart/form-data"
            >
              <div className="grid gap-[30px]">
                <div>
                  <div className="pl-[17px] font-bold">Nama Crew</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={nama_cru}
                      onChange={(e) => setNamaCru(e.target.value)}
                      placeholder="Input Nama Crew"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Nomor Passport</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={no_paspor}
                      onChange={(e) => setNoPaspor(e.target.value)}
                      placeholder="Input Nomor Passport"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Kebangsaan Crew</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={kebangsaan_cru}
                      onChange={(e) => setKebangsaanCRU(e.target.value)}
                      placeholder="Input Kebangsaan Crew"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Jadwal Sign On</div>
                  <div className="pt-[11px]">
                    <input
                      type="date"
                      value={tg_rencana_sign_on}
                      onChange={(e) => setRencanaOn(e.target.value)}
                      className="pl-[17px] pr-[20px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px] appearance-none"
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
                      placeholder="Input Nama Kapal"
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
                      placeholder="Input Kebangsaan Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Waktu Melapor</div>
                  <div className="pt-[11px]">
                    <input
                      type="date"
                      value={waktu_lapor}
                      placeholder="Input Waktu Melapor"
                      onChange={(e) => setWaktuLapor(e.target.value)}
                      className="pl-[17px] pr-[20px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px] appearance-none"
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
                      placeholder="Input Nama Agen"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px]"
                    />
                  </div>
                </div>
                  <div>
                    <div className="pl-[17px] font-bold">Upload Dokumen</div>
                    <div className="pt-[11px]">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        placeholder="Silahkan Upload Dokumen"
                        className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[65px] rounded-[20px] pt-[15px]"
                      />
                    </div>
                  <div className="font-semibold text-sm text-red-600 mt-2 ml-2">&#9432; Dokumen maksimal 10mb, harap gabungkan seluruh dokumen jadi satu

                  <ol><li>- Visa</li><li>- Paspor</li></ol>
                  </div>
                  </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-[214px] h-[65px] bg-[#1A719C] rounded-[20px] text-white"
                >
                  Create Data Crew
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

export default SignOn;
