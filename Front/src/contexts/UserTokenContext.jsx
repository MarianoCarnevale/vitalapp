import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { VITE_BASE_URL } from "../config/env";

// Creación del contexto UserTokenContext
export const UserTokenContext = createContext();

// Proveedor del contexto UserTokenContext
export const UserTokenProvider = ({ children }) => {
  // Estado para almacenar el token del usuario
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  // Estado para almacenar los datos del usuario
  const [user, setUser] = useState(null);
  // Estado para manejar la actualización de usuario
  const [updateUser, setUpdateUser] = useState(false);

  // Función para obtener los datos del usuario a partir del token
  const getUser = async (token) => {
    try {
      // Realiza una solicitud GET a la API para obtener los datos del usuario
      const response = await axios.get(`${VITE_BASE_URL}/users`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // Establece los datos del usuario en el estado
      setUser(response.data.data.user);
    } catch (error) {
      console.error(error);
      // Si hay un error, elimina el token del almacenamiento local
      // localStorage.removeItem("token");
    }
  };

  // Cuando el token cambia o hay una actualización de usuario, se obtienen los datos del usuario
  useEffect(() => {
    getUser(token);
  }, [token, updateUser]);

  // Valores que se proporcionarán a los consumidores del contexto
  const UserTokenValues = {
    user,
    setUser,
    token,
    setToken,
    updateUser,
    setUpdateUser,
    getUser,
  };

  // Proporciona el contexto a los componentes hijos
  return (
    <UserTokenContext.Provider value={UserTokenValues}>
      {children}
    </UserTokenContext.Provider>
  );
};

// Verificación de tipos de las props
UserTokenProvider.propTypes = {
  children: PropTypes.node,
};
