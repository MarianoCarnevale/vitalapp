import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VITE_BASE_URL } from "../config/env.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { joiResolver } from "@hookform/resolvers/joi";
import { newFrontConsultationsSchema } from "../schemas/newFrontConsultationSchema.js";

const Consultation = () => {
  //Almacenamos los cambios en el useState

  //lista de disciplinas
  const [disciplines, setDiscipline] = useState([]);

  //Valor a enviar de disciplinas
  const [especialidad, setespecialidadValue] = useState("");

  //lista de doctores
  const [doctors, setDoctors] = useState([]);

  //valor a enviar de doctores
  const [doctor, setDoctorValue] = useState("");

  //valor de severidad
  const [gravedad, setgravedadValue] = useState("");

  //
  const [gravedads] = useState([
    {
      id: 1,
      name: 'high'
    }, {
      id: 2,
      name: 'medium'
    }, {
      id: 3,
      name: 'low'
    }
  ]);

  //desabilitar o habilitar select doctors y submit
  const [disable, setDisabel] = useState([true]);

  //Si no hay doctores en una disciplina mandar mensaje
  const [available, setAvailable] = useState("");

  //registramos todos los inputs usando register
  const { register, 
    handleSubmit, 
    formState: { errors },
    reset } = useForm({
    mode: "onTouched",
    resolver: joiResolver(newFrontConsultationsSchema)
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
      setespecialidadValue(discipline_value);
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
      setespecialidadValue("");
      setDiscipline([]);
      setDisabel(true);
    }
  };

  //Pasamos OnSubmit como parametro a HandleSubmit

  const OnSubmit = handleSubmit(async (data) => {
    //obtener valor de doctor
    const doctor_sub = data.doctor;

    //Si no se selecciono doctor
    if (!doctor_sub) {
      //Seleccionar uno random de la lista de doctores
      const random = Math.floor(Math.random() * doctors.length);

      //Asignarlo a los valores a enviar
      data.doctor = doctors[random].doctor_id;
    }

    //Todos los inputs del formulario
    const dataToSend = {
      doctor_id: data.doctor,
      title: data.titulo,
      description: data.descripcion,
      discipline_id: data.especialidad,
      severity: data.gravedad,
    };
    try {
      console.log(dataToSend);

      const token = localStorage.getItem("token");

      const resp = await axios.post(
        `${VITE_BASE_URL}/consultations`,
        dataToSend,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      //Crear instancia del cuerpo form para mandar el archivo
      const form = new FormData();

      if (data.file.length > 0) { 

        console.log(data.file[0]);

        form.append('Files', data.file[0]);
        
        const consultation_id = resp.data.data
        try {
          
          await axios.post(`${VITE_BASE_URL}/consultations/${consultation_id}/file`,
            {"Files" : data.file[0]},
            {
              headers: {
                Authorization: `${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          )
        } catch (error) {
          toast.error('La imagen debe ser un png o un jpg');
          return
        }
      }
      reset();
      toast.success("Consulta enviada correctamente");

    } catch (error) {
      toast.error("Error al enviar la consulta");
      reset();
    }
  });

  return (
    <section className="w-5/6 max-w-md m-auto flex flex-col gap-7 bg-white rounded-md mt-10">
      <ToastContainer />
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
            onChange={(event) => { setDoctorValue(event.target.value)}}
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
            onChange={(event) => { setgravedadValue(event.target.value)}}
          >
            <option key="1" value="">
              None selected
            </option>
            {gravedads.map((gravedad) => (
              <option key={gravedad.name} value={gravedad.name}>
                {gravedad.name}
              </option>
            ))}
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
        <p className="text-red-500 text-sm sm:text-base pl-5">{available}</p>
      </form>
    </section>
  );
};

export default Consultation;
