import React from "react";
import { Link } from "react-router-dom";
import Email from "../../assets/icons/email";
import Phone from "../../assets/icons/phone";
import { useAuth } from "../../auth/AuthContext";

const Menu = ({name, active}) => {
  return (
    <Link to={`/admin/${name}`} className={`px-3 py-1 rounded-xl ${active===name ? 'bg-[#124f6d]' : ''}`}>{formatFirstLetter(name)}</Link>
  )
}

const formatFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1, string.length);
}

const AdminSidebar = ({active}) => {
  const {logout} = useAuth();

  const handleLogout = async(e) => {
    e.preventDefault();
    await logout();
    window.location.href = "/";
  }

  return (
    <>
      <div className="flex flex-col justify-between h-screen fixed pt-24 pb-10 border w-64 px-4 bg-[#1A719C]">
        <div className="text-[#e8f1f5] flex flex-col">
          <div className="font-bold text-[#8db8ce] text-xl pt-4">Data</div>
          <Menu name="pengguna" active={active}/>
          <div className="font-bold text-[#8db8ce] text-xl pt-4">Kapal</div>
          <Menu name="kedatangan" active={active}/>
          <Menu name="keberangkatan" active={active}/>
          <div className="font-bold text-[#8db8ce] text-xl pt-4">Crew</div>
          <Menu name="sign-on" active={active}/>
          <Menu name="sign-off" active={active}/>
          {/* <Link to="/admin/pengguna" className={`px-3 py-2 rounded-xl ${active==="pengguna" ? 'bg-[#124f6d]' : ''}`}>Pengguna</Link>
          <Link to="/admin/adm" className={`px-3 py-2 rounded-xl ${active!=="pengguna" ? 'bg-[#124f6d]' : ''}`}>Administrasi</Link> */}
        </div>
        <div className="bawah flex flex-col justify-center items-center gap-5">
    <button className=" px-4 py-2 bg-[#d1171f] rounded text-white" onClick={(e) => handleLogout(e)}>Logout</button>
          <div className="bg-[#05e3eb] rounded px-2 py-3 text-[#0d394e]">
            Informasi Lebih Lanjut
            <div className="flex items-center gap-2 text-sm">
              <Email />
              <p>menujusukses@gmail.com</p>
            </div>
          <div className="">
            <div className="flex items-center gap-2 text-sm">
             <Phone />
              <p>081234567890</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
