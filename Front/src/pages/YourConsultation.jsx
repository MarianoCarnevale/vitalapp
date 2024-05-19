import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VITE_BASE_URL } from "../config/env";
import axios from "axios";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import Rating from "@mui/material/Rating";
import { ConsultationsResponses } from "../components/ConsultationsResponses.jsx";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const YourConsultation = () => {
  const { token } = useContext(UserTokenContext);
  const [consultation, setConsultation] = useState({});

  // const token = localStorage.getItem("token");

  const { consultation_id } = useParams();

  useEffect(() => {
    const getConsultation = async () => {
      const resp = await axios.get(
        `${VITE_BASE_URL}/consultations/${consultation_id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const [consultation] = Object.values(resp.data.data.consultations);
      setConsultation(consultation);
      console.log(consultation);
    };
    getConsultation();
  }, []);

  // Realiza la solicitud para borrar el archivo
  const deleteFile = async () => {
    try {
      await axios.delete(
        `${VITE_BASE_URL}/consultation/${consultation.consultation_id}/file`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success("Archivo borrado con exito");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "No se pudo borrar el archivo";
      toast.error(errorMessage);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "high":
        return "bg-red-500";
    }
  };

  return (
    <section className="max-lg:w-full max-lg:max-w-md max-lg:mb-96 max-lg:mt-10 w-5/6 max-w:lg items-center lg:w-full m-auto flex flex-col ">
      <ToastContainer autoClose={1500} />
      <p className=" text-primary text-3xl font-semibold mb-5">Tu consulta</p>

      <div>
        <p
          className={`text-primary py-2 px-6 rounded-full ${
            consultation.is_pending
              ? "bg-primary font-bold text-white"
              : "bg-secondary text-white border-0 font-bold"
          }`}
        >
          {consultation.is_pending ? "Pendiente" : "Finalizada"}
        </p>
      </div>

      <div className="w-5/6 max-w-lg py-10 items-center flex flex-col  gap-4 bg-white  rounded-3xl shadow-lg">
        <p className="text-xl text-primary font-bold">{consultation.title}</p>
        <img
          className="h-40 w-40 rounded-full"
          src="/images/Avatar.svg"
          alt="avatar"
        />
        <p className="text-primary font-bold text-center text-l">
          Consulta para el medico
        </p>
        <Link
          className="w-5/6 text-2xl max-lg:max-w-md text-l text-center font-bold text-primary hover:underline"
          to={`/doctor/${consultation.doctor_id}`}
        >
          {consultation.doctor_Name} {consultation.doctor_last_name}
        </Link>
        <p className="w-5/6  max-lg:max-w-md text-sm text-center font-bold text-secondary">
          Medico de {consultation.discipline_name}
        </p>

        <Rating
          name="rating"
          value={`${consultation.avg_rating}`}
          precision={0.5}
          readOnly
        />

        <p className="text-primary font-bold ">Descripcion</p>

        <p className="w-5/6 text-center max-lg:max-w-md text-m text-secondary">
          {consultation.description}
        </p>

        <p className=" text-primary font-bold ">Archivo</p>
        {consultation.file === null ? (
          "no se ha adjuntado archivo"
        ) : (
          <div className="flex items-center  gap-10 text-sm text-secondary font-semibold border-primary border px-1 py-1 rounded-3xl">
            <a
              className=" px-4 py-2 rounded-3xl hover:shadow-lg max-w-60"
              href={`${VITE_BASE_URL}/consultation/${consultation.consultation_id}/files/${consultation.user_id}/${consultation.file}`}
            >
              `${consultation.file}`
            </a>
            <button
              className="hover:shadow-lg hover:bg-primary hover:bg-opacity-10 bg-white rounded-full w-10 h-10"
              onClick={() => deleteFile(consultation.consultation_id)}
            >
              <DeleteOutlineIcon color="primary" />
            </button>
          </div>
        )}

        <p className=" text-primary font-bold ">Gravedad</p>
        <p
          className={`p-1 w-20 font-bold rounded-xl text-center text-white ${getStatusClass(
            consultation.severity
          )}`}
        >
          {consultation.severity}
        </p>
        <p className=" text-primary font-bold ">Fecha</p>
        <p className="w-5/6  max-lg:max-w-md text-sm text-center text-secondary">
          {consultation.created_at}
        </p>
      </div>
      <form>
        <input type="text" placeholder="Escribe tu respuesta..." />
        <button>Responder</button>
      </form>
      {/*  aqui iria el componente de respuestas */}
      <ConsultationsResponses consultation_id={consultation_id} doctor={consultation.doctor_Name} />
    </section>
  );
};

export default YourConsultation;
