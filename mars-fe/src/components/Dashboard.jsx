import React from "react";
import Navbar from "./Navbar";
import { useAuth } from "../auth/AuthContext";
import BasicTable from "./tables/BasicTable";

const Dashboard = () => {
  const auth = useAuth();

  const name = auth.user.username;
  const initialArray = name.split(" ");
  let initial = "";
  initialArray.forEach((ele) => {
    initial += ele[0];
  });

  return (
    <div>
      <div className="px-[50px] py-[50px] font-bold">
        <div className="px-[100px]">
          <div className="profil pt-[50px]">
            <div className="flex gap-[8px] justify-center text-[48px]">
              <div className="text-[#1A719C]">PROFILE</div>
            </div>
            <div className="flex flex-col pt-[10px]">
              <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 flex justify-center items-center">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg w-[800px]">
                    <div className="card border rounded py-3 flex justify-center items-center ">
                      <div className="photo border-r px-5 flex-2">
                        <div className="rounded-full h-[250px] w-[250px] bg-slate-400 flex justify-center items-center text-4xl">
                          {initial}
                        </div>
                      </div>
                      <div className="details flex-1">
                        <div className="pl-5 ">
                          <table>
                            <tr>
                              <td className="pr-5">Username</td>
                              <td className="font-normal">
                                : {auth.user.username}
                              </td>
                            </tr>
                            <tr>
                              <td className="pr-5">ID Agen Kapal</td>
                              <td className="font-normal">
                                : {auth.user.id_agen_kapal}
                              </td>
                            </tr>
                            <tr>
                              <td className="pr-5">Email</td>
                              <td className="font-normal">
                                : {auth.user.email}
                              </td>
                            </tr>
                            <tr>
                              <td className="pr-5">No HP</td>
                              <td className="font-normal">
                                : {auth.user.no_hp_agen}
                              </td>
                            </tr>
                            <tr>
                              <td className="pr-5">Nama Perusahaan</td>
                              <td className="font-normal">
                                : {auth.user.nama_perusahaan}
                              </td>
                            </tr>
                            <tr>
                              <td className="pr-5">ِAlamat Perusahaan</td>
                              <td className="font-normal">
                                : {auth.user.alamat_perusahaan}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
     
    
    </div>
  );
};

export default Dashboard;
