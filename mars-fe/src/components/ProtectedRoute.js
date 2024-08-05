import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import NotificationModal from "./NotificationModal";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/loginuser" />;
};

const ProtectedRouteAdmin = ({ element }) => {
  const { isAuthenticatedAdmin } = useAuth();
  
  return isAuthenticatedAdmin ? (<><NotificationModal />{element}</>) : <Navigate to="/loginadmin" />;
};

// Export both components
export { ProtectedRoute, ProtectedRouteAdmin };
