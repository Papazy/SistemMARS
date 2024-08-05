import React, { useState } from "react";
import TableKeberangkatan from "./tables/TableKeberangkatan";
import TableKedatangan from "./tables/TableKedatangan";

const ProfileTable = ({setIsOpenModalDelete, setIsOpenModalEdit, setRowId, reloadData, setTipe}) => {
  const [selected, setSelected] = useState("datang");
  setTipe(selected);  

  return(
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="border rounded-full">
          <button onClick={()=>setSelected('datang')} className={`px-3 py-2 rounded-l-full hover:bg-slate-500 hover:text-white cursor-pointer border-r-2 ${selected === 'datang'? 'bg-slate-700  text-white': ''}` }>Kedatangan</button>
          
          <button onClick={()=>setSelected('berangkat')} className={`px-3 py-2 rounded-r-full hover:bg-slate-500 hover:text-white cursor-pointer ${selected === 'berangkat'? 'bg-slate-700  text-white': ''}`}>Keberangkatan</button>
        </div>  
        <div className="table">
          {selected === 'berangkat' && <TableKeberangkatan setIsOpenModalDelete={setIsOpenModalDelete} setIsOpenModalEdit={setIsOpenModalEdit} setRowId={setRowId} reloadData={reloadData} />}
          {selected === 'datang' && <TableKedatangan setIsOpenModalDelete={setIsOpenModalDelete} setIsOpenModalEdit={setIsOpenModalEdit} setRowId={setRowId} reloadData={reloadData} /> }
        </div>
      </div>
    )
}

export default ProfileTable;