import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
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
      <ToastContainer autoClose={1500} />

      <section className="z-10 items-center lg:w-full m-auto flex flex-col gap-6 max-lg:w-full max-lg:max-w-md">
        <p className=" text-primary text-2xl font-semibold mb-5">Tu consulta</p>
        <div className="flex justify-center w-full gap-4">
          <p
            className={`border border-primary text-primary py-2 px-6 rounded-full ${
              consultation.is_pending
                ? "bg-primary font-bold text-white"
                : "bg-secondary text-white border-0 font-bold"
            }`}
          >
            {consultation.is_pending ? "Pendiente" : "Finalizada"}
          </p>
        </div>
        <div className="min-w-36 px-24 items-center flex flex-col justify-center gap-5 bg-white  border-white rounded-3xl min-h-72 overflow-auto hide-scrollbar shadow-lg">
          <p className="text-xl flex justify-between items-center  gap-5 p-4 text-primary font-bold rounded-3xl">
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
                !consultation.patient_avatar ||
                consultation.patient_avatar === null
                  ? "/images/Avatar.svg"
                  : `${VITE_BASE_URL}/users/${consultation.user_id}/${consultation.patient_avatar}`
              }
              alt={consultation.doctor_avatar}
            />
          )}
          <p className="text-primary font-bold text-center text-l">
            {user.role === "patient"
              ? " Consulta para el medico"
              : "Consulta de"}
          </p>

          <Link
            className="w-5/6 max-lg:max-w-md text-l text-center font-bold text-secondary"
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
            <p className="w-5/6  max-lg:max-w-md text-sm text-center font-bold text-secondary">
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
          <p className="text-primary font-bold ">Descripción</p>
          <p className="w-5/6 text-center max-lg:max-w-md text-m text-secondary">
            {consultation.description}
          </p>

          <p className="dark:text-white text-primary font-bold ">Archivo</p>
          {consultation.file === null ? (
            <p className="dark:text-slate-400">No se ha adjuntado archivo</p>
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

          <p className="dark:text-white text-primary font-bold ">Gravedad</p>

          <p
            className={`p-1 w-20 font-bold rounded-xl text-center text-white ${getStatusClass(
              consultation.severity
            )}`}
          >
            {consultation.severity}
          </p>
          <p className=" text-primary font-bold ">Fecha</p>
          <p className="w-5/6  max-lg:max-w-md text-sm text-center text-secondary">
            {date}
          </p>
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
