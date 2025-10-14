import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/" />;
  if (allowedRoles && !allowedRoles.includes(user.role_id))
    return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
