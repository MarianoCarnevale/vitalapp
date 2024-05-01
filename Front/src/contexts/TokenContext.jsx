import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const tokenValues = { token, setToken };

  return (
    <TokenContext.Provider value={tokenValues}>
      {children}
    </TokenContext.Provider>
  );
};

TokenProvider.propTypes = {
  children: PropTypes.node,
};
