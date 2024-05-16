// DarkModeContext.jsx
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      console.log("dark mode on");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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
