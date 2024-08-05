import {
  createColumnHelper,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { downloadDokument, formatDate } from "../../config/utils";
import BasicTable from "./BasicTable";

const TableKeberangkatan = ({tipe, setIsOpenModalDelete, setRowId, reloadData, setIsOpenModalEdit}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [data, setData] = useState(null);

  const { token } = useAuth();
  const dataTables = useMemo(()=> data ? data.data : [], [data]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/histories/berangkat?page=${pagination.pageIndex}&limit=${pagination.pageSize}`,
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
  }, [token, pagination, reloadData]);

  const columnHelper = createColumnHelper();


  const columns = useMemo(
    () => [
      columnHelper.display({
        header: <span className="flex justify-center text-center font-bold pl-3">No</span>,
        id: 'index',
        cell: ({row, table}) => <span className="font-bold pl-3">{(table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1 + (pagination.pageIndex * pagination.pageSize)}</span>,
        size: 60,
      }),
      columnHelper.accessor("id", {
        header: "Action",
        id: "action",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => {setIsOpenModalEdit(true); setRowId(row.original.id)}}
            >
              Edit
            </button>
            <button className="bg-red-600 text-white px-2 py-1 rounded"
              onClick={()=>{setIsOpenModalDelete(true); setRowId(row.original.id)}}
            >
              Delete
            </button>
          </div>
        ),
      }),
      columnHelper.accessor("nama_agen_kapal", {
        cell: (info) => info.getValue(),
        header: <span className="flex justify-center text-center ">Nama Agen</span>,
        size: 100,
      }),
      columnHelper.accessor("imo_number", {
        cell: (info) => info.getValue(),
        header: <span className="flex justify-center text-center ">IMO Number</span>,
        size: 100,
      }),
      columnHelper.accessor("nama_kapal", {
        cell: (info) => info.getValue(),
        header: <span className="flex justify-center text-center ">Nama Kapal</span>,
        size: 100,
      }),
      columnHelper.accessor("pelabuhan_asal", {
        cell: (info) => info.getValue(),
        header: <span className="flex justify-center text-center ">Pelabuhan Asal</span>,
        size: 120,
      }),
      columnHelper.accessor("pelabuhan_tujuan", {
        cell: (info) => info.getValue(),
        header: <span className="flex justify-center text-center ">Pelabuhan Tujuan</span>,
        size: 120,
      }),
      columnHelper.accessor("jadwal_keberangkatan", {
        cell: (info) => formatDate(info.getValue()),
        header: <span className="flex justify-center text-center ">Jadwal Keberangkatan</span>,
        size: 200,
      }),
      columnHelper.accessor("tujuan_keberangkatan", {
        cell: (info) => info.getValue(),
        header: <span className="flex justify-center text-center ">Tujuan Keberangkatan</span>,
        size: 120,
      }),
      columnHelper.accessor("perusahaan_agen_kapal", {
        cell: (info) => info.getValue(),
        header: <span className="flex justify-center text-center ">Perusahaan Kapal</span>,
        size: 120,
      }),
      columnHelper.accessor("kebangsaan_kapal", {
        cell: (info) => info.getValue(),
        header: <span className="flex justify-center text-center ">Kebangsaan Kapal</span>,
        size: 120,
      }),
      columnHelper.accessor("service_location", {
        cell: (info) => info.getValue(),
        header: <span className="flex justify-center text-center ">Lokasi Servis</span>,
        size: 200,
      }),
      columnHelper.accessor("data_cru_indonesia", {
        cell: (info) => <span className="pl-5">{info.getValue()}</span>,
        header: <span className="flex justify-center text-center ">Cru Indonesia</span>,
        size: 100,
      }),
      columnHelper.accessor("data_cru_asing", {
        cell: (info) => <span className="pl-5">{info.getValue()}</span>,
        header: <span className="flex justify-center text-center ">Cru Asing</span>,
        size: 100,
      }),
      columnHelper.accessor("dokument", {
        cell: (info) => <button onClick={()=>downloadDokument(info.getValue())} className="text-blue-600">
        Dokumen
      </button >,
        header: <span className="flex justify-center text-center ">Dokument</span>,
        size: 200,
      }),
      
    ],
    [columnHelper, pagination, setIsOpenModalDelete, setIsOpenModalEdit, setRowId]  
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BasicTable columns={columns} pagination={pagination} setPagination={setPagination} data={data} dataTables={dataTables} isEmpty={isEmpty}/>
  );
};

export default TableKeberangkatan;
