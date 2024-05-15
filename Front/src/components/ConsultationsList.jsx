import axios from "axios";
import { useEffect, useState } from "react";
import { VITE_BASE_URL } from "../config/env.js";
// import { ConsultationForm } from "./consultations/ConsultationForm.jsx";
// import { UserTokenContext } from "../contexts/UserTokenContext.jsx";

export const ConsultationList = () => { 

  const [consultations, setConsultations] = useState([]);
  // const [token] = useContext(UserTokenContext);

  const token = localStorage.getItem("token")

  useEffect(() => { 
    const feachConsultations = async () => {
      
      console.log(`${VITE_BASE_URL}/consultations`);
     const resp = await axios.get(`${VITE_BASE_URL}/consultations`, {
        headers: {
          Authorization: `${token}`,
        }
     })
      const consultation = Object.values(resp.data.data.consultations)
  
      setConsultations(consultation)
    }
    feachConsultations();
  },[])
  return (
    <>
      {/* <ConsultationForm /> */}
      <section className="z-10">
         <div className="flex flex-col gap-2 items-center p-4 bg-white w-full  border-primary rounded-3xl">

        <ul className="w-full flex flex-col justify-center gap-5 bg-white p-5  border-white rounded-3xl min-h-72 max-h-96 overflow-auto hide-scrollbar shadow-lg">
          {consultations.filter(consultation => consultation.is_pending === 1)
            .map((consultation) => {
              return (
                <li
                  className="flex justify-between items-center  gap-5 shadow-xl p-4 text-primary font-bold rounded-3xl"
                  key={consultation.user_id}
                >
                  <p>
                    {consultation.first_name} {consultation.doctor_last_name}
                  </p>
                  <p>
                    {consultation.severity}
                  </p>
                  <p>
                    {consultation.created_at.slice(0,10)}
                  </p>
                </li>
              );
            })}
          
        </ul>
            <li className="flex flex-col text-center justify-center w-full bg-primary m-2 gap-5 shadow-xl p-6 font-bold rounded-3xl">
              <p className="text-white">Crea aqui tu consulta</p>
              <button className="items-center w-full bg-white m-2 gap-5 shadow-xl p-6 text-primary font-bold rounded-3xl">
                Crear cíta
              </button>
          </li>
          <ul className="flex felx-row justify-start gap-5 bg-white p-5  border-white rounded-3xl shadow-lg w-full mb-4">
          <img src="/images/search-icon.svg" alt="input icon" />
            <input
          className="w-full"
          type="text"
          placeholder="Busca un paciente..."
          // onChange={(e) => setName(e.target.value.toLowerCase())}
        />
          </ul>
          <ul className="w-full flex flex-col justify-center gap-5 bg-white p-5  border-white rounded-3xl min-h-72 max-h-96 overflow-auto hide-scrollbar shadow-lg">
            {consultations.filter(consultation => consultation.is_pending === 0)
          .map((consultation) => {
            return (
              <li
                className="flex justify-between items-center  gap-5 shadow-xl p-4 text-primary font-bold rounded-3xl"
                key={consultation.user_id}
              >
                <p>
                  {consultation.first_name} {consultation.doctor_last_name}  
                </p>
                <p>
                  {consultation.severity}
                </p>
                <p>
                  {consultation.created_at.slice(0,10)}
                </p>
              </li>
            );
          })}
            
      </ul>
        </div>
      </section>
    </>
  );
    
}