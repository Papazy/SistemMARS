import React, { useState } from "react";
import logofix from "../../assets/logofix.png";
const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center px-20 py-6 border z-100 fixed w-screen bg-white h-20">
        <div className="logo flex items-center">
          <img src={logofix} alt="logo" style={{width:'90px'}}/>
        </div>
        <div className="">Admin</div>
      </div>
    </>
  )
}

export default AdminNavbar;