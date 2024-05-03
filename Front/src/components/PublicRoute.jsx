import { Outlet, Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export function PublicRoute() {
  const { user } = useUser();

  return !user ? <Outlet /> : <Navigate to="/" />;
}
