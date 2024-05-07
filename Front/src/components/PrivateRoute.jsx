import { Outlet, Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export function PrivateRoute() {
  const { user } = useUser();

  return !user ? <Outlet /> : <Navigate to="/login" />;
}
