import { useContext, useEffect, useState, useRef } from "react";
import { useConsultation } from "../../hooks/useConsultation.jsx";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { newFrontConsultationsSchema } from "../../schemas/newFrontConsultationSchema.js";
import { UserTokenContext } from "../../contexts/UserTokenContext.jsx";
import PropTypes from "prop-types";
import useOutsideClick from "../../hooks/useOutsideClick";
import LoupeRoundedIcon from "@mui/icons-material/LoupeRounded";

export const ConsultationForm = ({ setIsCreated, isCreated }) => {
  const { user } = useContext(UserTokenContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Sacamos el estado para volver a tirar el useEffect en el componente padre y actualizar la lista
  const ref = useRef();
  const handleOutsideClick = () => {
    setIsModalOpen(false);
  };

  useOutsideClick(ref, handleOutsideClick);

  //usamos la funcion para obtener los datos de forma asyn

  useEffect(() => {
    getDiscipline();
  }, []);

  //Control del form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(newFrontConsultationsSchema),
  });

  //usamos todos los datos necesarios del hook
  const {
    disciplines,
    getDiscipline,
    especialidad,
    doctor,
    setDoctorValue,
    doctors,
    gravedad,
    setgravedadValue,
    OnSubmit,
    handelSeletDiscipline,
    disable,
  } = useConsultation(handleSubmit, reset);

  return (
    user.role === "patient" && (
      <sections>
        <div className="w-fit max-lg:mb-5 flex justify-center items-center list-none text-center bg-gradient-to-b from-primary to-slate-600 dark:bg-gradient-to-t dark:from-white dark:to-white shadow-xl font-bold rounded-3xl">
          <LoupeRoundedIcon color="white" className="ml-2 dark:fill-primary" />
          <button
            className=" text-white dark:text-primary font-semibold p-3 pr-3"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Crear tu consulta
          </button>
        </div>
        {isModalOpen && (
          <div className="lg:ml-60 fixed inset-0 transition-opacity z-20 h-full">
            <div className="absolute inset-0 bg-black opacity-75 "></div>
            <div ref={ref} className="w-5/6 max-w-lg m-auto">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await OnSubmit();
                  setIsCreated(!isCreated);
                  setIsModalOpen(false);
                }}
                className="flex flex-col gap-7
      overflow-hidden transform transition-all bg-white dark:bg-slate-700 p-8 mt-32  rounded-lg"
              >
                <h1 className="text-3xl font-bold dark:text-white text-primary mb-10 max-lg:pt-10 ">
                  Crea tu consulta
                </h1>
                <li className="list-none w-full">
                  <label
                    htmlFor="discipline"
                    className="font-semibold text-primary dark:text-white absolute bg-white dark:bg-slate-700 mt-[-20px] ml-3 px-2 py-1"
                  >
                    Especialidad
                  </label>
                  <select
                    id="Especialidad"
                    className="border-2 border-primary dark:text-white p-2 w-full rounded dark:bg-slate-700 dark:border-white"
                    value={especialidad}
                    {...register("especialidad")}
                    onChange={handelSeletDiscipline}
                  >
                    <option key="0" value=""></option>
                    {disciplines.map((discipline) => (
                      <option
                        className="dark:text-white"
                        key={discipline.discipline_id}
                        value={discipline.discipline_id}
                      >
                        {discipline.discipline_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm sm:text-base pl-5">
                    {errors.discipline_value?.message}
                  </p>
                </li>
                <li className="list-none w-full">
                  <label
                    htmlFor="doctor"
                    className="z-10 font-semibold text-primary dark:text-white absolute bg-white dark:bg-slate-700 mt-[-20px] ml-3 px-2 py-1"
                  >
                    Doctor
                  </label>
                  <select
                    id="doctor"
                    className="border-2 border-primary p-2 w-full dark:text-white rounded dark:bg-slate-700 dark:border-white"
                    value={doctor}
                    {...register("doctor")}
                    disabled={disable}
                    onChange={(event) => {
                      setDoctorValue(event.target.value);
                    }}
                  >
                    <option key="1" value="">
                      None selected
                    </option>
                    {doctors.map((doctor) => (
                      <option
                        className="dark:text-white"
                        key={doctor.doctor_id}
                        value={doctor.doctor_id}
                      >
                        {doctor.first_name}
                      </option>
                    ))}
                  </select>
                </li>
                <li className="list-none w-full">
                  <label
                    htmlFor="titulo"
                    className="font-semibold text-primary absolute dark:text-white bg-white dark:bg-slate-700 mt-[-20px] ml-3 px-2 py-1"
                  >
                    Título
                  </label>
                  <input
                    id="titulo"
                    className="border-2 dark:text-white font-semibold border-primary p-2 w-full rounded dark:bg-slate-700 dark:border-white"
                    type="text"
                    placeholder="Título"
                    {...register("titulo")}
                  />
                  <p className="text-red-500 text-sm sm:text-base pl-5">
                    {errors.titulo?.message}
                  </p>
                </li>
                <li className="list-none w-full">
                  <label
                    htmlFor="descripcion"
                    className="font-semibold text-primary absolute bg-white dark:bg-slate-700 mt-[-20px] ml-3 px-2 py-1 dark:text-white"
                  >
                    Descripción
                  </label>
                  <input
                    id="descripcion"
                    className="border-2 dark:text-white font-semibold border-primary p-2 w-full rounded dark:bg-slate-700 dark:border-white"
                    type="text"
                    placeholder="Descripción"
                    {...register("descripcion")}
                  />
                  <p className="text-red-500 text-sm sm:text-base pl-5">
                    {errors.descripcion?.message}
                  </p>
                </li>
                <li className="list-none w-full">
                  <label
                    htmlFor="doctor"
                    className="z-10 font-semibold text-primary absolute bg-white dark:bg-slate-700 mt-[-20px] ml-3 px-2 py-1 dark:text-white"
                  >
                    Gravedad
                  </label>
                  <select
                    id="gravedad"
                    className="border-2 border-primary p-2 w-full rounded dark:text-white dark:bg-slate-700 dark:border-white"
                    value={gravedad}
                    {...register("gravedad")}
                    disabled={disable}
                    onChange={(event) => {
                      setgravedadValue(event.target.value);
                    }}
                  >
                    <option key="0" value="">
                      None selected
                    </option>
                    <option key="1" value="ALTA">
                      ALTA
                    </option>
                    <option key="2" value="MEDIA">
                      MEDIA
                    </option>
                    <option key="3" value="BAJA">
                      BAJA
                    </option>
                  </select>
                  <p className="text-red-500 text-sm sm:text-base pl-5">
                    {errors.gravedad?.message}
                  </p>
                </li>
                <li className="list-none">
                  <label
                    htmlFor="file"
                    className="bg-gradient-to-b from-primary to-cyan-700 hover:bg-cyan-700 cursor-pointer rounded-lg flex active:bg-white  dark:bg-slate-400"
                  >
                    <div className="gap-2 w-full py-2 text-white rounded-md active:text-black  dark:bg-slate-900 dark:shadow-gray-800 dark:shadow-md hover:dark:shadow-gray-800 dark:hover:shadow-sm font-semibold disabled:bg-secondary">
                      <p className=" text-center  text-lg dark:border-white">
                        Upload File
                      </p>
                      <p className="text-xs text-center  ">png or jpg</p>
                    </div>
                    <input
                      className="hidden"
                      type="file"
                      id="file"
                      {...register("file")}
                    />
                  </label>
                </li>
                <button
                  className="bg-primary p-2 w-full rounded-md text-white active:bg-white dark:bg-slate-900 active:text-black dark:shadow-gray-800 dark:shadow-md hover:dark:shadow-gray-800 dark:hover:shadow-sm font-semibold  disabled:bg-secondary"
                  disabled={disable}
                  // onClick={() => {
                  //   setIsCreated(!isCreated);
                  // }}
                >
                  Enviar
                </button>
                <button
                  className="bg-gradient-to-b from-primary to-cyan-700 p-2 w-full rounded-md text-white active:bg-white dark:bg-slate-900 active:text-black dark:shadow-gray-800 dark:shadow-md hover:dark:shadow-gray-800 dark:hover:shadow-sm font-semibold disabled:bg-secondary"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        )}
      </sections>
    )
  );
};

ConsultationForm.propTypes = {
  setIsCreated: PropTypes.func.isRequired,
  isCreated: PropTypes.bool.isRequired,
};
