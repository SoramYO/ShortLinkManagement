import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import { AuthContext } from "../context/useAuth";
import { User } from "../models/AuthenticateUser";
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(AuthContext) as { user: User | null };
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check for admin routes
  if (location.pathname.startsWith("/admin") && user.role.name !== "ADMIN") {
    return <ErrorPage />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
