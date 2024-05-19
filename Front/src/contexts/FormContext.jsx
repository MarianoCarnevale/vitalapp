import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const FormContext = createContext();

export const FormContextProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <FormContext.Provider value={{ isModal, setIsModal }}>
      {children}
    </FormContext.Provider>
  );
}

//props
FormContextProvider.propTypes = {
  children: PropTypes.node,
}