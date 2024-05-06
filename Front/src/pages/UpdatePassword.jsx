import { useForm } from "react-hook-form";
import axios from "axios";
import { joiResolver } from "@hookform/resolvers/joi";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { VITE_BASE_URL } from "../config/env.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updatePasswordSchema } from "../schemas/updatePasswordSchema.js";

const UpdatePassword = () => {
  const { recoveryCode } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(updatePasswordSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${VITE_BASE_URL}/users/update/${recoveryCode}`,
        data
      );

      if (response.data.status === "ok") {
        toast.success("Password is restored");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  });
  return (
    <>
      <h1 className="text-3xl my-4">Update Password</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col space-y-4 ">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <input
            type="password"
            className="border-2 border-cyan-700 p-2 rounded"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
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
          {errors.confirmarpassword && (
            <p>{errors.confirmarpassword.message}</p>
          )}
          <button type="submit">Update Password</button>
        </form>
      )}
    </>
  );
};

export default UpdatePassword;
