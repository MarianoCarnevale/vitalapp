import { Outlet, Navigate } from "react-router-dom";
// import useUser from "../hooks/useUser";
import { useContext, useEffect, useState } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";

export function PrivateRoute() {
  // const { user } = useUser();
  const { user } = useContext(UserTokenContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Cargando...</div>; // Puedes mostrar un spinner u otro indicador de carga
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}
