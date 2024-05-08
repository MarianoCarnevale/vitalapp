import { useForm } from "react-hook-form";
import axios from "axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "../schemas/loginSchema.js";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VITE_BASE_URL } from "../config/env.js";

const Login = () => {
  // Traemos el token del tokenContext
  const { setToken, user } = useContext(UserTokenContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(loginSchema),
  });

  let navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(`${VITE_BASE_URL}/users/login`, data);

      if (response.data.status === "ok") {
        localStorage.setItem("token", response.data.data.token);
        setToken(response.data.data.token);
        reset();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  });

  if (user) {
    navigate("/");
  }

  return user ? (
    <div>
      <h1>Tienes el user</h1>
    </div>
  ) : (
    <div className="w-5/6 flex flex-col m-auto shadow-lg rounded-xl p-4 max-w-lg bg-white ">
      <ToastContainer />
      <h1 className="text-3xl my-4 text-primary font-semibold">Login</h1>
      <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        {/* email */}
        <label htmlFor="email" className="font-bold text-secondary">
          Email
        </label>
        <input
          type="email"
          className="border-2 border-primary p-2 rounded"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
        {/* pass1 */}
        <label htmlFor="password" className="font-bold text-secondary">
          Password
        </label>
        <input
          type="password"
          className="border-2 border-primary p-2 rounded"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button
          type="submit"
          className="border p-2 bg-primary rounded-md text-white font-semibold"
        >
          Enviar
        </button>
      </form>
      <Link
        to="/recover"
        className="block mt-4 border p-2 bg-primary text-center text-sm rounded-md text-white font-semibold"
      >
        ¿Has olvidado tu contraseña?
      </Link>
    </div>
  );
};

export default Login;
