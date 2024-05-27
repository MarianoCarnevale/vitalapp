import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserTokenContext } from "../contexts/UserTokenContext";
import { VITE_BASE_URL } from "../config/env.js";
import { Rating } from "@mui/material";

const ProfileDoctor = () => {
  const { token, user } = useContext(UserTokenContext);
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const response = await axios.get(`${VITE_BASE_URL}/doctor/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const doctorData = response.data.data.doctor; // Cambia 'response.data.doctor' a 'response.data.data.doctor'
        setDoctor(doctorData);
      } catch (error) {
        console.log(error.message);
      }
    };

    getDoctor();
  }, [id, token]);

  useEffect(() => {
    if (doctor?.avatar) {
      const url = `${VITE_BASE_URL}/users/${doctor.user_id}/${doctor.avatar}`;
      setAvatarUrl(url);
    } else {
      // Establecer la URL de la imagen predeterminada si doctor.avatar no existe
      setAvatarUrl("/images/Avatar.svg");
    }
  }, [doctor]);

  let yearsOfExperience;

  if (doctor) {
    const experienceStartDate = new Date(doctor.experience);
    const currentDate = new Date();
    yearsOfExperience =
      currentDate.getFullYear() - experienceStartDate.getFullYear();
  }

  return (
    <section className="w-5/6 lg:py-0 py-10 m-auto flex flex-col gap-4 items-center max-w-md">
      <h1 className="text-3xl font-semibold text-primary  ">
        Perfil del doctor
        {/* {patient && `Perfil del paciente ${patient.first_surname}`} */}
      </h1>

      <div className="my-6 rounded-full overflow-hidden h-40 w-40 z-10">
        <img className="h-40 w-40" src={avatarUrl} alt="Avatar" />
      </div>
      <div className="dark:bg-slate-700  flex flex-col max-w-md items-center gap-3 absolute mt-48 py-16 bg-white w-5/6 rounded-3xl shadow-2xl z-0">
        {user && doctor && (
          <>
            <h2 className="dark:text-white font-semibold text-center text-primary text-xl">
              {doctor.first_name} {doctor.first_surname}
              <hr />
            </h2>
            <h3 className="text-lg text-secondary font-semibold">
              {doctor.discipline_name}
            </h3>
            {
              <Rating
                name="rating"
                value={+doctor.avg_rating}
                precision={0.5}
                readOnly
              />
            }
            <h3 className=" font-semibold text-right text-primary text-md">
              Email
            </h3>
            <p className="text-secondary">{doctor.email}</p>
            {doctor.phone && (
              <>
                <h3 className=" font-semibold text-right text-primary text-md">
                  Teléfono
                </h3>
                <p className="text-secondary">{doctor.phone}</p>
              </>
            )}
            {doctor.address && (
              <>
                <h3 className=" font-semibold text-right text-primary text-md">
                  Dirección
                </h3>
                <p className="text-secondary">{doctor.address}</p>
              </>
            )}
            {doctor.bio && (
              <>
                <h3 className=" font-semibold text-right text-primary text-md">
                  Biografía
                </h3>
                <p className="text-secondary">{doctor.bio}</p>
              </>
            )}
            {doctor.experience && (
              <>
                <h3 className=" font-semibold text-right text-primary text-md">
                  Experiencia
                </h3>
                <p className="text-secondary">{yearsOfExperience} años</p>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileDoctor;
