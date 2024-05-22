import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserTokenContext } from "../contexts/UserTokenContext";
import { useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";

import Fab from "@mui/material/Fab";

import EditIcon from "@mui/icons-material/Edit";
import { Rating } from "@mui/material";

const Profile = () => {
  const { user } = useContext(UserTokenContext);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (user?.avatar) {
      const url = `${VITE_BASE_URL}/users/${user.user_id}/${user.avatar}`;
      setAvatarUrl(url);
    }
  }, [user]);

  let yearsOfExperience;

  if (user) {
    const experienceStartDate = new Date(user.experience);
    const currentDate = new Date();
    yearsOfExperience =
      currentDate.getFullYear() - experienceStartDate.getFullYear();
  }

  console.log(user);

  return (
    user && (
      <section className="w-5/6 lg:max-w-lg py-10 mb-[40rem] m-auto flex flex-col gap-4 items-center lg:py-0">
        <p className="text-3xl text-center font-semibold text-primary dark:text-white">
          Tu perfil
        </p>
        <div className="my-6 rounded-full overflow-hidden h-40 w-40 z-10">
          <img
            className="h-40 w-40"
            src={avatarUrl || "/images/Avatar.svg"}
            alt="Avatar"
          />
        </div>
        <div className="flex flex-col max-w-lg items-center gap-3 absolute mt-48 py-16 bg-white dark:bg-gradient-to-t dark:from-slate-900 dark:to-sky-800  w-5/6 rounded-3xl shadow-2xl z-0">
          <NavLink
            className="m-auto rounded-full shadow-lg absolute ml-64 mt-[-3rem]"
            to={"/update"}
          >
            <Fab color="primary" size="small" aria-label="edit">
              <EditIcon />
            </Fab>
          </NavLink>
          <p className="text-xl font-bold text-secondary dark:text-gray-400">
            {user.role === "patient" ? "Paciente" : "Médico"}
          </p>
          <h2 className=" font-semibold text-right text-primary dark:text-white text-xl">
            {user.first_name}, {user.first_surname}
          </h2>
          {user.avg_rating && (
            <Rating
              name="rating"
              value={+user.avg_rating}
              precision={0.5}
              readOnly
            />
          )}
          {user.discipline_name && (
            <>
              <h3 className=" font-semibold text-right text-primary dark:text-white text-md">
                Especialidad
              </h3>
              <p className="text-secondary dark:text-gray-400 font-semibold">
                {user.discipline_name}
              </p>
            </>
          )}
          <h3 className=" font-semibold text-right text-primary dark:text-white text-md">
            Email
          </h3>
          <p className="text-secondary dark:text-gray-400 font-semibold">
            {user.email}
          </p>
          {user.phone && (
            <>
              <h3 className=" font-semibold text-right text-primary dark:text-white text-md">
                Teléfono
              </h3>
              <p className="text-secondary dark:text-gray-400 font-semibold">
                {user.phone}
              </p>
            </>
          )}
          {user.address && (
            <>
              <h3 className=" font-semibold text-right text-primary dark:text-white text-md">
                Dirección
              </h3>
              <p className="text-secondary dark:text-gray-400 font-semibold">
                {user.address}
              </p>
            </>
          )}
          {user.bio && (
            <>
              <h3 className=" font-semibold text-right text-primary dark:text-white text-md">
                Biografía
              </h3>
              <p className="text-secondary dark:text-gray-400 font-semibold">
                {user.bio}
              </p>
            </>
          )}
          {user.birth_date && (
            <>
              <h3 className=" font-semibold text-right text-primary dark:text-white text-md">
                Fecha de nacimiento
              </h3>
              <p className="text-secondary dark:text-gray-400 font-semibold">
                {new Date(user.birth_date).toISOString().split("T")[0]}
              </p>
            </>
          )}

          <>
            {user.doctor_registration_number && (
              <>
                <h3 className=" font-semibold text-right text-primary dark:text-white text-md">
                  Número de colegiado
                </h3>
                <p className="text-secondary dark:text-gray-400 font-semibold">
                  {user.doctor_registration_number}
                </p>
              </>
            )}

            {user.experience && (
              <>
                <h3 className=" font-semibold text-right text-primary dark:text-white text-md">
                  Experiencia
                </h3>
                <p className="text-secondary dark:text-gray-400 font-semibold">
                  {yearsOfExperience} años
                </p>
              </>
            )}
          </>
        </div>
      </section>
    )
  );
};

export default Profile;
