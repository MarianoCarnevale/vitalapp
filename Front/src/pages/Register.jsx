import { useForm } from "react-hook-form";
import axios from "axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerSchema } from "../schemas/registerSchema";
// import { registerDoctorSchema } from "../schemas/registerDoctorSchema";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

const Register = () => {
  const [role, setRole] = useState("Selecciona un rol");
  const [discipline, setDiscipline] = useState([]);

  // Combina tus esquemas

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(registerSchema),
    // resolver: joiResolver(
    //   role === "doctor" ? registerDoctorSchema : registerSchema
    // ),
  });

  useEffect(() => {
    const fetchDiscipline = async () => {
      try {
        const response = await axios.get("http://localhost:3000/disciplines");
        const disciplinesArray = Object.values(response.data.data.disciplines); // Cambia esto
        setDiscipline(disciplinesArray);
        console.log(disciplinesArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiscipline();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    delete data.confirmarpassword;
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        data
      );

      if (response.data.status === "ok") {
        toast.success("Usuario registrado correctamente");
        reset();
        return;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  });

  return (
    <div className="w-3/4 m-auto shadow-lg rounded-xl p-4">
      <ToastContainer />
      <h1 className="text-3xl my-4">Register</h1>
      <form onSubmit={onSubmit} className="flex flex-col space-y-4 ">
        {/* username */}
        <label htmlFor="username" className="font-bold ">
          User Name
        </label>
        <input
          type="text"
          className="border-2 border-cyan-700 p-2 rounded"
          {...register("username")}
        />
        {errors.username && <p>{errors.username.message}</p>}
        {/* email */}
        <label htmlFor="email" className="font-bold">
          Email
        </label>
        <input
          type="email"
          className="border-2 border-cyan-700 p-2 rounded"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
        {/* pass1 */}
        <label htmlFor="password" className="font-bold">
          Password
        </label>
        <input
          type="password"
          className="border-2 border-cyan-700 p-2 rounded"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        {/* pass2 */}
        <label htmlFor="password2" className="font-bold">
          Confirmar Password
        </label>
        <input
          type="password"
          className="border-2 border-cyan-700 p-2 rounded"
          {...register("confirmarpassword", {
            validate: (value) =>
              value === watch("password") || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmarpassword && <p>{errors.confirmarpassword.message}</p>}{" "}
        {/* role */}
        <label htmlFor="role" className="font-bold">
          Role
        </label>
        <select
          className="border-2 border-cyan-700 p-2 rounded"
          {...register("role", { required: true })}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Selecciona un rol</option>
          <option value="patient">Paciente</option>
          <option value="doctor">Doctor</option>
        </select>
        {errors.role && <p>{errors.role.message}</p>}
        {role === "doctor" && (
          <>
            <label htmlFor="registration_number" className="font-bold">
              Número de Registro de colegiado
            </label>
            <input
              type="text"
              className="border-2 border-cyan-700 p-2 rounded"
              {...register("doctor_registration_number")}
            />
            {errors.doctor_registration_number && (
              <p>{errors.doctor_registration_number.message}</p>
            )}
            <label htmlFor="discipline_name" className="font-bold">
              Especialidad
            </label>
            <select
              className="border-2 border-cyan-700 p-2 rounded"
              {...register("discipline_name")}
            >
              {discipline.map((disc, index) => (
                <option key={index} value={disc.discipline_name}>
                  {disc.discipline_name}
                </option>
              ))}
            </select>
            {errors.discipline_name && <p>{errors.discipline_name.message}</p>}
            <label htmlFor="experience" className="font-bold">
              Experiencia desde
            </label>
            <input
              type="date"
              className="border-2 border-cyan-700 p-2 rounded"
              {...register("experience")}
            />
          </>
        )}
        {/* first_name */}
        <label htmlFor="first_name" className="font-bold">
          First Name
        </label>
        <input
          type="text"
          className="border-2 border-cyan-700 p-2 rounded"
          {...register("first_name")}
        />
        {errors.first_name && <p>{errors.first_name.message}</p>}
        {/* first_surname */}
        <label htmlFor="first_surname" className="font-bold">
          First Surname
        </label>
        <input
          type="text"
          className="border-2 border-cyan-700 p-2 rounded"
          {...register("first_surname")}
        />
        {errors.first_surname && <p>{errors.first_surname.message}</p>}
        <button className="border p-2">Enviar</button>
      </form>
    </div>
  );
};

export default Register;
