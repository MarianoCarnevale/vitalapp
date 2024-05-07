import { useContext } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext";
import { FindDoctor } from "../components/FindDoctor.jsx";

const Home = () => {
  const { user } = useContext(UserTokenContext);

  return user ? (
    <div>
      <h1>Home con user</h1>
    </div>
  ) : (
    <div>
      <FindDoctor />
    </div>
  );
};

export default Home;
