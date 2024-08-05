import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import logofix from "../assets/logofix.png";


const NavbarProfile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    if(auth.isAuthenticated || auth.isAuthenticatedAdmin){
      setIsAuthenticated(true);
    //  ("data", auth);
  }else{
    setIsAuthenticated(false);
  }
  setLoading(false);
  },[auth]);

  const logout = () => {
    auth.logout();
    window.location.href = "/";
  }


  return (
    <div
            className="fixed top-0 left-0 flex z-10 justify-between items-center gap-[55px] w-full  px-[50px] font-bold border-b-2"
            style={{ background: "rgba(255,255,255)" }}
          >
            <div>
              <a className="" href="/">
                <img className="w-[113px] h-[101px]" src={logofix} alt="" />
              </a>
            </div>
            <div>
              <ul className="flex justify-between gap-[50px] text-[16px] ">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    <li>
                      <a className="hover:text-blue-300" href="#services">
                        Our Services
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-blue-300" href="/arrival">
                        Ship Arrival & Departure
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-blue-300" href="/sign-on">
                        Crew Sign-On & Sign-Off
                      </a>
                    </li>
                    <li className="flex gap-[5px]">
                      {isAuthenticated ? (
                        <>
                          <div>
                            <a
                              className="hover:text-blue-300"
                              href="/profile"
                            >
                              Profile
                            </a>
                          </div>
                          <div> | </div>
                          <div>
                            <button
                              className="hover:text-blue-300"
                              onClick={logout}
                            >
                              Logout
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <a className="hover:text-blue-300" href="/loginuser">
                            Login
                          </a>
                            |
                          <a className="hover:text-blue-300" href="/register">
                            SignUp
                          </a>
                        </>
                      )}
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
  )
}

export default NavbarProfile;