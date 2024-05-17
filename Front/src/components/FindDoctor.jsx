import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";
import { Link } from "react-router-dom";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";

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
    <section className=" m-auto flex flex-col gap-5 items-center max-lg:max-w-md">
      {user && (
        <p className="mr-auto text-primary text-3xl font-semibold">
          Busca a tus médicos
        </p>
      )}
      <div className="flex w-full gap-4">
        <button
          className={`${
            filterCaracter
              ? "bg-primary text-white border-2 border-white"
              : "bg-white"
          } flex-grow border border-primary text-primary py-2 px-6 rounded-full`}
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
              ? "bg-primary text-white border-2 border-white"
              : "bg-white"
          } flex-grow border border-primary text-primary py-2 px-6 rounded-full`}
          onClick={() => {
            setFilterDisciplines(true);
            setFilterCaracter(false);
          }}
        >
          Especialidades
        </button>
      </div>
      <div className="border flex gap-2 items-center p-4 bg-white w-full  border-primary rounded-3xl">
        <img src="/images/search-icon.svg" alt="input icon" />
        <input
          className="w-full "
          type="text"
          placeholder={
            filterDisciplines
              ? "Busca una especialidad..."
              : "Busca un doctor..."
          }
          onChange={(e) => setName(e.target.value.toLowerCase())}
        />
      </div>

      <ul className="w-full flex flex-col gap-5 bg-white p-5  border-white rounded-3xl h-fit max-h-72 overflow-auto hide-scrollbar shadow-lg">
        {doctors
          .filter((doctor) =>
            filterCaracter
              ? doctor.first_name.toLowerCase().includes(name)
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
                  className="flex justify-between items-center  gap-5 hover:shadow-md  shadow-xl p-4 text-primary font-bold rounded-3xl"
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
                  <p className="border-primary text-white text-sm rounded-2xl bg-primary p-2 order-1">
                    {doctor.discipline_name}
                  </p>
                </li>
              </Link>
            ) : (
              <li
                onClick={handleOpenModal}
                className="flex justify-between items-center  gap-5 shadow-xl p-4 text-primary font-bold rounded-3xl"
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
                <p className="border-primary text-white text-sm rounded-2xl bg-primary p-2 order-1">
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
              <h3 className="py-3 text-lg leading-6 font-medium text-primary text-center mb-5">
                Para acceder a la información de los médicos, porfavor
                registrate o logueate en nuestra aplicación
              </h3>
              <ul className="flex gap-5 justify-center">
                <li className="bg-primary px-4 py-1 rounded-md">
                  <Link to="/register" className="text-white font-bold">
                    Registro
                  </Link>
                </li>
                <li className="bg-primary px-4 py-1 rounded-md">
                  <Link to="/login" className="text-white font-bold">
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
