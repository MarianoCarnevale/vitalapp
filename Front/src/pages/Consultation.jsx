import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ConsultationsByDiscipline } from "../components/ConsultationsByDiscipline.jsx";
import { FinishedConsultations } from "../components/FinishedConsultations.jsx";
import { TramitingConsultations } from "../components/TramitingConsultations.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { VITE_BASE_URL } from "../config/env.js";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import { useContext } from "react";
import { PendingConsultations } from "../components/PendingConsultations.jsx";
import { SearchConsultation } from "../components/SearchConsultation.jsx";

const Consultation = () => {
  const { token, user } = useContext(UserTokenContext);
  const [consultations, setConsultations] = useState([]);
  const [results, setResults] = useState([]);
  // const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    const fetchConsultations = async () => {
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
      setResults(consultation);
    };

    fetchConsultations();
  }, []);

  return (
    <>
      <ToastContainer />
      <section className="w-5/6 max-lg:max-w-lg lg:mb-20 m-auto grid grid-cols-1 max-lg:mb-32 mt-10 lg:grid-cols-2 gap-6 max-lg:gap-10 items-start">
        {user.role === "patient" ? (
          <>
            <TramitingConsultations
              consultations={consultations}
              results={results}
            />
            <PendingConsultations
              consultations={consultations}
              results={results}
            />
            <FinishedConsultations
              consultations={consultations}
              results={results}
            />
            <SearchConsultation
              consultations={consultations}
              results={results}
            />
          </>
        ) : (
          // Aquí puedes poner el contenido que quieres mostrar cuando el rol es 'doctor'
          <>
            <TramitingConsultations
              consultations={consultations}
              results={results}
            />
            <PendingConsultations
              consultations={consultations}
              results={results}
            />
            <FinishedConsultations
              consultations={consultations}
              results={results}
            />
            <ConsultationsByDiscipline />
          </>
        )}
      </section>
    </>
  );
};

export default Consultation;
