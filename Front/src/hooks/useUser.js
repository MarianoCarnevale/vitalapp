import { useContext } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";

function useUser() {
  const contextValues = useContext(UserTokenContext);
  if (contextValues === undefined) {
    throw new Error("No puedes usar useUser fuera del provider.");
  }
  return contextValues;
}

export default useUser;
