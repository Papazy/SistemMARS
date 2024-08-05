import React from "react";
import logo from "../assets/logofix.png";
import { useState, useEffect } from "react";
import NotificationModal from "./NotificationModal";

function ReqReg() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:3001/api/Register", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  console.log(data);
  const [IsAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);
  const logout = () => {
    setData([]); // Membersihkan data pengguna dari state setelah logout
    localStorage.removeItem("tokenadmin");
    setIsAuthenticatedAdmin(false);
    window.location.href = "/loginadmin";
  };
  return (
    
    <div className="px-[50px] py-[50px]">
      <div>
        <div className="flex justify-between items-center gap-[56px] absolute ">
          <div className="">
            <a href="">
              {" "}
              <img className="w-[113px] h-[101px]" src={logo} alt="" />
            </a>
          </div>
          <div className="text-[24px] font-bold">
            <ul className="flex justify-between gap-[60px]">
              <li>
                <a href="/request-register" className="text-[#1A719C]">
                  Informasi Pengguna
                </a>
              </li>
              <li>
                <a href="/admin-data-keb" className="">
                  Administrasi Data
                </a>
              </li>
              <li>
                <div className="relative inline-block">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="focus:outline-none"
                  >
                    Support Information
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg">
                      <a
                        href="#"
                        className="block px-4 py-2 text-black text-[10px] hover:bg-gray-100"
                      >
                        Informasi Lebih Lanjut Hubugi Admin
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <p className="text-[10px]">Email : </p>
                        <p>menujusukses@gmail.com</p> <br />
                        <p className="text-[10px]">Kontak : </p>
                        <p>082292829289922</p>
                      </a>
                    </div>
                  )}
                </div>
              </li>
              <li className="flex gap-[5px]">
                <div>
                  <a className="" onClick={logout}>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-y-auto pt-[182px] px-[50px] py-[50px]">
          <div>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr className="bg-[#83B3CA]">
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Nama
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Password
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Id Agen Kapal
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Nama Perusahaan
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            E-mail
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Nomor Handphone Agen
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Alamat Perusahaan
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((e) => (
                          <tr className="px-6 py-3 text-left text-xs font-medium text-black tracking-wider">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.password}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.id_agen_kapal}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.nama_perusahaan}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.no_hp_agen}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.alamat_perusahaan}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReqReg;
