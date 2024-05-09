import { useForm } from "react-hook-form";
import axios from "axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { updatePasswordSchema } from "../schemas/updatePasswordSchema.js";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { VITE_BASE_URL } from "../config/env.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UpdatePassword = () => {
  const { recoveryCode } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // usamos useForm para gestionar/vigilar en todo momento los inputs
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(updatePasswordSchema),
  });
  // al hacer click en el button del formulario se ejecuta la siguiente función
  const onSubmit = handleSubmit(async (data) => {
    // desestructuramos el password para hacer axios
    const { confirmarpassword, ...password } = data;

    try {
      setIsLoading(true);
      const response = await axios.put(
        `${VITE_BASE_URL}/users/update/${recoveryCode}`,
        password
      );
      if (response.data.status === "ok") {
        toast.success("Password is restored");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  });
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-5/6 m-auto shadow-lg rounded-xl p-4 max-w-lg bg-white">
          <ToastContainer />
          <h1 className="text-3xl my-4 text-primary font-semibold mb-10">
            Update Password
          </h1>
          <form onSubmit={onSubmit} className="flex flex-col gap-7">
            <li className="w-full list-none">
              <label
                htmlFor="password"
                className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
              >
                Password
              </label>
              <input
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
            <li className="w-full list-none">
              <label
                htmlFor="password2"
                className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
              >
                Confirmar Password
              </label>
              <input
                type="password"
                className="border-2 border-primary p-2 rounded w-full"
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
              )}
            </li>
            <button
              type="submit"
              className="border p-2 bg-primary rounded-md text-white font-semibold"
            >
              Update Password
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
