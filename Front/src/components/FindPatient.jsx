import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import { Link } from "react-router-dom";

export const FindPatient = () => {
  const { token } = useContext(UserTokenContext);
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  // const [filterCaracter, setFilterCaracter] = useState(true);
  // const [filterDisciplines, setFilterDisciplines] = useState(false);
  // const [orderedRating, setOrderedRating] = useState (false);

  useEffect(() => {
    const getPatients = async (token) => {
      try {
        const response = await axios.get(`${VITE_BASE_URL}/users/patients`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setPatients(response.data.data.patients);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPatients(token);
  }, []);

  return (
    <section className="max-lg:max-w-lg lg:w-full m-auto flex flex-col gap-5 items-center">
      <p className="mr-auto text-3xl lg:mb-0 text-primary font-semibold dark:text-white">
        Busca a tus pacientes
      </p>
      <div className="flex border gap-2 items-center p-4 bg-white w-full  border-primary dark:border-none rounded-3xl dark:bg-sky-800">
        <img src="/images/search-icon.svg" alt="input icon" />
        <input
          className="dark:bg-sky-800 w-full placeholder:dark:text-white dark:text-white focus-visible:outline-none focus-visible:border-none"
          type="text"
          placeholder="Busca un paciente..."
          onChange={(e) => setName(e.target.value.toLowerCase())}
        />
      </div>
      <ul className="w-full max-lg:h-full max-h-[17.5rem] flex flex-col gap-3 dark:bg-gradient-to-t dark:from-slate-900 dark:to-sky-800  bg-white p-5 border-white rounded-3xl h-full max-h overflow-auto hide-scrollbar shadow-lg">
        {patients
          .filter((patient) => patient.first_name.toLowerCase().includes(name))
          .sort((a, b) =>
            a.first_name.localeCompare(b.first_name, undefined, {
              sensitivity: "base",
            })
          )
          .map((patient) => {
            return (
              <Link to={`/users/${patient.user_id}`} key={patient.user_id}>
                <li
                  className="flex justify-between items-center hover:shadow-md  gap-5 shadow-xl p-4 dark:text-white text-primary font-bold rounded-3xl"
                  key={patient.user_id}
                >
                  <p>
                    {patient.first_name} {patient.first_surname}
                  </p>
                  <p>
                    <img
                      className="w-10 h-10 order-4 rounded-full max-lg:hidden"
                      src={
                        patient.avatar
                          ? `${VITE_BASE_URL}/users/${patient.user_id}/${patient.avatar}`
                          : "/images/Avatar.svg"
                      }
                      alt={`Foto de perfil de ${patient.first_name}`}
                    />
                  </p>
                </li>
              </Link>
            );
          })}
      </ul>
    </section>
  );
};
