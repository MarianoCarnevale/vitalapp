import { useContext } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext";

import { FindDoctor } from "../components/FindDoctor.jsx";
import { FindPatient } from "../components/FindPatient.jsx";
import { DateNow } from "../components/DateNow.jsx";

const Home = () => {
  const { user } = useContext(UserTokenContext);
  console.log(user);
  return user ? (
    <>
      <h1 className="w-5/6 max-w-md m-auto text-primary font-bold text-3xl mt-10 lg:mt-0">
        Hoy
      </h1>
      <DateNow />
      {user.role === "doctor" ? <FindPatient /> : <FindDoctor />}
    </>
  ) : (
    <>
      <h1 className="w-2/4 py-5 text-center m-auto text-5xl font-bold text-white">
        VitalApp
      </h1>
      <p className="w-2/4 text-center m-auto text-white py-5">
        Busca tu médico, o encuentra los médicos de la especialidad seleccionada
      </p>
      <FindDoctor />
      {/* <h2 className="w-3/4 py-5 text-center m-auto text-2xl font-bold text-white">
        Ayudamos a manter tu salud al día sin complicaciones
      </h2> */}
    </>
  );
};

export default Home;
