import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import DeleteModal from "../modal/DeleteModal";
import EditModal from "../modal/EditModal";
import NotificationModal from "../NotificationModal";
function  AdminLayout({element}) {




  const pathname = window.location.pathname;
  const [path, setPath] = useState("");
  const pathArray = pathname.split("/");
  const pathvalue = pathArray[2];
  useEffect(()=>{
    switch(pathvalue){
      case "pengguna":
        setPath("pengguna");
        break;
      case "keberangkatan":
        setPath("keberangkatan");
        break;
      case "kedatangan":
        setPath("kedatangan");
        break;
      case "sign-on":
        setPath("sign-on");
        break;
      case "sign-off":
        setPath("sign-off");
        break;
      case "adm":
        setPath("adm");
        break;
      default:
        setPath("pengguna")
    }
  },[pathvalue]);

  // console.log(path);

  return (
    <>
      <AdminSidebar active={path}/>
      <AdminNavbar />
     
    <NotificationModal />
      <div className="pl-64 pt-20 ">
        {element}
      </div>
    </>
  );
}

export default AdminLayout;
