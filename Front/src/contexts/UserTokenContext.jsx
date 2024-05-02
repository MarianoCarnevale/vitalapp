import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const UserTokenContext = createContext();

export const UserTokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  const getUser = async (token) => {
    try {
      console.log(token);
      const response = await axios.get("http://localhost:4000/users", {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response);
      setUser(response.data.data.user);
      console.log(user);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    getUser(token);
  }, [token]);

  const UserTokenValues = { user, token, setToken };

  return (
    <UserTokenContext.Provider value={UserTokenValues}>
      {children}
    </UserTokenContext.Provider>
  );
};

UserTokenProvider.propTypes = {
  children: PropTypes.node,
};
