import Dashboard from "./Dashboard";
import NavbarProfile from "./NavbarProfile";
import Sidebar from "./Sidebar";
import { useState } from "react";
import EditModal from "./modal/EditModal";
import DeleteModal from "./modal/DeleteModal";
import ProfileTable from "./ProfileTable";

const Profile = () => {
  const [selected, setSelected] = useState("profile");
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [reloadData, setReloadData] = useState(false);
  const [tipe, setTipe] = useState('datang');
  const handleActionSuccess = () => {
    setReloadData(!reloadData);
  }

    return (
        <div className="min-h-screen">
            {isOpenModalDelete !== null && <DeleteModal tipe={tipe} isOpen={isOpenModalDelete} setIsOpen={setIsOpenModalDelete} rowId={rowId} onDeleteSuccess={handleActionSuccess} />}
            { isOpenModalEdit && <EditModal isOpen={isOpenModalEdit} setIsOpen={setIsOpenModalEdit} rowId={rowId} onEditSuccess={handleActionSuccess} tipe={tipe}/>}
            <NavbarProfile />
            <div className="flex">
              <Sidebar active={selected} setSelected={setSelected}/>
              {selected === 'profile' && 
              <div className="flex ml-[20vw] h-[85vh]">
                <Dashboard /> 
                </div>
                }
              {selected === 'booking' && 
              <div className="mt-[120px] ml-[16vw] min-h-[70vh] pb-20">
                <div className="flex justify-center items-center pb-5">
                  <div className="text-[48px] text-[#1A719C]">Booking</div>
                </div>
                <ProfileTable setIsOpenModalDelete={setIsOpenModalDelete} setIsOpenModalEdit={setIsOpenModalEdit} setRowId={setRowId} reloadData={reloadData} setTipe={setTipe}/> 
                </div>
                }
              
            </div>
            <div className="relative bottom-0">

        <div className="footer ml-[20vh] h-[100px] bg-[#1A719C] flex justify-center place-items-center font-bold text-[20px] text-white">
          Integrated of Banda Aceh, Sabang, and Lhokseumawe Information System
        </div>
            </div>

            {/* Modal */}
        </div>
    );
}

export default Profile;