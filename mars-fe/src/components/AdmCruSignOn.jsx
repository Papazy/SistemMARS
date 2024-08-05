import React, { useEffect } from "react";
import logo from "../assets/logofix.png";
import { useState } from "react";

function AdmCruSignOn() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [IsAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);
  const logout = () => {
    setData([]); // Membersihkan data pengguna dari state setelah logout
    localStorage.removeItem("tokenadmin");
    setIsAuthenticatedAdmin(false);
    window.location.href = "/loginadmin";
  };

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:3001/api/SignOnCru", {
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
  return (
    <div className="px-[50px] py-[50px]">
      <div className="bg-white">
        <div className="flex justify-between items-center gap-[56px] absolute">
          <div className="">
            <a href="">
              {" "}
              <img className="w-[113px] h-[101px]" src={logo} alt="" />
            </a>
          </div>
          <div className="text-[24px] font-bold">
            <ul className="flex justify-between gap-[60px]">
              <li>
                <a href="/request-register" className="">
                  Informasi Pengguna
                </a>
              </li>
              <li>
                <a href="/admin-data-keb" className="text-[#1A719C]">
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
        <div>
          <div className="pt-[179px]">
            <div>
              <ul className="flex justify-center gap-[90px] text-[22px] font-bold ">
                <li>
                  <a href="/admin-data-keb" className="">
                    Keberangkatan
                  </a>
                </li>
                <li>
                  <a href="/admin-data-ked" className="">
                    Kedatangan
                  </a>
                </li>
                <li>
                  <a href="/admin-cru-sign-on" className="text-[#1A719C]">
                    Crew Sign-On
                  </a>
                </li>
                <li>
                  <a href="/admin-cru-sign-off" className="">
                    Crew Sign-Off
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col pt-[30px]">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 ">
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
                            Nama Crew
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Nomor Passpor
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Kebangasaan Crew
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Jadwal Sign On
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Nama Kapal
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Kebangsaan Kapal
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Upload Dokument
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Waktu Melapor
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Nama Agent
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((e) => (
                          <tr
                            key={e.no_paspor}
                            className="px-6 py-3 text-left text-xs font-medium text-black tracking-wider"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.nama_cru}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.no_paspor}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.kebangsaan_cru}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.tg_rencana_sign_on}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.nama_kapal}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.kebangsaan_kapal}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.surat}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.waktu_lapor}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.nama_agen}
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

export default AdmCruSignOn;
