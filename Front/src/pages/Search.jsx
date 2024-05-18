import { useContext } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext";

import { FindDoctor } from "../components/FindDoctor.jsx";
import { FindPatient } from "../components/FindPatient.jsx";

const Search = () => {
  const { user } = useContext(UserTokenContext);
  return (
    user &&
    (user.role === "doctor" ? (
      <section>
        <div className="my-10 w-5/6 max-w-lg m-auto">
          <FindPatient />
        </div>
      </section>
    ) : (
      <div className="my-10 w-5/6 max-w-lg m-auto">
        <FindDoctor />
      </div>
    ))
  );
};

export default Search;
