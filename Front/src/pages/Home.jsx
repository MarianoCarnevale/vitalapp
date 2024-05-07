import { useContext } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext";
import { FindDoctor } from "../components/FindDoctor.jsx";
import { FindPatient } from "../components/FindPatient.jsx";

const Home = () => {
  const { user } = useContext(UserTokenContext);

  return user ? (
    <FindPatient />
  ) : (
    <div>
      <FindDoctor />
    </div>
  );
};

export default Home;
