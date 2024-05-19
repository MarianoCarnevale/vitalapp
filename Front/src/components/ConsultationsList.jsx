import axios from "axios";
import { useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";
import { ConsultationForm } from "./consultations/ConsultationForm.jsx";
import { Link, NavLink } from "react-router-dom";

export const ConsultationList = () => {
  const [consultations, setConsultations] = useState([]);
  const [results, setresults] = useState([]);
  const [isNew, setIsNew] = useState(false);
  // const [token] = useContext(UserTokenContext);

  const token = localStorage.getItem("token");

  //poner clases distintas a cada gravedad
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

  //Maneja el sistema de busqueda por palabras
  const handelSearch = (event) => {
    const word = event.target.value;

    //convierte todo a lowercase y lo compara
    const result = consultations.filter((consultation) =>
      Object.values(consultation).some((value) =>
        value.toString().toLowerCase().includes(word.toLowerCase())
      )
    );

    //actualiza la segunda lista q estan respondidas
    setresults(result);
  };

  //Ir al form
  const handelForm = () => {
    setIsNew(true);
  };

  //Obtener listado de consultas del back
  useEffect(() => {
    const feachConsultations = async () => {
      const resp = await axios.get(`${VITE_BASE_URL}/consultations`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const consultation = Object.values(resp.data.data.consultations);

      //se separan por un filter en la opcion pendin
      //establecer el listado de consultas
      setConsultations(consultation);

      //establecer el segundo listado de consultas
      setresults(consultation);
    };

    feachConsultations();
    setIsNew(false);
  }, []);

  return (
    <>
      {isNew && <ConsultationForm />}

      {!isNew && (
        <section className="max-lg:pt-10 m-auto  gap-6 items-center max-w-lg">
          <p className=" w-5/6 text-left text-primary font-semibold text-3xl ">
            Tus ultimas consultas
          </p>
          <div className="  gap-2 items-left  w-full  border-primary rounded-3xl">
            <ul className="w-full flex flex-col gap-5 dark:bg-slate-700  bg-white p-5 my-5  border-white rounded-3xl h-full max-h overflow-auto hide-scrollbar shadow-lg">
              {(consultations.filter(
                (consultation) => consultation.is_pending === 1
              ).length > 0 &&
                consultations
                  .filter((consultation) => consultation.is_pending === 1)
                  .map((consultation) => {
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
                            {consultation.first_name} {consultation.last_name}
                          </p>
                          <p
                            className={`grow-2 py-1 px-2  rounded-xl text-white ${getStatusClass(
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
                  })) || <p>No hay consultas</p>}
            </ul>

            <div className="my-5 list-none text-center m-auto w-full bg-primary gap-5 shadow-xl p-6 font-bold rounded-3xl">
              <button
                className="items-center w-full bg-white m-2 gap-5 shadow-xl p-6 text-primary font-bold rounded-3xl"
                onClick={handelForm}
              >
                Crear tu consulta
              </button>
            </div>
            {consultations.filter(
              (consultation) => consultation.is_pending === 0
            ).length > 0 && (
              <ul className="w-5/6 flex flex-col gap-5 bg-white p-5  border-white rounded-3xl min-h-72 max-h-96 overflow-auto hide-scrollbar shadow-lg">
                <li className="flex justify-start gap-5 bg-white p-5  border-white rounded-3xl shadow-lg w-full mb-4">
                  <img src="/images/search-icon.svg" alt="input icon" />
                  <input
                    className="w-full"
                    type="text"
                    placeholder="Busca un paciente..."
                    onChange={handelSearch}
                  />
                </li>
                {results.filter((result) => result.is_pending === 0) && results
                  .map((result) => {
                    return (
                      <NavLink
                        key={result.consultation_id}
                        to={`/consultations/${result.consultation_id}`}
                      >
                        <li
                          className="flex justify-between items-center  gap-5 shadow-xl p-4 text-primary font-bold rounded-3xl"
                          key={result.consultation_id}
                        >
                          <p>
                            {result.first_name} {result.doctor_last_name}
                          </p>
                          <p>{result.created_at.slice(0, 10)}</p>
                        </li>
                      </NavLink>
                    );
                  })}
              </ul>
            )}
          </div>
        </section>
      )}
    </>
  );
};
