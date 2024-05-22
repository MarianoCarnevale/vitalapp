import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { UserTokenContext } from "../contexts/UserTokenContext";
import axios from "axios";
import { VITE_BASE_URL } from "../config/env";

export const ConsultationsByDiscipline = () => {
    const { token, user } = useContext(UserTokenContext);
    const [consultation, setConsultation] = useState([]);

    useEffect(() => {
        getConsultation();
        console.log(consultation);
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
      }


    const getConsultation = async () => {
        const resp = await axios.get(
          `${VITE_BASE_URL}/consultations/discipline`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log(resp);
        const [consultation] = Object.values(resp.data.data.consultations);
    console.log(consultation);
        setConsultation(consultation);
    
        console.log(consultation);
      };
  
  
  
    return (
    <>
    {user.role === "doctor" && 
      <div className="  gap-2 items-left  w-full  border-primary rounded-3xl">
        <ul className="w-full flex flex-col gap-5 dark:bg-slate-700  bg-white p-5 my-5  border-white rounded-3xl h-full max-h overflow-auto hide-scrollbar shadow-lg">
          {consultation?.length === 0 && <p>No existen consultas de tu especialidad.</p>}
        <p className=" w-5/6 text-left dark:text-white text-primary font-semibold text-3xl ">
          Consultas de tu Especialidad
        </p>
          {consultation?.length > 0 && consultation.filter(
                (consultation) =>
                  consultation).map((consultation) => {
                return (
                  <Link
                    key={consultation.consultation_id}
                    to={`/consultations/${consultation.consultation_id}`}
                    className="text-white font-semibold list-none"
                  >
                    <li
                      className="flex justify-between items-center  gap-2 hover:shadow-md shadow-xl p-4 text-primary font-bold rounded-3xl"
                      key={consultation.consultation_id}
                    >
                      <p>
                        {consultation.first_name} {consultation.surname}
                      </p>
                      <p
                      className={`py-1 px-2 rounded-xl text-white ${getStatusClass(
                        consultation.severity
                      )}`}
                    >
                      {consultation.severity}
                    </p>
                      <p className="grow-1">
                        {consultation.created_at.slice(0, 10)}
                      </p>
                    </li>
                  </Link>
                );
              })}
        </ul>
      </div>}
    </>
  );
};

ConsultationsByDiscipline.propTypes = { children: PropTypes.array };
