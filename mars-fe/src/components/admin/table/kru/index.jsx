import { useEffect, useMemo, useState } from "react";
import { downloadDokument, formatDate } from "../../../../config/utils";
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

const TableKapal = ({tipe = "datang"}) => {

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
  "datang" : useMemo(()=>[
    columnHelper.display({
      header: <span className="flex justify-center items-center text-center font-bold pl-3">No</span>,
      id: 'index',
      cell: ({row, table}) => <span className="font-bold pl-3 flex w-full justify-center items-center">{(table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1 + (pagination.pageIndex * pagination.pageSize)}</span>,
      size: 60+50,
    }),
    
    columnHelper.accessor("nama_agen_kapal", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Nama Agen</span>,
      size: 100+50,
    }),
    columnHelper.accessor("imo_number", {
      cell: (info) => <span className="flex w-full justify-center items-center">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">IMO Number</span>,
      size: 100+50,
    }),
    columnHelper.accessor("nama_kapal", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Nama Kapal</span>,
      size: 100+50,
    }),
    columnHelper.accessor("pelabuhan_asal", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Pelabuhan Asal</span>,
      size: 100+50,
    }),
    columnHelper.accessor("pelabuhan_tujuan", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Pelabuhan Tujuan</span>,
      size: 120+50,
    }),
    columnHelper.accessor("jadwal_kedatangan", {
      cell: (info) => <span className="flex items-center">{formatDate(info.getValue())}</span>,
      header: <span className="flex justify-center items-center text-center ">Jadwal Kedatangan</span>,
      size: 200+50,
    }),
    columnHelper.accessor("tujuan_kedatangan", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Tujuan Kedatangan</span>,
      size: 120+50,
    }),
    columnHelper.accessor("perusahaan_agen_kapal", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Perusahaan Kapal</span>,
      size: 120+50,
    }),
    columnHelper.accessor("kebangsaan_kapal", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Kebangsaan Kapal</span>,
      size: 120+50,
    }),
    columnHelper.accessor("service_location", {
      cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Lokasi Servis</span>,
      size: 200+50,
    }),
    columnHelper.accessor("data_cru_indonesia", {
      cell: (info) => <span className="flex w-full justify-center items-center">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center w-full">Jumlah WNI</span>,
      size: 80,
    }),
    columnHelper.accessor("data_cru_asing", {
      cell: (info) => <span className="flex w-full justify-center items-center">{info.getValue()}</span>,
      header: <span className="flex justify-center items-center text-center ">Jumlah WNA</span>,
      size: 80,
    }),
    columnHelper.accessor("dokument", {
      cell: (info) => <button onClick={()=>downloadDokument(info.getValue())} className="text-blue-600 flex w-full justify-center items-center">
      Dokumen
    </button >,
      header: <span className="flex justify-center items-center text-center">Dokument</span>,
      size: 200+50,
    }),
    columnHelper.accessor("status", {
      header: <span className="flex justify-center items-center text-center w-full">Status</span>,
      size: 300,
      id: "status",
      cell: ({ row }) => (
        <div className="flex justify-center items-center w-full gap-2">
          <button className="bg-green-500 text-white px-2 py-1 rounded w-24 flex justify-center items-center gap-1"
            onClick={() => {setIsOpenModalEdit(true); setRowId(row.original.id)}}
          >
              Setuju <BsCheck />
          </button>
          <button className="bg-red-800 text-white px-2 py-1 rounded w-24 flex justify-center items-center gap-1"
            onClick={() => {setIsOpenModalEdit(true); setRowId(row.original.id)}}
          >
              Tolak <BsX />
          </button>
         
        </div>
      ),
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

  "berangkat" : useMemo(
    () => [
      columnHelper.display({
        header: <span className="flex justify-center items-center text-center font-bold pl-3">No</span>,
        id: 'index',
        cell: ({row, table}) => <span className="font-bold pl-3 flex w-full justify-center items-center">{(table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1 + (pagination.pageIndex * pagination.pageSize)}</span>,
        size: 60+50,
      }),
      
      columnHelper.accessor("nama_agen_kapal", {
        cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">Nama Agen</span>,
        size: 100+50,
      }),
      columnHelper.accessor("imo_number", {
        cell: (info) => <span className="flex w-full justify-center items-center">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">IMO Number</span>,
        size: 100+50,
      }),
      columnHelper.accessor("nama_kapal", {
        cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">Nama Kapal</span>,
        size: 100+50,
      }),
      columnHelper.accessor("pelabuhan_asal", {
        cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">Pelabuhan Asal</span>,
        size: 100+50,
      }),
      columnHelper.accessor("pelabuhan_tujuan", {
        cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">Pelabuhan Tujuan</span>,
        size: 120+50,
      }),
      columnHelper.accessor("jadwal_keberangkatan", {
        cell: (info) => <span className="flex items-center">{formatDate(info.getValue())}</span>,
        header: <span className="flex justify-center items-center text-center ">Jadwal Keberangkatan</span>,
        size: 200+50,
      }),
      columnHelper.accessor("tujuan_keberangkatan", {
        cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">Tujuan Keberangkatan</span>,
        size: 120+50,
      }),
      columnHelper.accessor("perusahaan_agen_kapal", {
        cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">Perusahaan Kapal</span>,
        size: 120+50,
      }),
      columnHelper.accessor("kebangsaan_kapal", {
        cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">Kebangsaan Kapal</span>,
        size: 120+50,
      }),
      columnHelper.accessor("service_location", {
        cell: (info) => <span className="flex items-center ">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">Lokasi Servis</span>,
        size: 200+50,
      }),
      columnHelper.accessor("data_cru_indonesia", {
        cell: (info) => <span className="flex w-full justify-center items-center">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center w-full">Jumlah WNI</span>,
        size: 80,
      }),
      columnHelper.accessor("data_cru_asing", {
        cell: (info) => <span className="flex w-full justify-center items-center">{info.getValue()}</span>,
        header: <span className="flex justify-center items-center text-center ">Jumlah WNA</span>,
        size: 80,
      }),
      columnHelper.accessor("dokument", {
        cell: (info) => <button onClick={()=>downloadDokument(info.getValue())} className="text-blue-600 flex justify-center items-center">
        Dokumen
      </button >,
        header: <span className="flex justify-center items-center text-center w-full">Dokument</span>,
        size: 200+50,
      }),
      columnHelper.accessor("status", {
        header: <span className="flex justify-center items-center text-center w-full">Status</span>,
        size: 300,
        id: "status",
        cell: ({ row }) => (
          <div className="flex justify-center items-center w-full gap-2">
            <button className="bg-green-500 text-white px-2 py-1 rounded w-24 flex justify-center items-center gap-1"
              onClick={() => {setIsOpenModalEdit(true); setRowId(row.original.id)}}
            >
                Setuju <BsCheck />
            </button>
            <button className="bg-red-800 text-white px-2 py-1 rounded w-24 flex justify-center items-center gap-1"
              onClick={() => {setIsOpenModalEdit(true); setRowId(row.original.id)}}
            >
                Tolak <BsX />
            </button>
           
          </div>
        ),
      }),
      columnHelper.accessor("id", {
        header: <span className="flex justify-center items-center text-center w-full">Action</span>,
        size:300,
        id: "action",
        cell: ({ row }) => (
          <div className="flex gap-2 w-full justify-center items-center">
            <button className="bg-blue-500 text-white px-2 py-1 rounded flex justify-center items-center"
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
    ],
    [columnHelper, pagination, setIsOpenModalDelete, setIsOpenModalEdit, setRowId])

}
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/kapal/${tipe}?page=${pagination.pageIndex}&limit=${pagination.pageSize}`,
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
  }, [token, pagination, tipe]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 w-full flex flex-col gap-5">

    <div className="text-lg font-bold flex justify-center items-center ">
      Data {tipe === "datang" ? "Kedatangan" : "Keberangkatan"} Kapal
    </div>
    <Table columns={columns[tipe]} data={data} pagination={pagination} setPagination={setPagination} isLoading={isLoading} isEmpty={isEmpty} rowId={rowId} setRowId={setRowId} setIsOpenModalDelete={setIsOpenModalDelete} setIsOpenModalEdit={setIsOpenModalEdit} />
    </div>
  );
};
 


export default TableKapal;
