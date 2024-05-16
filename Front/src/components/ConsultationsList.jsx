import axios from "axios";
import { useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";
import { ConsultationForm } from "./consultations/ConsultationForm.jsx";

export const ConsultationList = () => {
  const [consultations, setConsultations] = useState([]);
  const [results, setresults] = useState([]);
  const [isNew , setIsNew] = useState(false)
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
    const word = event.target.value

    //convierte todo a lowercase y lo compara 
    const result = consultations.filter(consultation => 
      Object.values(consultation).some(value => value.toString().toLowerCase().includes(word.toLowerCase()))
    )

    //actualiza la segunda lista q estan respondidas
    setresults(result)
  }

  //Ir al form
  const handelForm = () => { 
    setIsNew(true)
  }

    //Obtener listado de consultas del back
  useEffect(() => {
    const feachConsultations = async () => {
      const resp = await axios.get(`${VITE_BASE_URL}/consultations`, {
        headers: {
          Authorization: `${token}`,
        }
     })
      const consultation = Object.values(resp.data.data.consultations)
  
      //se separan por un filter en la opcion pendin
      //establecer el listado de consultas
      setConsultations(consultation)

      //establecer el segundo listado de consultas 
      setresults(consultation)
    }
    
    feachConsultations();
    setIsNew(false)
  }, [])
  
  return (
    <>
      {isNew && <ConsultationForm />}

      {!isNew && 
      <section className="z-10">
         <div className="flex flex-col gap-2 items-center p-4 bg-white w-full  border-primary rounded-3xl">

          <ul className="w-full flex flex-col gap-5 bg-white p-5 text-center border-white rounded-3xl min-h-72 max-h-96 overflow-auto hide-scrollbar shadow-lg">
          { consultations.filter(consultation => consultation.is_pending === 1).length > 0 &&
            consultations.filter(consultation => consultation.is_pending === 1)
              .map((consultation) => {
                return (
                  <li
                    className="flex justify-between items-center gap-5 shadow-xl p-4 text-primary font-bold rounded-3xl"
                    key={consultation.consultation_id}
                  >
                    <p>
                      {consultation.first_name} {consultation.last_name}
                    </p>
                    <p className={`p-1 w-20 rounded-xl text-white ${getStatusClass(consultation.severity)}`}>
                      {consultation.severity}
                    </p>
                    <p>
                      {consultation.created_at.slice(0,10)}
                    </p>
                  </li>
                );
              }) || <p>No hay consultas</p>
          }
          </ul>
          
            <li className="flex flex-col text-center justify-center w-full bg-primary m-2 gap-5 shadow-xl p-6 font-bold rounded-3xl">
              <p className="text-white">Crea aqui tu consulta</p>
            <button className="items-center w-full bg-white m-2 gap-5 shadow-xl p-6 text-primary font-bold rounded-3xl"
            onClick={handelForm}>
                Crear cíta
              </button>
          </li>
          { consultations.filter(consultation => consultation.is_pending === 0).length > 0 && <ul className="w-full flex flex-col gap-5 bg-white p-5  border-white rounded-3xl min-h-72 max-h-96 overflow-auto hide-scrollbar shadow-lg">
          <ul className="flex felx-row justify-start gap-5 bg-white p-5  border-white rounded-3xl shadow-lg w-full mb-4">
          <img src="/images/search-icon.svg" alt="input icon" />
            <input
          className="w-full"
          type="text"
          placeholder="Busca un paciente..."
          onChange={handelSearch}
        />
          </ul>
            {results.filter(result => result.is_pending === 0)
          .map((result) => {
            return (
              <li
                className="flex justify-between items-center  gap-5 shadow-xl p-4 text-primary font-bold rounded-3xl"
                key={result.consultation_id}
              >
                <p>
                  {result.first_name} {result.doctor_last_name}  
                </p>
                <p>
                  {result.created_at.slice(0,10)}
                </p>
              </li>
            );
          })}
      </ul>}
        </div>
      </section>
      }
    </>
  );
};
