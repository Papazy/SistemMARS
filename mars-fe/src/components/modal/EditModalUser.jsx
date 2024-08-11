import { useAuth } from "../../auth/AuthContext";
import { useEffect, useState } from "react";
import { downloadDokument } from "../../config/utils";


const EditModalUser = ({ tipe = "datang", isOpen, setIsOpen, rowId, onEditSuccess, data }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    id_agen_kapal: "",
    nama_perusahaan: "",
    email: "",
    no_hp_agen: "",
    alamat_perusahaan: "",
  });

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalError, setIsShowModalError] = useState(false);

  const { token } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/user/${rowId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsOpen(false);
        setIsShowModal(true);
        onEditSuccess();
      } else {
        setIsShowModalError(true);
      }
    } catch (error) {
      console.error("Error registering:", error);
      setIsShowModalError(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(rowId);
        const response = await fetch(`http://localhost:3001/api/user/${rowId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setFormData({
            username: data.username,
            password: data.password,
            id_agen_kapal: data.id_agen_kapal,
            nama_perusahaan: data.nama_perusahaan,
            email: data.email,
            no_hp_agen: data.no_hp_agen,
            alamat_perusahaan: data.alamat_perusahaan,
          });
        } else {
          console.log("Gagal mengambil data");
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [rowId, token, tipe]);

  if (!isOpen) return null;

  const handleClickOutside = (e) => {
    if (e.target.id === 'popup-modal') {
      setIsOpen(false);
    }
  };

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={
        "overflow-y overflow-x-hidden z-50 fixed justify-center items-center flex bg-[rgba(0,0,0,0.1)] transition transform h-screen w-full py-32 pr-40"
      }
      onClick={(e) => handleClickOutside(e)}
    >
      <div className="relative p-4 w-screen max-w-[100vh]">
        <div className="relative bg-[#ffffff] rounded-lg shadow px-24 py-5">
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 ">
            <h3 className="mb-5 text-lg font-bold text-[#1d526c] text-center">
              Edit data
            </h3>
            <form
              className="flex justify-center items-center"
              onSubmit={handleRegister}
              encType="multipart/form-data"
            >
              <div className="grid gap-[20px]">
                <div>
                  <div className="pl-[17px] font-bold">Nama Agen Kapal</div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama Agen Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
               
                <div>
                  <div className="pl-[17px] font-bold">
                    Email
                  </div>
                  <div className="pt-[11px]">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Masukkan Email"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">
                    No HP
                  </div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      name="no_hp_agen"
                      value={formData.no_hp_agen}
                      onChange={handleInputChange}
                      placeholder="Masukkan No HP"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">
                    Perusahaan Agen Kapal
                  </div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      name="nama_perusahaan"
                      value={formData.nama_perusahaan}
                      onChange={handleInputChange}
                      placeholder="Masukkan Perusahaan Agen Kapal"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                <div>
                  <div className="pl-[17px] font-bold">
                    Alamat Perusahaan
                  </div>
                  <div className="pt-[11px]">
                    <input
                      type="text"
                      name="alamat_perusahaan"
                      value={formData.alamat_perusahaan}
                      onChange={handleInputChange}
                      placeholder="alamat perusahaan"
                      className="pl-[17px] bg-[#83B3CA] placeholder-[#5C5C68] w-[594px] h-[45px] rounded-[10px]"
                    />
                  </div>
                </div>
                {/* Tambahkan input lainnya dengan cara yang sama */}

                <button
                  type="submit"
                  className="w-[214px] h-[45px] bg-[#1A719C] rounded-[10px] text-white"
                >
                  Submit Ship Data
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModalUser;
