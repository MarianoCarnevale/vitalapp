import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VITE_BASE_URL } from "../config/env.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Consultation = () => {
  //Almacenamos los cambios en el useState

  //lista de disciplinas
  const [disciplines, setDiscipline] = useState([]);

  //Valor a enviar de disciplinas
  const [disciplinesValue, setDisciplineValue] = useState("");

  //lista de doctores
  const [doctors, setDoctors] = useState([]);

  //valor a enviar de doctores
  const [doctor_Value, setDoctorValue] = useState("");

  //desabilitar o habilitar select doctors y submit
  const [disable, setDisabel] = useState([true]);

  //Si no hay doctores en una disciplina mandar mensaje
  const [available, setAvailable] = useState("");

  //registramos todos los inputs usando register
  const { register, handleSubmit } = useForm({
    mode: "onTouched",
  });

  //Despues de renderizar la pantalla
  useEffect(() => {
    //Obtener todas las disciplinas
    const getDisciplines = async () => {
      try {
        const resp = await axios.get(`${VITE_BASE_URL}/disciplines`);
        const disciplines_values = Object.values(resp.data.data.disciplines);

        //Asignamos todas las disciplinas al useState
        setDiscipline(disciplines_values);
      } catch (error) {
        console.log(error);
      }
    };
    getDisciplines();
  }, []);

  //manejo de select de disciplinas
  const handelSeletDiscipline = (event) => {
    //pedir la lista de doctores
    const fetchDoctors = async () => {
      setDisciplineValue(discipline_value);
      try {
        const response = await axios.get(
          `${VITE_BASE_URL}/doctors/${discipline_value}`
        );
        const doctors_array = Object.values(response.data.data);
        setDoctors(doctors_array[0]);
        setAvailable("");
      } catch (error) {
        //Si no hay doctor en la especilidad

        //deshabilitar y restaurar los valores de doctors a null
        setDoctors([]);
        setDoctorValue("");
        setDisabel(true);

        //mandar mensaje de disponibilidad
        setAvailable("None doctors available");
        console.error(error);
      }
    };

    //obtener el valor de el formulario
    const discipline_value = event.target.value;

    if (discipline_value) {
      //Si se selecciona disciplina habilitar submit
      setDisabel(false);

      //Obtener lista de doctores
      fetchDoctors();
    } else {
      //Sino deshabilitar el select de doctores
      setDisciplineValue("");
      setDiscipline([]);
      setDisabel(true);
    }
  };

  //Asignar valor a doctor
  const handelSeletDoctor = (event) => {
    const doctor_value = event.target.value;

    setDoctorValue(doctor_value);
  };

  //Pasamos OnSubmit como parametro a HandleSubmit

  const OnSubmit = async (data) => {
    //obtener valor de doctor
    const doctor_value_sub = data.doctor_Value;

    //Si no se selecciono doctor
    if (!doctor_value_sub) {
      //Seleccionar uno random de la lista de doctores
      const random = Math.floor(Math.random() * doctors.length);

      //Asignarlo a los valores a enviar
      data.doctor_Value = doctors[random].doctor_id;
    }

    //Todos los inputs del formulario
    console.log(data);

    const dataToSend = {
      doctor_id: data.doctor_Value,
      title: data.titel,
      description: data.description,
      discipline_id: data.disciplinesValue,
      severity: data.severity,
    };
    try {
      const token = localStorage.getItem("token");

      //Crear instancia del cuerpo form para mandar el archivo
      const formData = new FormData();

      formData.append("file", data.file[0]);

      const resp = await axios.post(
        `${VITE_BASE_URL}/consultations`,
        dataToSend,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Consulta enviada correctamente");
    } catch (error) {
      toast.error("Error al enviar la consulta");
    }
  };

  return (
    <section className="w-5/6 max-w-md m-auto flex flex-col gap-7 bg-white rounded-md mt-10">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-primary ">Crea tu consulta</h1>

      <form onSubmit={handleSubmit(OnSubmit)} className="flex flex-col gap-7">
        <li className="list-none w-full">
          <label
            htmlFor="discipline"
            className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
          >
            Especialidad
          </label>
          <select
            id="discipline"
            className="border-2 border-primary p-2 w-full rounded"
            value={disciplinesValue}
            {...register("disciplinesValue")}
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
          {/* <p className="text-red-500 text-sm sm:text-base pl-5">
            Error Message
          </p> */}
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
            value={doctor_Value}
            {...register("doctor_Value")}
            disabled={disable}
            onChange={handelSeletDoctor}
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

          {/* <p className="text-red-500 text-sm sm:text-base pl-5">
            Error Message
          </p> */}
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
            {...register("titel")}
          />
          {/* <p className="text-red-500 text-sm sm:text-base pl-5">
            Error Message
          </p> */}
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
            {...register("description")}
          />
          {/* <p className="text-red-500 text-sm sm:text-base pl-5">
            Error Message
          </p> */}
        </li>
        <li className="list-none w-full">
          <label
            htmlFor="gravedad"
            className="font-semibold text-primary absolute bg-white mt-[-20px] ml-3 px-2 py-1"
          >
            Gravedad
          </label>
          <input
            id="gravedad"
            className="border-2 border-primary p-2 w-full rounded"
            type="text"
            placeholder=""
            {...register("severity")}
          />
          {/* <p className="text-red-500 text-sm sm:text-base pl-5">
            Error Message
          </p> */}
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
        <p className="text-red-500 text-sm sm:text-base pl-5">{available}</p>
      </form>
    </section>
  );
};

export default Consultation;
