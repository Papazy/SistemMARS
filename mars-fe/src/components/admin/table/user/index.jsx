import { useEffect, useMemo, useState } from "react";
import {  BsPencilFill, BsTrash3Fill} from "react-icons/bs";

import {
  createColumnHelper,
} from "@tanstack/react-table";
import { useAuth } from "../../../../auth/AuthContext";
import Table from "../Table";

const TablePengguna = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [data, setData] = useState(null);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [rowId, setRowId] = useState(0);
  const { token } = useAuth();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

const columnHelper = createColumnHelper();
  // columns
const columns = {
  "users" : useMemo(()=>[
    columnHelper.display({
      header: <span className="flex justify-center items-center text-center font-bold pl-3">No</span>,
      id: 'index',
      cell: ({row, table}) => <span className="font-bold pl-3 flex w-full justify-center items-center">{(table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1 + (pagination.pageIndex * pagination.pageSize)}</span>,
      size: 60+50,
    }),
    
    columnHelper.accessor("username", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Nama</span>,
      size: 100+50,
    }),
    columnHelper.accessor("id_agen_kapal", {
      cell: (info) => <span className="flex w-full justify-center items-center">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Id Agen</span>,
      size: 100+50,
    }),
    columnHelper.accessor("nama_perusahaan", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Nama Perusahaan</span>,
      size: 100+50,
    }),
    columnHelper.accessor("email", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Email</span>,
      size: 120+50,
    }),
    columnHelper.accessor("alamat_perusahaan", {
      cell: (info) => <span className="flex items-center">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Alamat Perusahaan</span>,
      size: 200+50,
    }),
    columnHelper.accessor("No HP", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">No HP</span>,
      size: 120+50,
    }),
    columnHelper.accessor("id", {
      header: <span className="flex justify-center items-center text-center w-full">Action</span>,
      size:300,
      id: "action",
      cell: ({ row }) => (
        <div className="flex gap-2 w-full justify-center items-center ">
          <button className="bg-blue-500 text-white px-2 py-1 rounded flex justify-center items-center gap-2"
            onClick={() => {setIsOpenModalEdit(true); setRowId(row.original.id)}}
          >
            <BsPencilFill /> Edit
          </button>
          <button className="bg-red-600 text-white px-2 py-1 rounded flex justify-center items-center gap-2"
            onClick={()=>{setIsOpenModalDelete(true); setRowId(row.original.id)}}
          >
            <BsTrash3Fill /> Delete
          </button>
        </div>
      ),
    }),
  ],[columnHelper, pagination, setIsOpenModalDelete, setIsOpenModalEdit, setRowId]),
}
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users?page=${pagination.pageIndex}&limit=${pagination.pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.code > 204 || response.code < 200) {
          throw new Error("Failed to fetch data");
        }
        setIsLoading(false);
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (data) {
          setIsEmpty(false);
        }
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token, pagination]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 w-full flex flex-col gap-5">
      
    <div className="text-lg font-bold flex justify-center items-center ">
      Data Pengguna
    </div>
    <Table columns={columns["users"]} dataUsers={data} pagination={pagination} setPagination={setPagination} isLoading={isLoading} isEmpty={isEmpty} rowId={rowId} setRowId={setRowId} setIsOpenModalDelete={setIsOpenModalDelete} setIsOpenModalEdit={setIsOpenModalEdit} />
    </div>
  );
};
 


export default TablePengguna;
