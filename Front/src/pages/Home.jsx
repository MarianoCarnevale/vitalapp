import { useContext, useEffect } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext";

const Home = () => {
  const { token } = useContext(UserTokenContext);
  useEffect(() => {}, [token]);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
