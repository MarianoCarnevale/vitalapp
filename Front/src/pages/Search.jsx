import { useContext } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext";

import { FindDoctor } from "../components/FindDoctor.jsx";
import { FindPatient } from "../components/FindPatient.jsx";

const Search = () => {
  const { user } = useContext(UserTokenContext);
  return user && (user.role === "doctor" ? <FindPatient /> : <FindDoctor />);
};

export default Search;
