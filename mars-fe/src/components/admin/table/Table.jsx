import { useEffect, useMemo, useState } from "react";
import { downloadDokument, formatDate } from "../../../config/utils";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from 'styled-components';

const Table = ({columns, data, pagination, setPagination, isLoading, isEmpty, rowId, setRowId, setIsOpenModalDelete, setIsOpenModalEdit}) => {

  // const [isLoading, setIsLoading] = useState(false);
  // const [isEmpty, setIsEmpty] = useState(true);
  // const [data, setData] = useState(null);
  // const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  // const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  // const [rowId, setRowId] = useState(0);
  // const { token } = useAuth();

  const dataTables = useMemo(()=> data ? data.data : [], [data]);
  // const [pagination, setPagination] = useState({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });

// const columnHelper = createColumnHelper();
  // columns
// const columns = {
//   "datang" : useMemo(()=>[
//     columnHelper.display({
//       header: <span className="flex justify-center text-center font-bold pl-3">No</span>,
//       id: 'index',
//       cell: ({row, table}) => <span className="font-bold pl-3">{(table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1 + (pagination.pageIndex * pagination.pageSize)}</span>,
//       size: 60+50,
//     }),
//     columnHelper.accessor("id", {
//       header: "Action",
//       id: "action",
//       cell: ({ row }) => (
//         <div className="flex items-center gap-2">
//           <button className="bg-blue-500 text-white px-2 py-1 rounded"
//             onClick={() => {setIsOpenModalEdit(true); setRowId(row.original.id)}}
//           >
//             Edit
//           </button>
//           <button className="bg-red-600 text-white px-2 py-1 rounded"
//             onClick={()=>{setIsOpenModalDelete(true); setRowId(row.original.id)}}
//           >
//             Delete
//           </button>
//         </div>
//       ),
//     }),
//     columnHelper.accessor("nama_agen_kapal", {
//       cell: (info) => info.getValue(),
//       header: <span className="flex justify-center text-center ">Nama Agen</span>,
//       size: 100+50,
//     }),
//     columnHelper.accessor("imo_number", {
//       cell: (info) => info.getValue(),
//       header: <span className="flex justify-center text-center ">IMO Number</span>,
//       size: 100+50,
//     }),
//     columnHelper.accessor("nama_kapal", {
//       cell: (info) => info.getValue(),
//       header: <span className="flex justify-center text-center ">Nama Kapal</span>,
//       size: 100+50,
//     }),
//     columnHelper.accessor("pelabuhan_asal", {
//       cell: (info) => info.getValue(),
//       header: <span className="flex justify-center text-center ">Pelabuhan Asal</span>,
//       size: 100+50,
//     }),
//     columnHelper.accessor("pelabuhan_tujuan", {
//       cell: (info) => info.getValue(),
//       header: <span className="flex justify-center text-center ">Pelabuhan Tujuan</span>,
//       size: 120+50,
//     }),
//     columnHelper.accessor("jadwal_kedatangan", {
//       cell: (info) => formatDate(info.getValue()),
//       header: <span className="flex justify-center text-center ">Jadwal Kedatangan</span>,
//       size: 200+50,
//     }),
//     columnHelper.accessor("tujuan_kedatangan", {
//       cell: (info) => info.getValue(),
//       header: <span className="flex justify-center text-center ">Tujuan Kedatangan</span>,
//       size: 120+50,
//     }),
//     columnHelper.accessor("perusahaan_agen_kapal", {
//       cell: (info) => info.getValue(),
//       header: <span className="flex justify-center text-center ">Perusahaan Kapal</span>,
//       size: 120+50,
//     }),
//     columnHelper.accessor("kebangsaan_kapal", {
//       cell: (info) => info.getValue(),
//       header: <span className="flex justify-center text-center ">Kebangsaan Kapal</span>,
//       size: 120+50,
//     }),
//     columnHelper.accessor("service_location", {
//       cell: (info) => info.getValue(),
//       header: <span className="flex justify-center text-center ">Lokasi Servis</span>,
//       size: 200+50,
//     }),
//     columnHelper.accessor("data_cru_indonesia", {
//       cell: (info) => info.getValue(),
//       header: <span className="flex justify-center text-center ">Cru Indonesia</span>,
//       size: 100+50,
//     }),
//     columnHelper.accessor("data_cru_asing", {
//       cell: (info) => info.getValue(),
//       header: <span className="flex justify-center text-center ">Cru Asing</span>,
//       size: 100+50,
//     }),
//     columnHelper.accessor("dokument", {
//       cell: (info) => <button onClick={()=>downloadDokument(info.getValue())} className="text-blue-600">
//       Dokumen
//     </button >,
//       header: <span className="flex justify-center text-center ">Dokument</span>,
//       size: 200+50,
//     }),
//   ],[columnHelper, pagination, setIsOpenModalDelete, setIsOpenModalEdit, setRowId]),

//   "berangkat" : useMemo(
//     () => [
//       columnHelper.display({
//         header: <span className="flex justify-center text-center font-bold pl-3">No</span>,
//         id: 'index',
//         cell: ({row, table}) => <span className="font-bold pl-3">{(table.getSortedRowModel()?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1 + (pagination.pageIndex * pagination.pageSize)}</span>,
//         size: 60+50,
//       }),
//       columnHelper.accessor("id", {
//         header: "Action",
//         id: "action",
//         cell: ({ row }) => (
//           <div className="flex items-center gap-2">
//             <button className="bg-blue-500 text-white px-2 py-1 rounded"
//               onClick={() => {setIsOpenModalEdit(true); setRowId(row.original.id)}}
//             >
//               Edit
//             </button>
//             <button className="bg-red-600 text-white px-2 py-1 rounded"
//               onClick={()=>{setIsOpenModalDelete(true); setRowId(row.original.id)}}
//             >
//               Delete
//             </button>
//           </div>
//         ),
//       }),
//       columnHelper.accessor("nama_agen_kapal", {
//         cell: (info) => info.getValue(),
//         header: <span className="flex justify-center text-center ">Nama Agen</span>,
//         size: 100+50,
//       }),
//       columnHelper.accessor("imo_number", {
//         cell: (info) => info.getValue(),
//         header: <span className="flex justify-center text-center ">IMO Number</span>,
//         size: 100+50,
//       }),
//       columnHelper.accessor("nama_kapal", {
//         cell: (info) => info.getValue(),
//         header: <span className="flex justify-center text-center ">Nama Kapal</span>,
//         size: 100+50,
//       }),
//       columnHelper.accessor("pelabuhan_asal", {
//         cell: (info) => info.getValue(),
//         header: <span className="flex justify-center text-center ">Pelabuhan Asal</span>,
//         size: 100+50,
//       }),
//       columnHelper.accessor("pelabuhan_tujuan", {
//         cell: (info) => info.getValue(),
//         header: <span className="flex justify-center text-center ">Pelabuhan Tujuan</span>,
//         size: 120+50,
//       }),
//       columnHelper.accessor("jadwal_keberangkatan", {
//         cell: (info) => formatDate(info.getValue()),
//         header: <span className="flex justify-center text-center ">Jadwal Keberangkatan</span>,
//         size: 200+50,
//       }),
//       columnHelper.accessor("tujuan_keberangkatan", {
//         cell: (info) => info.getValue(),
//         header: <span className="flex justify-center text-center ">Tujuan Keberangkatan</span>,
//         size: 120+50,
//       }),
//       columnHelper.accessor("perusahaan_agen_kapal", {
//         cell: (info) => info.getValue(),
//         header: <span className="flex justify-center text-center ">Perusahaan Kapal</span>,
//         size: 120+50,
//       }),
//       columnHelper.accessor("kebangsaan_kapal", {
//         cell: (info) => info.getValue(),
//         header: <span className="flex justify-center text-center ">Kebangsaan Kapal</span>,
//         size: 120+50,
//       }),
//       columnHelper.accessor("service_location", {
//         cell: (info) => info.getValue(),
//         header: <span className="flex justify-center text-center ">Lokasi Servis</span>,
//         size: 200+50,
//       }),
//       columnHelper.accessor("data_cru_indonesia", {
//         cell: (info) => <span className="pl-5">{info.getValue()}</span>,
//         header: <span className="flex justify-center text-center ">Cru Indonesia</span>,
//         size: 100+50,
//       }),
//       columnHelper.accessor("data_cru_asing", {
//         cell: (info) => <span className="pl-5">{info.getValue()}</span>,
//         header: <span className="flex justify-center text-center ">Cru Asing</span>,
//         size: 100+50,
//       }),
//       columnHelper.accessor("dokument", {
//         cell: (info) => <button onClick={()=>downloadDokument(info.getValue())} className="text-blue-600">
//         Dokumen
//       </button >,
//         header: <span className="flex justify-center text-center ">Dokument</span>,
//         size: 200+50,
//       }),
      
//     ],
//     [columnHelper, pagination, setIsOpenModalDelete, setIsOpenModalEdit, setRowId])

// }
  
  const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const Button = styled.button`
  background-color: ${props => props.disabled ? '#ddd' : '#007bff'};
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.disabled ? '#ddd' : '#0056b3'};
  }
`;

const PageInfo = styled.span`
  font-size: 16px;
`;
  
  const table = useReactTable({
    data: dataTables,
    columns : columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className=""  style={{
          overflow: 'auto', //our scrollable table container
          position: 'relative', //needed for sticky header
          maxHeight: '600px', //should be a fixed height
          maxWidth: '83vw', //should be a fixed width
        }}>

      <table style={{ display: 'grid' }} className="text-sm" >
        <thead className="bg-slate-200 font-semibold"  style={{
              display: 'grid',
              position: 'sticky',
              top: 0,
              zIndex: 1,
              
            }}  >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} style={{ display: 'flex'}}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="flex justify-center"  style={{
                  width: header.getSize(),
                }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody style={{
              display: 'grid',
              position: 'relative', //needed for absolute positioning of rows
            }}>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id} style={{
              display: 'flex',
              // position: 'absolute',
              width: '100%',
            }}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={`border-b-2 pl-3 ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}   style={{
                  display: 'flex',
                  width: cell.column.getSize(),
                }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))} 
            </tr>
          ))}

          { isEmpty  && (
            <tr>
              <td className="text-center flex items-center justify-center" colSpan={table.getAllColumns().length}>No data</td>
            </tr>
          )}
        </tbody>
      </table>
          </div>
      <div className="h-2">
        <div className="flex items-center gap-5">
        <PaginationWrapper>

        <Button
        disabled={pagination.pageIndex <= 0}
        onClick={() =>
          setPagination({
            pageIndex: pagination.pageIndex - 1,
            pageSize: pagination.pageSize,
          })
        }
      >
        {"<<"}
      </Button>
      <PageInfo>{pagination.pageIndex + 1} / {data?.pages}</PageInfo>
      <Button
        disabled={pagination.pageIndex + 1 >= data?.pages}
        onClick={() =>
          setPagination({
            pageIndex: pagination.pageIndex + 1,
            pageSize: pagination.pageSize,
          })
        }
        >
        {">>"}
      </Button>
        </PaginationWrapper>
        </div>
      </div>
    </div>
  );
};
 


export default Table;
