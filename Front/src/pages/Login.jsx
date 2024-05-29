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
    <section className="bg-hero-pattern bg-cover h-screen flex">
      <div className="w-5/6 flex flex-col m-auto shadow-lg rounded-xl p-4 max-w-lg bg-white">
        <ToastContainer autoClose={1500} />
        <h1 className="text-3xl my-4 text-primary font-semibold mb-10">
          Login
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-7">
          {/* email */}
          <li className="w-full list-none">
            <label
              htmlFor="email"
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full border-2 border-primary p-2 rounded"
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
              type="password"
              className="w-full border-2 border-primary p-2 rounded"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 font-bold">
                {errors.password.message}
              </p>
            )}
          </li>
          <Link
            to="/recover"
            className="text-primary text-md font-semibold hover:text-secondary"
          >
            ¿Has olvidado tu contraseña?
          </Link>
          <Link
            to="/reactivate"
            className="text-primary text-md font-semibold hover:text-secondary"
          >
            Reactiva tu cuenta
          </Link>
          <button
            type="submit"
            className="border hover:bg-slate-600 p-2 bg-primary rounded-md text-white font-semibold duration-500"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
