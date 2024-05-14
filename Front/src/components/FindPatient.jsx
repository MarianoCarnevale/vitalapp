import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import { NavLink } from "react-router-dom";

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
        console.log(response);
        console.log(response.data.data.patients);
        setPatients(response.data.data.patients);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPatients(token);
  }, []);

  // console.log(doctors);
  return (
    <section className="w-5/6 py-10 m-auto flex flex-col gap-4 items-center max-w-md">
      <div className="flex gap-2 items-center p-4 bg-white w-full  border-primary rounded-3xl">
        <img src="/images/search-icon.svg" alt="input icon" />
        <input
          className="w-full"
          type="text"
          placeholder="Busca un paciente..."
          onChange={(e) => setName(e.target.value.toLowerCase())}
        />
      </div>
      <ul className="w-full flex flex-col gap-5 bg-white p-5  border-white rounded-3xl h-72 max-h-72 overflow-auto hide-scrollbar shadow-lg">
        {patients
          .filter((patient) => patient.first_name.toLowerCase().includes(name))
          .sort((a, b) =>
            a.first_name.localeCompare(b.first_name, undefined, {
              sensitivity: "base",
            })
          )
          .map((patient) => {
            return (
              <li
                className="flex justify-between items-center  gap-5 shadow-xl p-4 text-primary font-bold rounded-3xl"
                key={patient.user_id}
              >
                <NavLink to={`/users/${patient.user_id}`}>
                  {patient.first_name} {patient.first_surname}
                </NavLink>
              </li>
            );
          })}
      </ul>
    </section>
  );
};
