import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";

import { PendingConsultations } from "./PendingConsultations.jsx";

import { UserTokenContext } from "../contexts/UserTokenContext.jsx";

export const ConsultationList = () => {
  const [consultations, setConsultations] = useState([]);
  const [results, setResults] = useState([]);

  const { token } = useContext(UserTokenContext);

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
      <section className="max-lg:pt-5 m-auto  gap-6 items-center">
        <PendingConsultations consultations={consultations} results={results} />
      </section>
    </>
  );
};
