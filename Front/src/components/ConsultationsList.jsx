import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";
import { ConsultationForm } from "./consultations/ConsultationForm.jsx";

import { PendingConsultations } from "./PendingConsultations.jsx";
import { TramitingConsultations } from "./TramitingConsultations.jsx";
import { FormContext } from "../contexts/FormContext.jsx";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";
import { FinishedConsultations } from "./FinishedConsultations.jsx";


export const ConsultationList = () => {
  const [consultations, setConsultations] = useState([]);
  const [results, setresults] = useState([]);
  const { isModal, setIsModal } = useContext(FormContext);

  const { token, user } = useContext(UserTokenContext); 


  //Maneja el sistema de busqueda por palabras
  const handleSearch = (event) => {
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
  }, []);

  console.log(user);
  return (
    <>
      {isModal && <ConsultationForm />}

        <section className="max-lg:pt-10 m-auto  gap-6 items-center max-w-lg">

          <li className="flex justify-start gap-5 bg-white p-5  border-white rounded-3xl shadow-lg w-full mb-4">
            <img src="/images/search-icon.svg" alt="input icon" />
            <input className="w-full" type="text" placeholder="Busca una consulta..." onChange={handleSearch}/>
          </li>
        <PendingConsultations consultations={consultations} results={results} />
        
        {user.role === "patient" && <div className="my-5 list-none text-center m-auto w-full bg-primary gap-5 shadow-xl p-6 font-bold rounded-3xl">

              <button
                className="items-center w-full bg-white m-2 gap-5 shadow-xl p-6 text-primary font-bold rounded-3xl"
                onClick={() => {setIsModal(true)}}
              >
                Crear tu consulta
              </button>
            </div>
        }
          <TramitingConsultations consultations={consultations} results={results}/>

          <FinishedConsultations consultations={consultations} results={results}/>
          </section>

    </>
  );
};
