import { useEffect, useMemo, useState } from "react";
import { downloadDokument, formatDate, formatDateWithTime } from "../../../../config/utils";
import { BsCheck, BsPencilFill, BsTrash3Fill, BsX } from "react-icons/bs";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from 'styled-components';
import { useAuth } from "../../../../auth/AuthContext";
import Table from "../Table";
import EditModalUser from "../../../modal/EditModalUser";
import EditModalStatus from "../../../modal/EditModalStatus";
import DeleteModalKru from "../../../modal/DeleteModalKru";
import EditModalKru from "../../../modal/EditModalKru";

const TableKru = ({tipe = "sign_on"}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [data, setData] = useState(null);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [rowId, setRowId] = useState(0);
  const { token } = useAuth();
  const [reloadData, setReloadData] = useState(false);
  const handleActionSuccess = () => {
    setReloadData(!reloadData);
  }

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

const columnHelper = createColumnHelper();
  // columns
const columns = {
  "sign_on" : useMemo(()=>[
    columnHelper.display({
      header: <span className="flex justify-center items-center text-center font-bold pl-3">No</span>,
      id: 'index',
      cell: ({row, table}) => <span className="font-bold pl-3 flex w-full justify-center items-center">{(table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1 + (pagination.pageIndex * pagination.pageSize)}</span>,
      size: 60+50,
    }),
    
    columnHelper.accessor("nama_cru", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Nama Kru</span>,
      size: 100+50,
    }),
    columnHelper.accessor("kebangsaan_cru", {
      cell: (info) => <span className="flex w-full justify-center items-center">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Kebangsaan</span>,
      size: 100+50,
    }),
    columnHelper.accessor("tg_rencana_sign_on", {
      cell: (info) => <span className="flex items-center ">{formatDate(info.getValue())}</span>,
      header: <span className="flex justify-center items-center text-center ">Tanggal Sign On</span>,
      size: 100+50,
    }),
    columnHelper.accessor("nama_kapal", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Nama Kapal</span>,
      size: 100+50,
    }),
    columnHelper.accessor("kebangsaan_kapal", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Kebangsaan Kapal</span>,
      size: 120+50,
    }),
    columnHelper.accessor("waktu_lapor", {
      cell: (info) => <span className="flex items-center">{formatDateWithTime(info.getValue())}</span>,
      header: <span className="flex justify-center items-center text-center ">Waktu Lapor</span>,
      size: 150+50,
    }),
    columnHelper.accessor("nama_agen", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Nama Agent</span>,
      size: 120+50,
    }),
    columnHelper.accessor("surat", {
      cell: (info) => <button onClick={()=>downloadDokument(info.getValue())} className="text-blue-600 flex w-full justify-center items-center">
      Dokumen
    </button >,
      header: <span className="flex justify-center items-center text-center">Dokument</span>,
      size: 200+50,
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

  "sign_off" : useMemo(
    () => [
      columnHelper.display({
        header: <span className="flex justify-center items-center text-center font-bold pl-3">No</span>,
        id: 'index',
        cell: ({row, table}) => <span className="font-bold pl-3 flex w-full justify-center items-center">{(table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1 + (pagination.pageIndex * pagination.pageSize)}</span>,
        size: 60+50,
      }),
      
      columnHelper.accessor("nama_cru", {
        cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">Nama Kru</span>,
        size: 100+50,
      }),
      columnHelper.accessor("kebangsaan_cru", {
        cell: (info) => <span className="flex w-full justify-center items-center">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">Kebangsaan</span>,
        size: 100+50,
      }),
      columnHelper.accessor("tg_rencana_sign_off", {
        cell: (info) => <span className="flex items-center ">{formatDate(info.getValue())}</span>,
        header: <span className="flex justify-center items-center text-center ">Tanggal Sign Off</span>,
        size: 100+50,
      }),
      columnHelper.accessor("nama_kapal", {
        cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">Nama Kapal</span>,
        size: 100+50,
      }),
      columnHelper.accessor("kebangsaan_kapal", {
        cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">Kebangsaan Kapal</span>,
        size: 120+50,
      }),
      columnHelper.accessor("waktu_lapor", {
        cell: (info) => <span className="flex items-center">{formatDateWithTime(info.getValue())}</span>,
        header: <span className="flex justify-center items-center text-center ">Waktu Lapor</span>,
        size: 150+50,
      }),
      columnHelper.accessor("nama_agen", {
        cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">Nama Agent</span>,
        size: 120+50,
      }),
      columnHelper.accessor("surat", {
        cell: (info) => <button onClick={()=>downloadDokument(info.getValue())} className="text-blue-600 flex w-full justify-center items-center">
        Dokumen
      </button >,
        header: <span className="flex justify-center items-center text-center">Dokument</span>,
        size: 200+50,
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
      }),], [columnHelper, pagination, setIsOpenModalDelete, setIsOpenModalEdit, setRowId]),
}
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/kru/${tipe}?page=${pagination.pageIndex}&limit=${pagination.pageSize}`,
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
        if (data.data.length > 0) {
          setIsEmpty(false);
        }
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token, pagination, tipe, reloadData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 w-full flex flex-col gap-5">
        {isOpenModalDelete !== null && <DeleteModalKru tipe={tipe} isOpen={isOpenModalDelete} setIsOpen={setIsOpenModalDelete} rowId={rowId} onDeleteSuccess={handleActionSuccess}/>}
       {isOpenModalEdit && <EditModalKru tipe={tipe} isOpen={isOpenModalEdit} setIsOpen={setIsOpenModalEdit} rowId={rowId} onEditSuccess={handleActionSuccess} />}
      
    <div className="text-lg font-bold flex justify-center items-center ">
      Data {tipe === "sign_on" ? "Sign On" : "Sign Off"} Kru
    </div>
    <Table columns={columns[tipe]} data={data} pagination={pagination} setPagination={setPagination} isLoading={isLoading} isEmpty={isEmpty} rowId={rowId} setRowId={setRowId} setIsOpenModalDelete={setIsOpenModalDelete} setIsOpenModalEdit={setIsOpenModalEdit} />
    </div>
  );
};
 


export default TableKru;
