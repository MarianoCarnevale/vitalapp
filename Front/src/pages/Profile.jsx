import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserTokenContext } from "../contexts/UserTokenContext";
import { useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";
const Profile = () => {
  const { user } = useContext(UserTokenContext);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (user?.avatar) {
      const url = `${VITE_BASE_URL}/users/${user.user_id}/${user.avatar}`;
      setAvatarUrl(url);
    }
  }, [user]);
  const imageSrc = hover
    ? "/images/icon-edit-hover.svg"
    : "/images/icon-edit.svg";

  let yearsOfExperience;

  if (user) {
    const experienceStartDate = new Date(user.experience);
    const currentDate = new Date();
    yearsOfExperience =
      currentDate.getFullYear() - experienceStartDate.getFullYear();
    console.log(yearsOfExperience);
  }
  return (
    user && (
      <section className="w-5/6 py-10 mb-[40rem] m-auto flex flex-col gap-4 items-center lg:py-0">
        <h1 className="text-3xl font-bold text-primary  ">Tu perfil</h1>

        <div className="my-6 rounded-full overflow-hidden h-40 w-40 z-10">
          <img className="h-40 w-40" src={avatarUrl} alt="Avatar" />
        </div>
        <div className="flex flex-col max-w-md items-center gap-3 absolute mt-48 py-16 bg-white w-5/6 rounded-lg shadow-2xl z-0">
          <NavLink
            className="m-auto rounded-full shadow-lg absolute ml-64 mt-[-3rem]"
            to={"/update"}
          >
            <img
              src={imageSrc}
              alt="edit"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            />
          </NavLink>
          <p className="text-lg font-semibold text-secondary">
            {user.role === "patient" ? "Paciente" : "Médico"}
          </p>
          <h2 className=" font-semibold text-right text-primary text-xl">
            {user.first_name}, {user.first_surname}
          </h2>
          <h3 className=" font-semibold text-right text-primary text-md">
            Email
          </h3>
          <p className="text-secondary">{user.email}</p>
          {user.phone && (
            <>
              <h3 className=" font-semibold text-right text-primary text-md">
                Teléfono
              </h3>
              <p className="text-secondary">{user.phone}</p>
            </>
          )}
          {user.address && (
            <>
              <h3 className=" font-semibold text-right text-primary text-md">
                Dirección
              </h3>
              <p className="text-secondary">{user.address}</p>
            </>
          )}
          {user.bio && (
            <>
              <h3 className=" font-semibold text-right text-primary text-md">
                Biografía
              </h3>
              <p className="text-secondary">{user.bio}</p>
            </>
          )}
          {user.birth_date && (
            <>
              <h3 className=" font-semibold text-right text-primary text-md">
                Fecha de nacimiento
              </h3>
              <p className="text-secondary">
                {new Date(user.birth_date).toISOString().split("T")[0]}
              </p>
            </>
          )}

          {user.role === "doctor" && (
            <>
              {user.doctor_registration_number && (
                <>
                  <h3 className=" font-semibold text-right text-primary text-md">
                    Número de colegiado
                  </h3>
                  <p className="text-secondary">
                    {user.doctor_registration_number}
                  </p>
                </>
              )}
              <h3 className=" font-semibold text-right text-primary text-md">
                Especialidad
              </h3>
              <p className="text-secondary">{user.discipline_name}</p>
              <h3 className=" font-semibold text-right text-primary text-md">
                Experiencia
              </h3>
              <p className="text-secondary">{yearsOfExperience} años</p>
            </>
          )}
        </div>
      </section>
    )
  );
};

export default Profile;
