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
import AdmCruSignOff from "./components/AdmCruSignOff";
import AdmCruSignOn from "./components/AdmCruSignOn";
import AdmDataKeb from "./components/AdmDataKeb";
import AdmDataKed from "./components/AdmDataKed";
import '../src/config/axiosConfig'
import TestApi from "./components/testApi";
import Profile from "./components/Profile";
import TableKedatangan from "./components/tables/TableKedatangan";
import ProfileTable from "./components/ProfileTable";
import AdminLayout from "./components/admin/AdminLayout";
import Table from "./components/admin/table/Table";
import TableKapal from "./components/admin/table/kapal";

function App() {
  document.title = "MARS";

  const adminRoutes = [
    {
      path: "/admin",
      element: <TableKapal/>
    },
    {
      path: "/admin/pengguna",
      element: <div>User</div>
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
      element: <AdmCruSignOn/>
    },
    {
      path: "/admin/sign-off",
      element: <AdmCruSignOff/>
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
          <Route
            path="/admin-cru-sign-off"
            element={<ProtectedRouteAdmin element={<AdmCruSignOff />} />}
          />
          <Route
            path="/admin-cru-sign-on"
            element={<ProtectedRouteAdmin element={<AdmCruSignOn />} />}
          />
          <Route
            path="/admin-data-keb"
            element={<ProtectedRouteAdmin element={<AdmDataKeb />} />}
          />
          <Route
            path="/admin/pengguna"
            element={<ProtectedRouteAdmin element={<AdminLayout element={<div>User</div>} />} />}
          />
          <Route
            path="/admin/adm"
            element={<ProtectedRouteAdmin element={<AdminLayout element={<div>Administrasi</div>} />} />}
          />

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
