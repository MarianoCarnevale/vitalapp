import { useForm } from "react-hook-form";
import axios from "axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VITE_BASE_URL } from "../config/env.js";
import { recoverPasswordSchema } from "../schemas/recoverPasswordSchema.js";

const RecoverPassword = () => {
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
  // al hacer click en el button del formulario se ejecuta la siguiente función
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/users/recoverpass`,
        data
      );

      if (response.data.status === "ok") {
        toast.success("Password recovery mail is sent at your mail");
        reset();
        return;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  });
  return (
    <>
      <h1 className="text-3xl my-4">Recover Password</h1>
      <ToastContainer />
      <form onSubmit={onSubmit} className="flex flex-col space-y-4 ">
        <div className="w-3/4 m-auto shadow-lg rounded-xl p-4">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="email"
            className="border-2 border-cyan-700 p-2 rounded"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <button type="submit">Recover Password</button>
      </form>
    </>
  );
};

export default RecoverPassword;
