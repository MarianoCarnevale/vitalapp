import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";

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
    <div className="flex flex-col justify-center p-5 my-10 min-w-2/3">
      <input
        className="border border-primary placeholder-primary rounded-full mb-5 px-10 py-2"
        type="text"
        placeholder="Busca un paciente..."
        onChange={(e) => setName(e.target.value.toLowerCase())}
      />
      <ul className="flex flex-col gap-5 bg-white p-5 border border-primary rounded-sm overflow-scroll min-w-2/3">
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
                className="flex justify-center items-center  gap-5 border border-primary py-1 px-4 text-primary font-bold rounded-full grow"
                key={patient.user_id}
              >
                <p>
                  {patient.first_name} {patient.first_surname}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
