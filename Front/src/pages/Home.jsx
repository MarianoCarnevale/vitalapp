import { useContext } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext";

import { FindDoctor } from "../components/FindDoctor.jsx";
import { FindPatient } from "../components/FindPatient.jsx";
import { DateNow } from "../components/DateNow.jsx";
import { NavLink } from "react-router-dom";

import { ConsultationList } from "../components/ConsultationsList.jsx";

const Home = () => {
  const { user } = useContext(UserTokenContext);
  console.log(user);
  return user ? (
    <section className="mb-40">
      <div className="lg:hidden">
        <h1 className="w-5/6 max-w-md m-auto text-primary font-bold text-3xl mt-10 lg:mt-0">
          Hoy
        </h1>

        <DateNow />

        <hr className="bg-primary w-5/6 m-auto my-5" />
      </div>
      <div className="w-5/6 m-auto lg:grid lg:grid-rows-1 lg:grid-cols-2 lg:grid-flow-col lg:gap-10 max-lg:flex max-lg:flex-col max-lg:gap-5 ">
        <div className="row-span-3 ">
          <ConsultationList />
        </div>
        <div className="row-span-2">
          {user.role === "doctor" ? <FindPatient /> : <FindDoctor />}
        </div>
        <div className="">
          <FindDoctor />
        </div>
      </div>
    </section>
  ) : (
    <>
      <div className="bg-hero-pattern h-dvh py-16 bg-cover">
        <h1 className="w-2/4 py-5 text-center m-auto text-5xl font-bold text-white">
          VitalApp
        </h1>
        <p className="w-2/4 text-center m-auto text-white py-5">
          Busca tu médico, o encuentra los médicos de la especialidad
          seleccionada
        </p>
        <div className="w-5/6 m-auto max-w-md">
          <FindDoctor />
        </div>
      </div>
      <section className="flex flex-col items-center lg:flex-row w-3/4 m-auto lg:items-start ">
        <div className="pt-20 pb-10 text-center  lg:w-2/4  lg:text-left mx-auto">
          <h2 className="text-3xl font-bold text-primary">
            Ayudamos a manter tu salud al día sin complicaciones
          </h2>
          <p className="text-secondary m-auto text-center lg:text-left py-10">
            Si todavia no nos conoces puedes registrarte y comenzar tu consulta
            con los profesionales.
          </p>
          <NavLink
            to="/register"
            className="ml-auto bg-primary text-white font-semibold p-4 rounded-2xl"
          >
            Registrate
          </NavLink>
        </div>
        <img className="min-w-96 w-2/5" src="./images/vitalapp.jpg" alt="" />
      </section>
    </>
  );
};

export default Home;
