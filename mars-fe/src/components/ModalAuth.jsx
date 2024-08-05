const Modal = ({onClose, link}) =>{

  const handleOnClose = () => {
    onClose();
    window.location.href = "/profile";
  }

  return (
    <div id="popup-modal" tabIndex="-1" className={"overflow-y-auto overflow-x-hidden z-50 justify-center items-center flex fixed bg-[rgba(0,0,0,0.2)] transition transform h-screen w-full" }>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-[#ffffff] rounded-lg shadow px-24 py-5">
            <button type="button" onClick={onClose} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#1A719C" className="mx-auto mb-4 bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>
                <h3 className="text-lg font-normal text-gray-500 ">Berhasil!</h3>
                <a href={link} className="mb-5 text-lg font-normal text-blue-500 ">Lihat Detail Kapal</a>
                
                <button data-modal-hide="popup-modal" type="button" onClick={handleOnClose} className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-[#1A719C] rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Tutup</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default Modal;