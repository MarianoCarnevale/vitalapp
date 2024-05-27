import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";

export function PublicRoute() {
  const { user } = useContext(UserTokenContext);

  return !user ? <Outlet /> : <Navigate to="/" />;
}
