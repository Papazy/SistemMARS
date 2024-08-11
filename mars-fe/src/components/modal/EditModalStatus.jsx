import { useAuth } from "../../auth/AuthContext";

const EditModalStatus = ({ tipe="setuju", isOpen, setIsOpen, rowId, onEditSuccess, tipeKapal="datang" }) => {

  const { token } = useAuth();
  

  if (!isOpen) return null;

  const editRow = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/kapal/${tipeKapal}/${rowId}/status`,
        {
          method: "PUT",
          body: JSON.stringify({ status: tipe === "hapus" ? "ditolak" : "disetujui" }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Tambahkan ini
          },
        }
      );
      if (response.ok) {
        console.log("Data berhasil diperbarui");
        onEditSuccess();
      } else {
        console.log("Data gagal diperbarui");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsOpen(false);
    }
  };
  const handleClickOutside =(e) => {
    if(e.target.id ==='popup-modal'){
      setIsOpen(false)
    }
  }


  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={
        "overflow-y-auto overflow-x-hidden z-50 justify-center items-center flex fixed bg-[rgba(0,0,0,0.2)] transition transform h-screen w-full pr-64 pb-32"
      }
      onClick={(e) => handleClickOutside(e)}
    >
      <div className="relative w-full  max-w-[80vh] max-h-full">
        <div className="relative bg-[#ffffff] rounded-lg shadow py-6">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
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
          <div className="flex justify-center items-center flex-col text-center gap-4">
            <h3 className="mtext-lg font-bold text-[#1d526c] ">
              Konfirmasi
            </h3>
            <form
              className="flex justify-center items-center"
              onSubmit={(e) => {editRow(e, rowId)}}
            >
              <div className="gap-[20px] flex flex-col justify-center items-center ">
                <div>
                  <div className="font-bold">Anda Yakin {tipe === "hapus" ? "Menolak" : "Menyetujui"} Data Ini?</div>
                </div>
     
                <button
                  type="submit"
                  className="w-[150px] h-[45px] bg-[#1A719C] rounded-[10px] text-white"
                >
                  Konfirmasi
                </button>
              </div>
              <div></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModalStatus;
