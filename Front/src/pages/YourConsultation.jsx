import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VITE_BASE_URL } from "../config/env";
import axios from "axios";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import Rating from "@mui/material/Rating";
import { dateFormat } from "../api/dateFormat.js";
import { ConsultationsResponses } from "../components/ConsultationsResponses.jsx";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";

const YourConsultation = () => {
  const [consultation, setConsultation] = useState({});
  const token = localStorage.getItem("token");
  const { consultation_id } = useParams();
  const { user } = useContext(UserTokenContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    getConsultation();
  }, [isFinished]);

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
  };

  const handelEndConsultation = async () => {
    try {
      const resp = await axios.post(
        `${VITE_BASE_URL}/consultation/${consultation.consultation_id}/end`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (resp.data.status === "Success") {
        toast.success("Consulta finalizada correctamente");
        setIsFinished(true);
      }
    } catch (error) {
      toast.error("Error al modificar la consulta");
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

  const date = dateFormat(consultation.created_at);

  return (
    <>
      <section className="z-10 w-5/6 mb-32 mt-10 h-auto items-start justify-center gap-5 m-auto flex flex-col lg:flex-row max-lg:w-full">
        <div className="w-5/6 max-w-lg max-lg:m-auto">
          <p className=" text-primary dark:text-white text-3xl font-semibold mb-5">
            Tu consulta
          </p>
          <div className="max-lg:m-auto dark:bg-gradient-to-t dark:from-slate-900 dark:to-sky-800 my-5 py-10 items-center flex flex-col  gap-4 bg-white  rounded-3xl shadow-lg">
            <div className="flex justify-center w-full gap-4">
              <p
                className={`border border-primary text-primary py-2 px-6 rounded-full ${
                  consultation.is_pending
                    ? "bg-primary font-bold text-white"
                    : consultation.is_active
                    ? "bg-green-500 text-white border-0 font-bold"
                    : "bg-secondary text-white border-0 font-bold"
                }`}
              >
                {consultation.is_pending
                  ? "Pendiente"
                  : consultation.is_active
                  ? "En trámite"
                  : "Finalizada"}
              </p>
            </div>
            <p className="dark:text-white text-2xl text-primary font-bold">
              {consultation.title}
            </p>
            {user.role === "patient" && (
              <img
                className="h-40 w-40 rounded-full"
                src={
                  !consultation.doctor_avatar ||
                  consultation.doctor_avatar === null
                    ? "/images/Avatar.svg"
                    : `${VITE_BASE_URL}/users/${consultation.doctor_user_id}/${consultation.doctor_avatar}`
                }
                alt={consultation.doctor_avatar}
              />
            )}
            {user.role === "doctor" && (
              <img
                className="h-40 w-40 rounded-full"
                src={
                  !consultation.avatar || consultation.avatar === null
                    ? "/images/Avatar.svg"
                    : `${VITE_BASE_URL}/users/${consultation.user_id}/${consultation.avatar}`
                }
                alt={consultation.doctor_avatar}
              />
            )}
            <p className="dark:text-slate-400 text-primary font-bold text-center text-l">
              {user.role === "patient"
                ? " Consulta para el medico"
                : "Consulta de"}
            </p>
            <Link
              className="dark:text-white w-5/6 text-2xl max-lg:max-w-md text-l text-center font-bold text-primary hover:underline"
              to={
                user.role === "patient"
                  ? `/doctor/${consultation.doctor_id}`
                  : `/users/${consultation.user_id}`
              }
            >
              {user.role === "patient"
                ? `${consultation.doctor_Name} ${consultation.doctor_surname}`
                : `${consultation.first_name} ${consultation.first_surname}`}
            </Link>
            {user.role === "patient" && (
              <p className="dark:text-slate-400 w-5/6  max-lg:max-w-md text-sm text-center font-bold text-secondary">
                Medico de {consultation.discipline_name}
              </p>
            )}
            {user.role === "patient" && (
              <Rating
                name="rating"
                value={+consultation.avg_rating}
                precision={0.5}
                readOnly
              />
            )}
            <p className="dark:text-white text-primary font-bold">
              Descripción
            </p>
            <p className="dark:text-slate-300 w-5/6 text-center max-lg:max-w-md text-m text-secondary">
              {consultation.description}
            </p>
            <p className="dark:text-white text-primary font-bold">Archivo</p>
            {consultation.file === null ? (
              <p className="dark:text-slate-400">No se ha adjuntado archivo</p>
            ) : (
              <div className="flex items-center  gap-10 text-sm text-secondary font-semibold border-primary border px-3 py-1 rounded-3xl">
                <a
                  className=" px-4 py-2 rounded-3xl hover:shadow-lg max-w-60 dark:text-slate-300"
                  href={`${VITE_BASE_URL}/consultation/${consultation.consultation_id}/files/${consultation.user_id}/${consultation.file}`}
                >
                  {isDeleted ? "Archivo borrado con éxito" : consultation.file}
                </a>
                <button
                  className="hover:shadow-lg hover:bg-primary hover:bg-opacity-10 bg-white rounded-full w-10 h-10"
                  onClick={() =>
                    deleteFile(consultation.consultation_id) &&
                    setIsDeleted(true)
                  }
                >
                  <DeleteOutlineIcon color="primary" />
                </button>
              </div>
            )}
            {consultation.is_active ? (
              <>
                <p className="dark:text-white text-primary font-bold">
                  Gravedad
                </p>
                <p
                  className={`p-1 w-20 font-bold rounded-xl text-center text-white ${getStatusClass(
                    consultation.severity
                  )}`}
                >
                  {consultation.severity}
                </p>
              </>
            ) : (
              ""
            )}
            <p className=" text-primary font-bold dark:text-white">Fecha</p>
            <p className="w-5/6  max-lg:max-w-md text-sm text-center text-secondary dark:text-slate-300">
              {date}
            </p>
            {user.first_name === consultation.doctor_Name &&
              consultation.is_pending === 0 &&
              consultation.is_active === 1 && (
                <>
                  <button
                    className="border bg-primary active:border-primary active:bg-white active:text-primary text-white py-2 px-6 rounded-full"
                    onClick={handelEndConsultation}
                  >
                    Finalizar Consulta
                  </button>
                </>
              )}
          </div>
        </div>

        <ConsultationsResponses
          consultation_id={consultation_id}
          doctor={consultation.doctor_Name}
        />
      </section>
    </>
  );
};

export default YourConsultation;
