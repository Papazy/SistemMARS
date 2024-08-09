// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import {
  ProtectedRoute,
  ProtectedRouteAdmin,
} from "./components/ProtectedRoute";
import Arv from "./components/Arv";
import Dept from "./components/Dept";
import SignOn from "./components/SignOn";
import SignOff from "./components/SignOff";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import LoginUser from "./components/LoginUser";
import LoginAdmin from "./components/LoginAdmin";
import Register from "./components/Register";
import ReqReg from "./components/ReqReg";
import '../src/config/axiosConfig'
import TestApi from "./components/testApi";
import Profile from "./components/Profile";
import TableKedatangan from "./components/tables/TableKedatangan";
import ProfileTable from "./components/ProfileTable";
import AdminLayout from "./components/admin/AdminLayout";
import Table from "./components/admin/table/Table";
import TableKapal from "./components/admin/table/kapal";
import TableKru from "./components/admin/table/kru";
import TablePengguna from "./components/admin/table/user";

function App() {
  document.title = "MARS";

  const adminRoutes = [
    {
      path: "/admin",
      element: <TablePengguna/>,
    },
    {
      path: "/admin/pengguna",
      element: <TablePengguna/>
    },
    {
      path: "/admin/keberangkatan",
      element: <TableKapal tipe="berangkat"/>
    },
    {
      path: "/admin/kedatangan",
      element: <TableKapal tipe="datang"/>
    },
    {
      path: "/admin/sign-on",
      element: <TableKru tipe="sign_on"/>
    },
    {
      path: "/admin/sign-off",
      element: <TableKru tipe="sign_off"/>
    }
  ]
  

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/arrival"
            element={<ProtectedRoute element={<Arv />} />}
          />
          <Route
            path="/departure"
            element={<ProtectedRoute element={<Dept />} />}
          />
          <Route
            path="/sign-on"
            element={<ProtectedRoute element={<SignOn />} />}
          />
          <Route
            path="/sign-off"
            element={<ProtectedRoute element={<SignOff />} />}
          />
        
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route path="/loginuser" element={<LoginUser />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/request-register" 
            element={<ProtectedRouteAdmin element={<ReqReg/>} />} />
          <Route path="/test-api" element={<TestApi/>} />
          <Route path="/test" element={<AdminLayout/>} />
          
          {adminRoutes.map((route, index) => (
            <Route key={index} path={route.path} exact element={<AdminLayout element={route.element}/>} />
          ))}
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
