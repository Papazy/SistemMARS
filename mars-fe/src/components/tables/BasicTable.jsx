import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from 'styled-components';

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

const BasicTable = ({columns, pagination, setPagination, data, isLoading, dataTables, isEmpty}) => {
  

  const table = useReactTable({
    data: dataTables,
    columns,
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

      <table style={{ display: 'grid' }} className="text-sm">
        <thead className="bg-slate-200 font-semibold py-2"  style={{
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

export default BasicTable;
