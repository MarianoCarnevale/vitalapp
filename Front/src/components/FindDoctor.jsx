import axios from "axios";
import { useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";

export const FindDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [filterCaracter, setFilterCaracter] = useState(true);
  const [filterDisciplines, setFilterDisciplines] = useState(false);
  // const [orderedRating, setOrderedRating] = useState (false);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await axios.get(`${VITE_BASE_URL}/doctors`);
        console.log(response.data.data.activeDoctors);
        setDoctors(response.data.data.activeDoctors);
      } catch (error) {
        console.log(error.message);
      }
    };

    getDoctors();
  }, []);

  console.log(doctors);
  return (
    <div className="flex flex-col justify-center items-center p-5 my-10">
      <div className="flex justify-between mb-5">
        <button
          className="border border-black p-2"
          onClick={() => {
            setFilterCaracter(!filterCaracter);
            setFilterDisciplines(false);
          }}
        >
          Nombre
        </button>
        <button
          className="border border-black p-2"
          onClick={() => {
            setFilterDisciplines(!filterDisciplines);
            setFilterCaracter(false);
          }}
        >
          Especialidades
        </button>
      </div>
      <input
        className="border border-black mb-5 p-2"
        type="text"
        placeholder={
          filterDisciplines ? "Busca una especialidad..." : "Busca un doctor..."
        }
        onChange={(e) => setName(e.target.value.toLowerCase())}
      />
      <ul className="bg-white p-5 border border-black">
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
            return (
              <li key={doctor.user_id}>
                {doctor.first_name} {doctor.first_surname}
                -- {doctor.discipline_name}
              </li>
            );
          })}
      </ul>
    </div>
  );
};
