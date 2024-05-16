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
        <div className="my-10 max-lg:w-5/6 max-w-md m-auto">
          <FindPatient />
        </div>
      </section>
    ) : (
      <div className="my-10 max-lg:w-5/6 max-w-md m-auto">
        <FindDoctor />
      </div>
    ))
  );
};

export default Search;
