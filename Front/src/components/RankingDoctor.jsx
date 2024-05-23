import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";
import { Link } from "react-router-dom";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
export const RankingDoctor = () => {
  const { token } = useContext(UserTokenContext);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getDoctorsRanked = async (token) => {
      try {
        const response = await axios.get(`${VITE_BASE_URL}/doctors/ranking`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setDoctors(response.data.data.doctors);
      } catch (error) {
        console.log(error.message);
      }
    };

    getDoctorsRanked(token);
  }, []);

  console.log(doctors);

  return (
    <section className="max-lg:max-w-lg lg:w-full m-auto flex flex-col gap-6 items-center">
      <p className="mr-auto text-3xl lg:mb-0 text-primary font-semibold dark:text-white">
        Ranking de Doctores
      </p>
      <ul className="w-full max-h-[22.5rem] flex flex-col gap-3 dark:bg-gradient-to-t dark:from-slate-900 dark:to-sky-800  bg-white p-5 border-white rounded-3xl h-full max-h overflow-auto hide-scrollbar shadow-lg">
        {doctors.map((doctor) => {
          return (
            <Link to={`/doctor/${doctor.doctor_id}`} key={doctor.user_id}>
              <li
                className="flex justify-between items-center   gap-5 hover:shadow-md  shadow-xl p-4 text-primary dark:text-white font-bold rounded-3xl"
                key={doctor.user_id}
              >
                <p>
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
                {/* <img
                  className="w-10 h-10 order-4 rounded-full max-lg:hidden"
                  src={
                    doctor.avatar
                      ? `${VITE_BASE_URL}/users/${doctor.user_id}/${doctor.avatar}`
                      : "/images/Avatar.svg"
                  }
                  alt={`Foto de perfil de ${doctor.first_name}`}
                /> */}
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};
