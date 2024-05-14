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
  const { token, user, updateUser, setUpdateUser } =
    useContext(UserTokenContext);
  // Definimos el estado inicial para el rol y la disciplina
  // const [role, setRole] = useState("Selecciona un rol");
  const [discipline, setDiscipline] = useState([]);

  // Inicializamos useForm y definimos la configuración
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
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
        //
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
    delete data.role;

    try {
      const response = await axios.put(`${VITE_BASE_URL}/users/update`, data, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.data.status === "ok") {
        toast.success("Usuario actualizado correctamente");
        reset();
        setUpdateUser(!updateUser);
        return;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  });

  return (
    user && (
      <section className="w-5/6 m-auto shadow-lg rounded-xl p-4 max-w-lg bg-white">
        <ToastContainer />
        <h1 className="text-3xl my-4 text-primary font-semibold mb-10">
          Actualiza tu perfil
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-7">
          {/* username */}
          <li className="w-full list-none">
            <label
              htmlFor="username"
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              User Name
            </label>
            <input
              id="username"
              type="text"
              className="border-2 border-primary p-2 w-full rounded"
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
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border-2 border-primary p-2 rounded w-full"
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
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="border-2 border-primary p-2 rounded w-full"
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
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              Confirmar Password
            </label>
            <input
              id="password2"
              type="password"
              className="border-2 w-full border-primary p-2 rounded"
              {...register("confirmarpassword", {
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmarpassword && (
              <p className="text-red-500 font-bold">
                {errors.confirmarpassword.message}
              </p>
            )}{" "}
          </li>
          {/* role
          <li className="list-none w-full">
            <label
              htmlFor="role"
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              Role
            </label>
            <select
              id="role"
              className="border-2 w-full border-primary p-2 rounded"
              {...register("role", { required: true })}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Selecciona un rol</option>
              <option value="patient">Paciente</option>
              <option value="doctor">Doctor</option>
            </select>
            {errors.role && (
              <p className="text-red-500 font-bold">{errors.role.message}</p>
            )}
          </li> */}
          {user.role === "doctor" && (
            <>
              <li className="list-none w-full">
                <label
                  htmlFor="doctor_registration_number"
                  className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
                >
                  Número de Registro de colegiado
                </label>
                <input
                  id="doctor_registration_number"
                  type="text"
                  className="w-full border-2 border-primary p-2 rounded"
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
                  className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
                >
                  Especialidad
                </label>
                <select
                  id="discipline_name"
                  className="border-2 w-full border-primary p-2 rounded"
                  {...register("discipline_name")}
                >
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
                  className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
                >
                  Experiencia desde
                </label>
                <input
                  id="experience"
                  type="text"
                  className="border-2 w-full border-primary p-2 rounded"
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
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              First Name
            </label>
            <input
              id="first_name"
              type="text"
              className="border-2 w-full border-primary p-2 rounded"
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
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              First Surname
            </label>
            <input
              id="first_surname"
              type="text"
              className="border-2 w-full border-primary p-2 rounded"
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
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              Last Name
            </label>
            <input
              id="last_name"
              type="text"
              className="border-2 w-full border-primary p-2 rounded"
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
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              Last Surname
            </label>
            <input
              id="last_surname"
              type="text"
              className="border-2 w-full border-primary p-2 rounded"
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
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              Bio
            </label>
            <input
              id="bio"
              type="text"
              className="border-2 w-full border-primary p-2 rounded"
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
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              className="border-2 w-full border-primary p-2 rounded"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-red-500 font-bold">{errors.address.message}</p>
            )}
          </li>
          {/* phone_number */}
          <li className="list-none w-full">
            <label
              htmlFor="phone_number"
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              Phone_number
            </label>
            <input
              id="phone_number"
              type="text"
              className="border-2 w-full border-primary p-2 rounded"
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
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              Birth_date
            </label>
            <input
              id="birth_date"
              type="text"
              className="border-2 w-full border-primary p-2 rounded"
              {...register("birth_date")}
            />
            {errors.birth_date && (
              <p className="text-red-500 font-bold">
                {errors.birth_date.message}
              </p>
            )}
          </li>
          <button className="border p-2 bg-primary rounded-md text-white font-semibold">
            Enviar
          </button>
        </form>
      </section>
    )
  );
};
