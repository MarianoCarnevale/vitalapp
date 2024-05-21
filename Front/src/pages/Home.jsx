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
    <section className="mb-40">
      <ToastContainer autoClose={1500} />
      <div className="lg:hidden">
        <h1 className="w-5/6 max-w-md m-auto text-primary font-bold text-3xl mt-10 lg:mt-0">
          Hoy
        </h1>
        <DateNow />
        <hr className="bg-primary w-5/6 m-auto my-5" />
      </div>
      <div className="w-5/6 max-lg:max-w-lg m-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <ConsultationList />
        </div>
        <div>
          <SearchConsultation consultations={consultations} results={results} />
        </div>
        <div>{user.role === "doctor" ? <FindPatient /> : <FindDoctor />}</div>
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
          <div className="mx-auto max-w-7xl sm:px-6 sm:pb-32 lg:px-8">
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
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img
            className="mx-auto h-12"
            src="/images/logo-vitalapp.svg"
            alt=""
          />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                “¡A nuestro equipo le encanta usar VitalApp para sus consultas
                virtuales fluidas! Ha revolucionado la forma en que nos
                conectamos con los pacientes.”
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                className="mx-auto h-10 w-10 rounded-full"
                src="/images/martinLinkedin.jpeg"
                alt=""
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">Martín Castro</div>
                <svg
                  viewBox="0 0 2 2"
                  width="3"
                  height="3"
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div className="text-gray-600">CEO of HealthConnectHub</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img
            className="mx-auto h-12"
            src="/images/logo-vitalapp.svg"
            alt=""
          />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                “VitalApp ha transformado la atención al paciente con su
                interfaz fácil de usar. ¡Es un punto de inflexión en el campo
                médico!”
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                className="mx-auto h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">Adrián Acuña</div>
                <svg
                  viewBox="0 0 2 2"
                  width="3"
                  height="3"
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div className="text-gray-600">CEO of VirtualWellnessCare</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img
            className="mx-auto h-12"
            src="/images/logo-vitalapp.svg"
            alt=""
          />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                “VitalApp es un salvavidas para nuestra ajetreada práctica.
                Agiliza las citas y mejora la comunicación con los pacientes.
                ¡Muy recomendable!”
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                className="mx-auto h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">
                  Mariano Carnevale
                </div>
                <svg
                  viewBox="0 0 2 2"
                  width="3"
                  height="3"
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div className="text-gray-600">CEO of HealthLinkMD</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img
            className="mx-auto h-12"
            src="/images/logo-vitalapp.svg"
            alt=""
          />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                “VitalApp ha mejorado nuestra eficiencia y satisfacción del
                paciente. Es una herramienta imprescindible para cualquier
                proveedor de atención médica”
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                className="mx-auto h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">Yogesh</div>
                <svg
                  viewBox="0 0 2 2"
                  width="3"
                  height="3"
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div className="text-gray-600">CEO of MedConsultPro</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img
            className="mx-auto h-12"
            src="/images/logo-vitalapp.svg"
            alt=""
          />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                “El uso de VitalApp ha hecho que las consultas remotas sean muy
                sencillas. Nuestros pacientes aprecian la comodidad y a nuestro
                equipo le encanta la plataforma fácil de usar.”
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                className="mx-auto h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">Adrián López</div>
                <svg
                  viewBox="0 0 2 2"
                  width="3"
                  height="3"
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div className="text-gray-600">CEO of CareConnectOnline</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
};

export default Home;
