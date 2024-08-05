import React from "react";
import logo from "../assets/logofix.png";
import { useState, useEffect } from "react";
import { formatDate, downloadDokument } from "../config/utils";


function AdmDataKeb() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [IsAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);
  const [checkedStatuses, setCheckedStatuses] = useState({});

  useEffect(() => {
    // Load checked statuses from localStorage
    const initialCheckedStatuses = {};
    data.forEach((item) => {
      const storedStatus = localStorage.getItem(item.imo_number);
      if (storedStatus) {
        initialCheckedStatuses[item.imo_number] = storedStatus === "true";
      }
    });
    setCheckedStatuses(initialCheckedStatuses);
  }, [data]);

  const handleCheckboxChange = (imo_number) => {
    const newStatus = !checkedStatuses[imo_number];
    setCheckedStatuses({
      ...checkedStatuses,
      [imo_number]: newStatus,
    });
    localStorage.setItem(imo_number, newStatus.toString());
  };

  const logout = () => {
    setData([]); // Clear user data from state after logout
    localStorage.removeItem("tokenadmin");
    setIsAuthenticatedAdmin(false);
    window.location.href = "/loginadmin";
  };

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:3001/api/BerangkatKapal", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  console.log(data);

  return (
    <div className="px-[50px] py-[50px] relative">
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
                    className=" focus:outline-none"
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
                  <a href="/admin-data-keb" className="text-[#1A719C]">
                    Keberangkatan
                  </a>
                </li>
                <li>
                  <a href="/admin-data-ked" className="">
                    Kedatangan
                  </a>
                </li>
                <li>
                  <a href="/admin-cru-sign-on" className="">
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
                            Nama Agen Kapal
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Perusahaan Agen Kapal
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Nomor IMO Kapal
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
                            Kebangasaan Kapal
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Jumlah Awak WNI
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Jumlah Awak WNA
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Pelabuhan Asal Kapal
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Pelabuhan Tujuan Kapal
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Lokasi Pelayanan
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Jadwal Keberangkatan Kapal
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                          >
                            Tujuan Keberangkatan Kapal
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
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((e) => (
                          <tr className="px-6 py-3 text-left text-xs font-medium text-black tracking-wider">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.nama_agen_kapal}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.perusahaan_agen_kapal}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.imo_number}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.nama_kapal}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.kebangsaan_kapal}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.data_cru_indonesia}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.data_cru_asing}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.pelabuhan_asal}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.pelabuhan_tujuan}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.service_location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {formatDate(e.jadwal_keberangkatan)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              
                              {e.tujuan_keberangkatan}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <button onClick={()=>downloadDokument(e.dokument)}>
                              Dokumen
                            </button >
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={checkedStatuses[e.imo_number] || false}
                                onChange={() =>
                                  handleCheckboxChange(e.imo_number)
                                }
                              />
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

export default AdmDataKeb;
