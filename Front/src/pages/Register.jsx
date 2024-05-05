// Importamos las librerías y componentes necesarios
import { useForm } from "react-hook-form";
import axios from "axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerSchema } from "../schemas/registerSchema";
import { registerDoctorSchema } from "../schemas/registerDoctorSchema";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { VITE_BASE_URL } from "../config/env.js";

// Definimos el componente Register
const Register = () => {
  // Definimos el estado inicial para el rol y la disciplina
  const [role, setRole] = useState("Selecciona un rol");
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
      role === "doctor" ? registerDoctorSchema : registerSchema
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

    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/users/register`,
        data
      );

      if (response.data.status === "ok") {
        toast.success("Usuario registrado correctamente");
        reset();
        return;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  });

  return (
    <div className="w-5/6 m-auto shadow-lg rounded-xl p-4 max-w-lg bg-white ">
      <ToastContainer />
      <h1 className="text-3xl my-4 text-primary font-semibold ">Register</h1>
      <form onSubmit={onSubmit} className="flex flex-col space-y-4 ">
        {/* username */}
        <label htmlFor="username" className="font-bold text-secondary">
          User Name
        </label>
        <input
          id="username"
          type="text"
          className="border-2 border-primary p-2 rounded"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500 font-bold">{errors.username.message}</p>
        )}
        {/* email */}
        <label htmlFor="email" className="font-bold text-secondary">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="border-2 border-primary p-2 rounded"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 font-bold">{errors.email.message}</p>
        )}
        {/* pass1 */}
        <label htmlFor="password" className="font-bold text-secondary">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="border-2 border-primary p-2 rounded"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 font-bold">{errors.password.message}</p>
        )}
        {/* pass2 */}
        <label htmlFor="password2" className="font-bold text-secondary">
          Confirmar Password
        </label>
        <input
          id="password2"
          type="password"
          className="border-2 border-primary p-2 rounded"
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
        {/* role */}
        <label htmlFor="role" className="font-bold text-secondary">
          Role
        </label>
        <select
          id="role"
          className="border-2 border-primary p-2 rounded"
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
        {role === "doctor" && (
          <>
            <label
              htmlFor="doctor_registration_number"
              className="font-bold text-secondary"
            >
              Número de Registro de colegiado
            </label>
            <input
              id="doctor_registration_number"
              type="text"
              className="border-2 border-primary p-2 rounded"
              {...register("doctor_registration_number")}
            />
            {errors.doctor_registration_number && (
              <p className="text-red-500 font-bold">
                {errors.doctor_registration_number.message}
              </p>
            )}
            {/* Discipline */}
            <label
              htmlFor="discipline_name"
              className="font-bold text-secondary"
            >
              Especialidad
            </label>
            <select
              id="discipline_name"
              className="border-2 border-primary p-2 rounded"
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
            <label htmlFor="experience" className="font-bold text-secondary">
              Experiencia desde
            </label>
            <input
              id="experience"
              type="text"
              className="border-2 border-primary p-2 rounded"
              {...register("experience")}
            />
            {errors.experience && (
              <p className="text-red-500 font-bold">
                {errors.experience.message}
              </p>
            )}
          </>
        )}
        {/* first_name */}
        <label htmlFor="first_name" className="font-bold text-secondary">
          First Name
        </label>
        <input
          id="first_name"
          type="text"
          className="border-2 border-primary p-2 rounded"
          {...register("first_name")}
        />
        {errors.first_name && (
          <p className="text-red-500 font-bold">{errors.first_name.message}</p>
        )}
        {/* first_surname */}
        <label htmlFor="first_surname" className="font-bold text-secondary">
          First Surname
        </label>
        <input
          id="first_surname"
          type="text"
          className="border-2 border-primary p-2 rounded"
          {...register("first_surname")}
        />
        {errors.first_surname && (
          <p className="text-red-500 font-bold">
            {errors.first_surname.message}
          </p>
        )}
        <button className="border p-2 bg-primary rounded-md text-white font-semibold">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Register;
