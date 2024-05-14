import { useEffect } from "react";
import { useConsultation } from "../../hooks/useConsultation.jsx";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { newFrontConsultationsSchema } from "../../schemas/newFrontConsultationSchema.js";

export const ConsultationForm = () => {
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
    <div className="absolute mr-80 bg-white min-[w-3/5] w-2/4 z-20">
      <h1 className="text-3xl font-bold text-primary ">Crea tu consulta</h1>

      <form onSubmit={OnSubmit} className="flex flex-col gap-7">
        <li className="list-none w-full">
          <label
            htmlFor="discipline"
            className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
          >
            Especialidad
          </label>
          <select
            id="Especialidad"
            className="border-2 border-primary p-2 w-full rounded"
            value={especialidad}
            {...register("especialidad")}
            onChange={handelSeletDiscipline}
          >
            <option key="0" value=""></option>
            {disciplines.map((discipline) => (
              <option
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
            className="z-10 font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
          >
            Doctor
          </label>
          <select
            id="doctor"
            className="border-2 border-primary p-2 w-full rounded"
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
              <option key={doctor.doctor_id} value={doctor.doctor_id}>
                {doctor.first_name}
              </option>
            ))}
          </select>
        </li>
        <li className="list-none w-full">
          <label
            htmlFor="titulo"
            className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
          >
            Título
          </label>
          <input
            id="titulo"
            className="border-2 border-primary p-2 w-full rounded"
            type="text"
            placeholder=""
            {...register("titulo")}
          />
          <p className="text-red-500 text-sm sm:text-base pl-5">
            {errors.titulo?.message}
          </p>
        </li>
        <li className="list-none w-full">
          <label
            htmlFor="descripcion"
            className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
          >
            Descripción
          </label>
          <input
            id="descripcion"
            className="border-2 border-primary p-2 w-full rounded"
            type="text"
            placeholder=""
            {...register("descripcion")}
          />
          <p className="text-red-500 text-sm sm:text-base pl-5">
            {errors.descripcion?.message}
          </p>
        </li>
        <li className="list-none w-full">
          <label
            htmlFor="doctor"
            className="z-10 font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
          >
            Gravedad
          </label>
          <select
            id="gravedad"
            className="border-2 border-primary p-2 w-full rounded"
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
            <option key="1" value="high">
              high
            </option>
            <option key="2" value="medium">
              medium
            </option>
            <option key="3" value="low">
              low
            </option>
          </select>

          <p className="text-red-500 text-sm sm:text-base pl-5">
            {errors.gravedad?.message}
          </p>
        </li>
        <li className="list-none w-full">
          <label
            htmlFor="file"
            className="input bg-primary rounded-lg flex active:bg-white"
          >
            <div className="flex flex-col items-center gap-2 w-full text-white active:text-black">
              <p className=" text-center w-full text-lg">Upload File</p>
              <p className="text-xs ">png or jpg</p>
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
          className="bg-primary p-2 w-full rounded-md text-white active:bg-white active:text-black border-2 border-primary disabled:bg-gray-500"
          disabled={disable}
        >
          Submit
        </button>
      </form>
    </div>

    
  );
};
