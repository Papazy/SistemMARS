import React, { useState } from "react";
import logofix from "../assets/logofix.png";
import Footer from "./Footer";
import ModalError from "./ModalError";
import Modal from "./ModalAuthLogin";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id_agen_kapal, setIdAgenKapal] = useState("");
  const [nama_perusahaan, setNamaPerusahaan] = useState("");
  const [email, setEmail] = useState("");
  const [no_hp_agen, setNoHpAgen] = useState("");
  const [alamat_perusahaan, setAlamatPerusahaan] = useState("");

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalError, setIsShowModalError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/createRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        id_agen_kapal,
        nama_perusahaan,
        email,
        no_hp_agen,
        alamat_perusahaan,
      }),
    });
    if (response.ok) {
      const tampilkan = true
      console.log(tampilkan)
      setIsShowModal(tampilkan);
    } else{
      setIsShowModalError(true); 
    }
  };

  const closeModal = () => {
    setIsShowModal(false);
    setIsShowModalError(false);
  };
  
  return (
    <div>
      {isShowModal && <Modal onClose={closeModal} />}
      {isShowModalError && <ModalError show={isShowModalError} message={"Username sudah ada | Periksa kembali"} onClose={closeModal}/>}
      <div className="px-[50px] py-[20px]">
        <div className="flex justify-between items-centergap-[100px] absolute">
              <a className="" href="/home">
                <img className="w-[113px] h-[101px]" src={logofix} alt="" />
              </a>
            </div>
          <div className="mt-10">
              <ul className="flex justify-center items-center gap-[85px] text-[24px] font-bold">
                <li>
                  <a className="hover:text-[#1A719C]" href="/loginuser">
                    Login as User
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#1A719C]" href="/loginadmin">
                    Login as Admin
                  </a>
                </li>
                <li>
                  <a className="text-[#1A719C]" href="/register">
                    Register as User
                  </a>
                </li>
              </ul>
         
          </div>
        <div className="flex justify-center">
          <div className="px-[200px] ">
            <div className="">
              <div className="flex justify-center text-[36px] font-bold pt-[50px]">
                <div>Create Your Account</div>
              </div>
              <div className="flex justify-center">
                <div>Welcome! Please fill the form to registered</div>
              </div>
            </div>
            <div className="pt-[34px]">
              <div className="flex text-left text-[16px]">
                <form
                  className="flex justify-between gap-[54px] border px-10 py-5 rounded-xl"
                  onSubmit={handleRegister}
                >
                  <div className="grid gap-[3px]">
                    <div>
                      <div className="font-bold">Username</div>
                      <div className="pt-[8px]">
                        <input
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[515px] h-[50px] rounded-[10px]"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Password</div>
                      <div className="pt-[8px]">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[515px] h-[50px] rounded-[10px]"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Id Agen Kapal</div>
                      <div className="pt-[8px]">
                        <input
                          type="text"
                          value={id_agen_kapal}
                          onChange={(e) => setIdAgenKapal(e.target.value)}
                          placeholder="Id Agen Kapal"
                          className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[515px] h-[50px] rounded-[10px]"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Nama Perusahaan</div>
                      <div className="pt-[8px]">
                        <input
                          type="text"
                          value={nama_perusahaan}
                          onChange={(e) => setNamaPerusahaan(e.target.value)}
                          placeholder="Nama Perusahaan"
                          className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[515px] h-[50px] rounded-[10px]"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Email</div>
                      <div className="pt-[8px]">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[515px] h-[50px] rounded-[10px]"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Nomor Handphone Agen</div>
                      <div className="pt-[8px]">
                        <input
                          type="text"
                          value={no_hp_agen}
                          onChange={(e) => setNoHpAgen(e.target.value)}
                          placeholder="Nomor Handphone Agen"
                          className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[515px] h-[50px] rounded-[10px]"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Alamat Perusahaan</div>
                      <div className="pt-[8px]">
                        <input
                          type="text"
                          value={alamat_perusahaan}
                          onChange={(e) => setAlamatPerusahaan(e.target.value)}
                          placeholder="Alamat Perusahaan"
                          className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[515px] h-[50px] rounded-[10px]"
                        />
                      </div>
                    </div>
                    <div className="flex place-content-end pt-[20px]">
                      <button
                        type="submit"
                        className="w-[100px] h-[40px] bg-[#1A719C] rounded-[10px] text-white"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[50px]">
      <Footer />
      </div>
    </div>
  );
};

export default Register;
