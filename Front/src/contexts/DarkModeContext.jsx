import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { UserTokenContext } from "./UserTokenContext.jsx";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const { token } = useContext(UserTokenContext);

  useEffect(() => {
    if (token && darkMode) {
      document.documentElement.classList.add("dark");
      console.log("dark mode on");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, token]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

// props
DarkModeProvider.propTypes = {
  children: PropTypes.node,
};
