// Importamos las librerías y componentes necesarios
import { useForm } from "react-hook-form";
import axios from "axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { updatePatientSchema } from "../schemas/updatePatientSchema.js";
import { updateDoctorSchema } from "../schemas/updateDoctorSchema.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import { VITE_BASE_URL } from "../config/env.js";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";

// Definimos el componente Update
export const Update = () => {
  // Traemos token y user del contexto
  const { token, setToken, user, setUser, getUser } =
    useContext(UserTokenContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fakeData = "asd";

  // Definimos el estado inicial para la disciplina
  const [discipline, setDiscipline] = useState([]);

  // Inicializamos useForm y definimos la configuración
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(
      user.role === "doctor" ? updateDoctorSchema : updatePatientSchema
    ),
  });

  // Usamos useEffect para obtener las disciplinas cuando el componente se monta
  useEffect(() => {
    const fetchDiscipline = async () => {
      try {
        const response = await axios.get(`${VITE_BASE_URL}/disciplines`);
        const disciplinesArray = Object.values(response.data.data.disciplines);
        setDiscipline(disciplinesArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiscipline();
  }, []);

  // Definimos la función que se ejecutará cuando el formulario se envíe
  const onSubmit = handleSubmit(async (data) => {
    delete data.confirmarpassword;

    try {
      const response = await axios.put(`${VITE_BASE_URL}/users/update`, data, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.data.status === "ok") {
        // reset();
        // setUpdateUser(!updateUser);
        getUser(token);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        toast.success("Perfil actualizado");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  });

  // Definimos la función que se activará cuando se pulse el botón desactivar cuenta
  const handleDesactivate = async () => {
    try {
      const response = await axios.put(
        `${VITE_BASE_URL}/users/desactivate`,
        fakeData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.status === "ok") {
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    user && (
      <>
        <h1 className="w-5/6 max-w-lg m-auto text-3xl my-4 text-primary font-semibold mb-10 ">
          Actualiza tu perfil
        </h1>
        <section className="w-5/6 h-full m-auto mb-32 max-lg:mt-5  shadow-lg rounded-xl p-4 py-6 max-w-lg dark:text-white dark:bg-slate-700 bg-white">
          <ToastContainer autoClose={1500} />
          <form onSubmit={onSubmit} className="flex flex-col gap-7 ">
            {/* username */}
            <li className="w-full list-none">
              <label
                htmlFor="username"
                className="font-semibold text-primary absolute  dark:bg-slate-700 bg-white mt-[-20px] ml-3 px-2 py-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                className="border-2 border-primary p-2 w-full rounded dark:bg-slate-700"
                defaultValue={user.username}
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 font-bold">
                  {errors.username.message}
                </p>
              )}
            </li>
            {/* email */}
            <li className="w-full list-none">
              <label
                htmlFor="email"
                className="font-semibold text-primary dark:text-white absolute bg-white mt-[-20px] ml-3 px-2 py-1 dark:bg-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="border-2 border-primary p-2 rounded w-full dark:bg-slate-700"
                defaultValue={user.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 font-bold">{errors.email.message}</p>
              )}
            </li>
            {/* pass1 */}
            <li className="w-full list-none">
              <label
                htmlFor="password"
                className="font-semibold text-primary dark:text-white absolute bg-white mt-[-20px] ml-3 px-2 py-1 dark:bg-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="border-2 border-primary p-2 rounded w-full dark:bg-slate-700"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 font-bold">
                  {errors.password.message}
                </p>
              )}
            </li>
            {/* pass2 */}
            <li className="list-none w-full">
              <label
                htmlFor="password2"
                className="font-semibold text-primary dark:text-white absolute bg-white mt-[-20px] ml-3 px-2 py-1 dark:bg-slate-700"
              >
                Confirmar Password
              </label>
              <input
                id="password2"
                type="password"
                className="border-2 w-full border-primary p-2 rounded dark:bg-slate-700"
                {...register("confirmarpassword", {
                  validate: (value) =>
                    value === watch("password") ||
                    "Las contraseñas no coinciden",
                })}
              />
              {errors.confirmarpassword && (
                <p className="text-red-500 font-bold">
                  {errors.confirmarpassword.message}
                </p>
              )}{" "}
            </li>
            {user.role === "doctor" && (
              <>
                <li className="list-none w-full">
                  <label
                    htmlFor="doctor_registration_number"
                    className="font-semibold  text-primary dark:text-white absolute bg-white mt-[-20px] ml-3 px-2 py-1 dark:bg-slate-700"
                  >
                    Número de Registro de colegiado
                  </label>
                  <input
                    id="doctor_registration_number"
                    type="text"
                    className="w-full border-2 border-primary  p-2 rounded dark:bg-slate-700"
                    defaultValue={user.doctor_registration_number}
                    {...register("doctor_registration_number")}
                  />
                  {errors.doctor_registration_number && (
                    <p className="text-red-500 font-bold">
                      {errors.doctor_registration_number.message}
                    </p>
                  )}
                </li>
                {/* Discipline */}
                <li className="list-none w-full">
                  <label
                    htmlFor="discipline_name"
                    className="font-semibold text-primary dark:text-white absolute bg-white mt-[-20px] ml-3 px-2 py-1 dark:bg-slate-700"
                  >
                    Especialidad
                  </label>
                  <select
                    id="discipline_name"
                    className="border-2 w-full border-primary dark:text-white p-2 rounded dark:bg-slate-700"
                    defaultValue=""
                    {...register("discipline_name")}
                  >
                    <option value="">Selecciona una disciplina</option>
                    {discipline.map((disc, index) => (
                      <option key={index} value={disc.discipline_name}>
                        {disc.discipline_name}
                      </option>
                    ))}
                  </select>
                  {errors.discipline_name && (
                    <p className="text-red-500 font-bold">
                      {errors.discipline_name.message}
                    </p>
                  )}
                </li>
                {/* experience */}
                <li className="list-none w-full">
                  <label
                    htmlFor="experience"
                    className="font-semibold text-primary dark:text-white absolute bg-white mt-[-20px] ml-3 px-2 py-1 dark:bg-slate-700"
                  >
                    Experiencia desde
                  </label>
                  <input
                    id="experience"
                    type="text"
                    className="border-2 w-full border-primary p-2 rounded dark:bg-slate-700"
                    defaultValue={
                      new Date(user.experience).toISOString().split("T")[0]
                    }
                    {...register("experience")}
                  />
                  {errors.experience && (
                    <p className="text-red-500 font-bold">
                      {errors.experience.message}
                    </p>
                  )}
                </li>
              </>
            )}
            {/* first_name */}
            <li className="list-none w-full">
              <label
                htmlFor="first_name"
                className="font-semibold text-primary dark:text-white absolute bg-white mt-[-20px] ml-3 px-2 py-1 dark:bg-slate-700"
              >
                Primer Nombre
              </label>
              <input
                id="first_name"
                type="text"
                className="border-2 w-full border-primary p-2 rounded dark:bg-slate-700"
                defaultValue={user.first_name}
                {...register("first_name")}
              />
              {errors.first_name && (
                <p className="text-red-500 font-bold">
                  {errors.first_name.message}
                </p>
              )}
            </li>
            {/* first_surname */}
            <li className="list-none w-full">
              <label
                htmlFor="first_surname"
                className="font-semibold text-primary dark:text-white absolute bg-white mt-[-20px] ml-3 px-2 py-1 dark:bg-slate-700"
              >
                Primer Apellido
              </label>
              <input
                id="first_surname"
                type="text"
                className="border-2 w-full border-primary p-2 rounded dark:bg-slate-700"
                defaultValue={user.first_surname}
                {...register("first_surname")}
              />
              {errors.first_surname && (
                <p className="text-red-500 font-bold">
                  {errors.first_surname.message}
                </p>
              )}
            </li>
            {/* last_name */}
            <li className="list-none w-full">
              <label
                htmlFor="last_name"
                className="font-semibold text-primary dark:text-white absolute bg-white mt-[-20px] ml-3 px-2 py-1 dark:bg-slate-700"
              >
                Segundo Nombre
              </label>
              <input
                id="last_name"
                type="text"
                className="border-2 w-full border-primary p-2 rounded dark:bg-slate-700"
                defaultValue={user.last_name}
                {...register("last_name")}
              />
              {errors.last_name && (
                <p className="text-red-500 font-bold">
                  {errors.last_name.message}
                </p>
              )}
            </li>
            {/* last_surname */}
            <li className="list-none w-full">
              <label
                htmlFor="last_surname"
                className="font-semibold text-primary dark:text-white absolute bg-white mt-[-20px] ml-3 px-2 py-1 dark:bg-slate-700"
              >
                Segundo Apellido
              </label>
              <input
                id="last_surname"
                type="text"
                className="border-2 w-full border-primary p-2 rounded dark:bg-slate-700"
                defaultValue={user.last_surname}
                {...register("last_surname")}
              />
              {errors.last_surname && (
                <p className="text-red-500 font-bold">
                  {errors.last_surname.message}
                </p>
              )}
            </li>
            {/* bio */}
            <li className="list-none w-full">
              <label
                htmlFor="bio"
                className="font-semibold text-primary dark:text-white absolute bg-white mt-[-20px] ml-3 px-2 py-1 dark:bg-slate-700"
              >
                Sobre mí
              </label>
              <input
                id="bio"
                type="text"
                className="border-2 w-full border-primary p-2 rounded dark:bg-slate-700"
                defaultValue={user.bio}
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-red-500 font-bold">{errors.bio.message}</p>
              )}
            </li>
            {/* address */}
            <li className="list-none w-full">
              <label
                htmlFor="address"
                className="font-semibold text-primary dark:text-white absolute bg-white mt-[-20px] ml-3 px-2 py-1 dark:bg-slate-700"
              >
                Dirección
              </label>
              <input
                id="address"
                type="text"
                className="border-2 w-full border-primary p-2 rounded dark:bg-slate-700"
                defaultValue={user.address}
                {...register("address")}
              />
              {errors.address && (
                <p className="text-red-500 font-bold">
                  {errors.address.message}
                </p>
              )}
            </li>
            {/* phone_number */}
            <li className="list-none w-full">
              <label
                htmlFor="phone_number"
                className="font-semibold text-primary dark:text-white absolute bg-white mt-[-20px] ml-3 px-2 py-1 dark:bg-slate-700"
              >
                Número de teléfono
              </label>
              <input
                id="phone_number"
                type="text"
                className="border-2 w-full border-primary p-2 rounded dark:bg-slate-700"
                defaultValue={user.phone_number}
                {...register("phone_number")}
              />
              {errors.phone_number && (
                <p className="text-red-500 font-bold">
                  {errors.phone_number.message}
                </p>
              )}
            </li>
            {/* birth_date */}
            <li className="list-none w-full">
              <label
                htmlFor="birth_date"
                className="font-semibold text-primary dark:text-white absolute bg-white mt-[-20px] ml-3 px-2 py-1 dark:bg-slate-700"
              >
                Fecha de nacimiento
              </label>
              <input
                id="birth_date"
                type="text"
                className="border-2 w-full border-primary p-2 rounded dark:bg-slate-700"
                defaultValue={
                  new Date(user.birth_date).toISOString().split("T")[0]
                }
                {...register("birth_date")}
              />
              {errors.birth_date && (
                <p className="text-red-500 font-bold">
                  {errors.birth_date.message}
                </p>
              )}
            </li>

            <button
              className="p-2 bg-primary rounded-md text-white font-semibold dark:shadow-gray-800 dark:shadow-md
              dark:bg-slate-800"
            >
              Enviar
            </button>
          </form>
          <button
            onClick={handleOpenModal}
            className=" w-full mt-5 p-2 bg-red-700 dark:bg-red-900 dark:shadow-gray-800 dark:shadow-md rounded-md text-white font-semibold"
          >
            Desactivar Usuario
          </button>
          {isModalOpen && (
            <>
              <div className="max-lg:px-4 lg:ml-60 bg-black bg-opacity-75 h-dvh fixed inset-0 flex">
                <div className="z-20 m-auto  bg-white opacity-100 rounded-lg p-6 w-full max-w-lg">
                  <h3 className="py-3 text-lg leading-6 font-medium text-primary">
                    ¿Estás seguro de que quieres desactivar al usuario?
                  </h3>
                  <div className="flex justify-end mt-6">
                    <button
                      className="px-4 py-2 bg-secondary hover:bg-red-900 text-white rounded-md mr-2"
                      onClick={handleDesactivate}
                    >
                      Sí
                    </button>
                    <button
                      className="px-4 py-2 bg-primary hover:bg-secondary hover:text-white text-white rounded-md"
                      onClick={() => setIsModalOpen(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </>
    )
  );
};
