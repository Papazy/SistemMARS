  // src/AuthContext.js
  import { createContext, useContext, useState, useEffect } from "react";

  const AuthContext = createContext(null);

  export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
      const refreshAccessToken = async () => {
        try{
          const response = await fetch("http://localhost:3001/api/refreshToken", {
            method: "POST",
            credentials: 'include',
          })
          if(response.ok){
            const data = await response.json();
            setToken(data.accessToken)
            localStorage.setItem("token", data.accessToken);
          }else{
            alert("Failed to refresh token")
            console.log("Failed to refresh token")
            throw new Error("Failed to refresh token")
          }
        }catch(err){
          console.log(err.message)
          alert(err.message)
          logout();

        }
      }

      if(token){
        refreshAccessToken();
      }
    }, [token]);

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
      // Cek token di localStorage
      return localStorage.getItem("token") !== null;
    });

    const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(()=>{
      return localStorage.getItem("admin") !== null;
    });

    const login = async (username, password) => {
      const response = await fetch("http://localhost:3001/api/loginMars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: 'include',
      });
      console.log("response");
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        setToken(token);
        setUser(data.user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsAuthenticated(true);
        window.location.href = "/";
      } else {
        throw Error("Tidak bisa mendapatkan data");
      }
    };

    const loginAdmin = async (username, password) => {
      const response = await fetch("http://localhost:3001/api/loginAdminMars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        setIsAuthenticatedAdmin(true);
        setToken(token);
        setUser(data.user);
        localStorage.setItem("token", token);
        localStorage.setItem("admin", JSON.stringify(data.user));
      } else {
        console.log("error tidak bisa dapat data admin")
        throw Error("Tidak bisa mendapatkan data");
      }
    };

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      localStorage.removeItem("user");
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsAuthenticated(false);
      setIsAuthenticatedAdmin(false);
      setUser(null);
    };

    return (
      <AuthContext.Provider value={{ isAuthenticated, isAuthenticatedAdmin, login, loginAdmin, logout, user, token }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => {
    return useContext(AuthContext);
  };
