import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const RatingContext = createContext();

export const RatingContextProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <RatingContext.Provider value={{ isModal, setIsModal }}>
      {children}
    </RatingContext.Provider>
  );
};

//props
RatingContextProvider.propTypes = {
  children: PropTypes.node,
};
