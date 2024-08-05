

const Sidebar = ({active, setSelected}) => {
  return (
    <div className="fixed pt-32 h-full left-0  pl-16 pr-20 w-[250px] border-r-2 bg-white z-[8]">
      <div className="w-[60px] mb-3 text-[18px]">
      <button onClick={()=>setSelected("profile")}className={`hover:text-blue-500 ${active === 'profile' ? 'text-blue-500 font-semibold' : ''}`}>Profile</button>
        
      </div>
      <div className="w-[60px] mb-3 text-[18px]">
      <button onClick={()=>setSelected("booking")}className={`hover:text-blue-500 ${active === 'booking' ? 'text-blue-500 font-semibold' : ''}`}>Booking</button>

      </div>
    </div>
  )
}

export default Sidebar;