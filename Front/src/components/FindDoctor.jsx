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
      <div className="flex justify-around gap-5 mb-5">
        <button
          className={`${
            filterCaracter ? "bg-slate-400" : "bg-white"
          } border border-primary text-primary py-2 px-6 rounded-full`}
          onClick={() => {
            setFilterCaracter(!filterCaracter);
            setFilterDisciplines(false);
          }}
        >
          Nombre
        </button>
        <button
          className={`${
            filterDisciplines ? "bg-slate-400" : "bg-white"
          } border border-primary text-primary py-2 px-6 rounded-full`}
          onClick={() => {
            setFilterDisciplines(!filterDisciplines);
            setFilterCaracter(false);
          }}
        >
          Especialidades
        </button>
      </div>
      <input
        className="border border-primary placeholder-primary rounded-full mb-5 px-10 py-2"
        type="text"
        placeholder={
          filterDisciplines ? "Busca una especialidad..." : "Busca un doctor..."
        }
        onChange={(e) => setName(e.target.value.toLowerCase())}
      />
      <ul className="flex flex-col gap-5 bg-white p-5 border border-primary rounded-lg max-h-72 overflow-scroll">
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
              <li
                className="flex justify-between items-center  gap-5 border border-primary py-1 px-4 text-primary font-bold rounded-full grow"
                key={doctor.user_id}
              >
                <p>
                  {doctor.first_name} {doctor.first_surname}
                </p>
                <p className="border-primary text-white text-sm rounded-full bg-primary p-2">
                  {doctor.discipline_name}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
