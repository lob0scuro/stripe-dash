import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedLayout;
