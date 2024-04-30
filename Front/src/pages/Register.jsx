import { useForm } from "react-hook-form";
import axios from "axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerSchema } from "../schemas/registerSchema";
//import { useState } from "react";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data); // Imprime los datos del formulario
    delete data.confirmarpassword;
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="w-3/4 m-auto shadow-lg rounded-xl p-4">
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
        >
          <option value="">Selecciona un rol</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Paciente</option>
        </select>
        {errors.role && <p>{errors.role.message}</p>}
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
