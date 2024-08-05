import { useState } from "react";
import React from "react";
import logofix from "../assets/logofix.png";
import { Navigate } from "react-router-dom";
import Footer from "./Footer";
import Modal from "./ModalAuthLogin";
import ModalError from "./ModalError";
import { useAuth } from "../auth/AuthContext";

const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalError, setIsShowModalError] = useState(false);

  const { loginAdmin, isAuthenticatedAdmin } = useAuth()
  console.log(isAuthenticatedAdmin)
  if(isAuthenticatedAdmin){
    window.location.href = "/request-register"
    return
  }


  const handleLogin = async (e) => {
    e.preventDefault();
      try{
        await loginAdmin(username, password)
        setIsShowModal(true)
        window.location.href = "/admin"
      }catch(e){
        console.log(e)
        setIsShowModalError(true)
      }
  };

  const onClose = () => {
    setIsShowModal(false);
    setIsShowModalError(false);
  };

  return (
    <div>
      {isShowModal && <Modal onClose={onClose} />}
      {isShowModalError && (
        <ModalError onClose={onClose} message={"Masukkan data dengan benar"} />
      )}
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
              <a className="text-[#1A719C]" href="/loginadmin">
                Login as Admin
              </a>
            </li>
            <li>
              <a className="hover:text-[#1A719C]" href="/register">
                Register as User
              </a>
            </li>
          </ul>
        </div>

        <div className="grid justify-center ">
          <div className="text-[36px] font-bold flex pt-[50px]">
            <div>Log in as Admin</div>
          </div>
          <div className="">
            <div>Selamat Datang! Silahkan Isi Data Anda</div>
          </div>
        </div>
        <div className="pt-[34px] flex justify-center">
          <div className="flex text-left text-[16px]">
            <form
              className="flex justify-between gap-[20px] border-2 py-5 px-10 rounded-xl"
              action=""
              onSubmit={(e) =>handleLogin(e)}
            >
              <div className="grid gap-[10px]">
                <div>
                  <div className="pl-[17px] font-bold">Username</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[50px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">Password</div>
                  <div className="pt-[10px]">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[50px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div className="flex place-content-end">
                  <button
                    type="submit"
                    className="w-[100px] h-[40px] bg-[#1A719C] rounded-[10px] text-white"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="pt-[99px]">
        <Footer />
      </div>
    </div>
  );
};

export default LoginAdmin;
