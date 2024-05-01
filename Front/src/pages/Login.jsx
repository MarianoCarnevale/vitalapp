import { useForm } from "react-hook-form";
import axios from "axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../schemas/loginSchema.js";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  // Traemos el token del tokenContext
  const { token, setToken } = useContext(UserTokenContext);
  // Creamos un estado que guarde los errores que nos mande el back si existen
  const [errorBack, setErrorBack] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(loginSchema),
  });

  let navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data); // Imprime los datos del formulario
    delete data.confirmarpassword;
    try {
      const response = await axios.post(
        "http://localhost:4000/users/login",
        data
      );
      localStorage.setItem("token", response.data.data.token);
      setToken(response.data.data.token);
      reset();
      navigate("/");
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  });

  return token ? (
    <div>
      <h1>Tienes el token</h1>
    </div>
  ) : (
    <div className="w-3/4 m-auto shadow-lg rounded-xl p-4">
      <h1 className="text-3xl my-4">Register</h1>
      <form onSubmit={onSubmit} className="flex flex-col space-y-4 ">
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
        <button type="submit" className="border border-black p-2">
          Enviar
        </button>
        {errorBack && <p>{errorBack}</p>}
      </form>
    </div>
  );
};

export default Login;
