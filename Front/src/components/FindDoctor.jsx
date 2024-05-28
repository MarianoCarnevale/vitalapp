import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";
import { Link } from "react-router-dom";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
export const FindDoctor = () => {
  const { user } = useContext(UserTokenContext);
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [filterCaracter, setFilterCaracter] = useState(true);
  const [filterDisciplines, setFilterDisciplines] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [orderedRating, setOrderedRating] = useState (false);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await axios.get(`${VITE_BASE_URL}/doctors`);
        setDoctors(response.data.data.doctors);
      } catch (error) {
        console.log(error.message);
      }
    };

    getDoctors();
  }, []);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="max-lg:max-w-lg m-auto flex flex-col gap-5 items-center ">
      {user && (
        <p className="max-lg:mb-5 mr-auto text-primary dark:text-white text-3xl font-semibold">
          Busca a tus médicos
        </p>
      )}
      <div className="flex w-full gap-4">
        <button
          className={`${
            filterCaracter
              ? "bg-gradient-to-b from-primary to-cyan-700 dark:bg-sky-800 text-white  shadow-md hover:shadow-sm "
              : "bg-white dark:bg-slate-700 shadow-xl"
          } flex-grow text-primary dark:text-white py-2 px-6  font-semibold rounded-full`}
          onClick={() => {
            setFilterCaracter(true);
            setFilterDisciplines(false);
          }}
        >
          Nombre
        </button>
        <button
          className={`${
            filterDisciplines
              ? "bg-gradient-to-b from-primary to-cyan-700 dark:bg-sky-800 text-white  shadow-md hover:shadow-sm"
              : "bg-white dark:bg-slate-700 shadow-xl "
          } flex-grow dark:text-white text-primary  font-semibold py-2 px-6 rounded-full duration-500`}
          onClick={() => {
            setFilterDisciplines(true);
            setFilterCaracter(false);
          }}
        >
          Especialidades
        </button>
      </div>
      <div className="border flex gap-2 items-center dark:border-none p-4 bg-white dark:bg-sky-800 w-full   border-primary rounded-3xl">
        <img src="/images/search-icon.svg" alt="input icon" />
        <input
          className="w-full dark:bg-sky-800 dark:text-white dark:placeholder:text-white  "
          type="text"
          placeholder={
            filterDisciplines
              ? "Busca una especialidad..."
              : "Busca un doctor..."
          }
          onChange={(e) => setName(e.target.value.toLowerCase())}
        />
      </div>
      <ul className="max-lg:max-w-lg max-lg:h-full max-lg:max-h-[19rem] w-full h-[19rem] flex flex-col gap-5  dark:bg-gradient-to-t dark:from-slate-900 dark:to-sky-800  bg-white p-5  border-white rounded-3xl  overflow-auto hide-scrollbar shadow-lg">
        {doctors
          .filter((doctor) =>
            filterCaracter
              ? doctor.first_name.toLowerCase().includes(name) ||
                doctor.first_surname.toLowerCase().includes(name)
              : true
          )
          .filter((doctor) =>
            filterDisciplines
              ? doctor.discipline_name.toLowerCase().includes(name)
              : true
          )
          .sort((a, b) =>
            a.first_name.localeCompare(b.first_name, undefined, {
              sensitivity: "base",
            })
          )
          .map((doctor) => {
            return user ? (
              <Link to={`/doctor/${doctor.doctor_id}`} key={doctor.user_id}>
                <li
                  className="flex justify-start items-center   gap-5 hover:shadow-md  shadow-xl p-4 text-primary dark:text-white font-bold rounded-3xl"
                  key={doctor.user_id}
                >
                  <p
                    className={`grow text- ${
                      filterDisciplines
                        ? doctor.discipline_name + " order-2"
                        : "order-1"
                    }`}
                  >
                    {doctor.first_name} {doctor.first_surname}
                  </p>
                  <p className="border-primary text-white text-sm rounded-2xl bg-gradient-to-b from-primary to-cyan-700 dark:bg-sky-800 p-2 order-1">
                    {doctor.discipline_name}
                  </p>
                  <p className="flex justify-center items-center w-14 h-10 order-3 bg-gradient-to-b from-primary to-cyan-700 dark:bg-sky-800 rounded-full text-white">
                    {Number.isInteger(Number(doctor.avg_rating))
                      ? Number(doctor.avg_rating)
                      : Number(doctor.avg_rating).toFixed(1)}
                    <StarRoundedIcon color="white" />
                  </p>
                  <img
                    className="w-10 h-10 order-4 rounded-full max-lg:hidden"
                    src={
                      doctor.avatar !== null
                        ? `${VITE_BASE_URL}/users/${doctor.user_id}/${doctor.avatar}`
                        : "/images/Avatar.svg"
                    }
                    alt={`Foto de perfil de ${doctor.first_name}`}
                  />
                </li>
              </Link>
            ) : (
              <li
                onClick={handleOpenModal}
                className="flex justify-between items-center  gap-5 shadow-xl p-4 text-primary dark:text-white font-bold rounded-3xl"
                key={doctor.user_id}
              >
                <p
                  className={`${
                    filterDisciplines
                      ? doctor.discipline_name + " order-2"
                      : "order-1"
                  }`}
                >
                  {doctor.first_name} {doctor.first_surname}
                </p>
                <p className="border-primary text-white text-sm rounded-2xl bg-primary dark:bg-sky-800 p-2 order-1">
                  {doctor.discipline_name}
                </p>
              </li>
            );
          })}
      </ul>
      {isModalOpen && (
        <>
          <div
            onClick={() => setIsModalOpen(false)}
            className="bg-black bg-opacity-75 w-screen h-screen fixed inset-0 flex "
          >
            <div className="w-5/6 z-20 m-auto bg-white rounded-lg p-6 max-w-lg ">
              <h3 className="py-3 text-lg leading-6 font-medium text-primary dark:text-white text-center mb-5">
                Para acceder a la información de los médicos, porfavor
                registrate o logueate en nuestra aplicación
              </h3>
              <ul className="flex gap-5 justify-center">
                <li className="bg-primary dark:bg-sky-800   rounded-md">
                  <Link
                    to="/register"
                    className="p-2 text-white font-bold block"
                  >
                    Registro
                  </Link>
                </li>
                <li className="bg-primary dark:bg-sky-800 rounded-md">
                  <Link to="/login" className="p-2 text-white font-bold block">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
