import { useAuth } from "../../auth/AuthContext";

const DeleteModalUser = ({tipe, isOpen, setIsOpen, rowId, onDeleteSuccess}) => {
  const {token} = useAuth();
  if (!isOpen) return null;

  const hapusRow = async (id) => {
    try{

      const response = await fetch(`http://localhost:3001/api/user/` + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    if (response.ok) {
      console.log('Data berhasil dihapus');
      onDeleteSuccess();
    }else{
      console.log('Data gagal dihapus');
    }
  }catch(err){
    console.log(err.message);
  }finally{
    setIsOpen(false);
  }
  }
  
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={
        "overflow-y-auto overflow-x-hidden z-50 justify-center items-center flex fixed bg-[rgba(0,0,0,0.2)] transition transform h-screen w-full"
      }
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-[#ffffff] rounded-lg shadow px-24 py-5">
          <button
            type="button"
            onClick={()=>setIsOpen(false)}
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              fill="red"
              className="mx-auto mb-4 bi bi-exclamation-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-[#1d526c] ">
              Anda Yakin Hapus?
            </h3>

            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={()=>hapusRow(rowId)}
              className="py-2.5 px-5 ms-1 text-sm font-medium text-white focus:outline-none bg-[#1d526c] rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalUser