import { useContext } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext";
import axios from "axios";
import { VITE_BASE_URL } from "../config/env";
import { useEffect, useState } from "react";

import { FindDoctor } from "../components/FindDoctor.jsx";
import { FindPatient } from "../components/FindPatient.jsx";
import { DateNow } from "../components/DateNow.jsx";
import { NavLink } from "react-router-dom";

import { ConsultationList } from "../components/ConsultationsList.jsx";
import { ToastContainer } from "react-toastify";
import { SearchConsultation } from "../components/SearchConsultation.jsx";
import { ConsultationsByDiscipline } from "../components/ConsultationsByDiscipline.jsx";
import { Testimonials } from "../components/Testimonials.jsx";
import { TramitingConsultations } from "../components/TramitingConsultations.jsx";

const Home = () => {
  const [consultations, setConsultations] = useState([]);
  const [results, setResults] = useState([]);
  const { token } = useContext(UserTokenContext);

  useEffect(() => {
    const fetchConsultations = async () => {
      const resp = await axios.get(`${VITE_BASE_URL}/consultations`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const consultation = Object.values(resp.data.data.consultations);

      //se separan por un filter en la opcion pendin
      //establecer el listado de consultas
      setConsultations(consultation);

      //establecer el segundo listado de consultas
      setResults(consultation);
    };

    fetchConsultations();
  }, []);

  const { user } = useContext(UserTokenContext);
  return user ? (
    <section className="mb-40 lg:mb-20">
      <ToastContainer autoClose={1500} />
      <div className="lg:hidden">
        <p className="w-5/6 max-w-md m-auto text-primary dark:text-white font-bold text-3xl mt-10 lg:mt-0">
          Hoy
        </p>
        <DateNow />
        <hr className="bg-primary w-5/6 m-auto my-5" />
      </div>
      <div className="w-5/6 max-lg:max-w-lg m-auto grid grid-cols-1 lg:grid-cols-2 max-lg:gap-10 lg:gap-6">
        <div>
          <TramitingConsultations
            consultations={consultations}
            results={results}
          />
        </div>
        <div>
          <SearchConsultation consultations={consultations} results={results} />
        </div>
        {user.role === "patient" && (
          <>
            <div>
              <ConsultationList />
            </div>
            <div>
              <FindDoctor />
            </div>
          </>
        )}
        <div>{user.role === "doctor" && <ConsultationsByDiscipline />}</div>
        <div>{user.role === "doctor" && <FindPatient />} </div>
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
      <section>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl sm:px-6  lg:px-8">
            <div className="relative isolate overflow-hidden bg-slate-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
              <svg
                viewBox="0 0 1024 1024"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                aria-hidden="true"
              >
                <circle
                  cx={512}
                  cy={512}
                  r={512}
                  fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                    <stop stopColor="#7775D6" />
                    <stop offset={1} stopColor="#0398ae" />
                  </radialGradient>
                </defs>
              </svg>
              <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Boost your productivity.
                  <br />
                  Start using our app today.
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Ac euismod vel sit maecenas id pellentesque eu sed
                  consectetur. Malesuada adipiscing sagittis vel nulla.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <a
                    href="#"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Get started
                  </a>
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-white"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <div className="relative mt-16 h-80 lg:mt-8">
                {/* <img
                  className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                  src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                  alt="App screenshot"
                  width={1824}
                  height={1080}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
};

export default Home;
