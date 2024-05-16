import { useForm } from "react-hook-form";
import axios from "axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VITE_BASE_URL } from "../config/env.js";
import { recoverPasswordSchema } from "../schemas/recoverPasswordSchema.js";
import { useNavigate } from "react-router-dom";

const ReactivateAccount = () => {
  // usamos useForm para gestionar/vigilar en todo momento el input
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(recoverPasswordSchema),
  });

  let navigate = useNavigate();
  // al hacer click en el button del formulario se ejecuta la siguiente función
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.put(
        `${VITE_BASE_URL}/users/reactivate`,
        data
      );

      if (response.data.status === "ok") {
        toast.success("Tu cuenta ha sido activada con éxito");
        reset();
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  });
  return (
    <>
      <div className="w-5/6 m-auto shadow-lg rounded-xl p-4 max-w-lg bg-white">
        <ToastContainer />
        <h1 className="text-3xl my-4 text-primary font-semibold mb-10">
          Reactiva tu cuenta
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-7">
          <li className="w-full list-none">
            <label
              htmlFor="email"
              className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
            >
              Email
            </label>
            <input
              type="email"
              className="border-2 border-primary p-2 rounded w-full"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 font-bold">{errors.email.message}</p>
            )}
          </li>

          <button
            type="submit"
            className="border p-2 bg-primary rounded-md text-white font-semibold"
          >
            Reactiva tu cuenta
          </button>
        </form>
      </div>
    </>
  );
};

export default ReactivateAccount;
