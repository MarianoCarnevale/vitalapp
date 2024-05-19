import { useContext, useEffect, useState } from "react"
import { VITE_BASE_URL } from "../config/env.js";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Rating } from "@mui/material";
import { useForm } from "react-hook-form";
import { UserTokenContext } from "../contexts/UserTokenContext.jsx";

export const ConsultationsResponses = (consultation) => {
  const [responses, setResponses] = useState([]);
    const { user, token } = useContext(UserTokenContext);


  const { register, handleSubmit, reset } = useForm()

  const OnSubmit = handleSubmit( async (data) => { 


    const resp = await axios.post(`${VITE_BASE_URL}/responses/${consultation.consultation_id}`, {
      content: `${data.content}`,
    }, {
      headers: {
       Authorization: `${token}`, 
      }
    })

    if (resp.data.status === "ok") {
      toast.success("Respuesat creada");
    } else { 
      toast.error("Error al crear respuesta");
    }

    fetchResponses();
    reset();
  })
  const fetchResponses = async () => { 
    
    try {
      ///responses/:consultation_id
    const resp = await axios.get(`${VITE_BASE_URL}/responses/${consultation.consultation_id}`,{
        headers: {
          Authorization: `${token}`,
        },
    });

    const responses_array = resp.data.data.responses
    console.log(responses);
      setResponses(responses_array)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => { 
    fetchResponses();
  },[])
  return (
    <section className="items-center lg:w-1/2 m-auto flex flex-col gap-6 max-lg:w-full max-lg:max-w-md">
      <ToastContainer autoClose={1500} />
      <p className=" text-primary text-2xl font-semibold mb-5">Tus Respuestas</p>
      {
       (responses.length > 0 || user.first_name === consultation.doctor)
      &&
        <form onSubmit={OnSubmit} className="flex flex-col w-full gap-7">

        <label
                htmlFor="NewResponse"
                className="text-primary text-2xl font-semibold mb-5"
                >
                {user.role === "doctor" ? "Escribe tu Diagnostico" : "Escribe tu Respuesta"}
              </label>
              <input
          id="NewResponse"
          className="border-2 border-primary p-2 w-full rounded"
          type="text"
          { ...register("content")}
          />
        <button
              className="bg-primary p-2 w-full rounded-md text-white active:bg-white active:text-black border-2  disabled:bg-secondary"
              >
              Enviar
            </button>
      </form>}
              {responses.length > 0 && 
      <ul className="w-full flex flex-col gap-5 bg-white p-5 my-5  border-white rounded-3xl max-h-[17rem] overflow-auto hide-scrollbar shadow-lg" >
          {responses.map(response => {
            return (
              <li
                className={`flex flex-col justify-between  gap-3 `}
                key={response.response_id}>
                <div className={`flex flex-col shadow-xl p-6 w-full font-medium text-md rounded-3xl`} >
                  <div className={`flex ${response.first_name === consultation.doctor ? "justify-start" : "justify-end"}`}>
                    <p className={`text-primary font-semibold mb-5 $`} >
                      {response.role === "doctor" ? "Doctor" : "Patient"}: {response.first_name}
                      {response.role === "doctor" && <Rating
                    name="rating"
                    value={`${consultation.avg_rating}`}
                    precision={0.5}
                    readOnly
        />}

                    </p>
                  </div>
                  <hr className="border border-primary w-full"/>
                  <p>{response.content}</p>
                  <p>date: {response.created_at.slice(1, 10)}</p>
                </div>
            </li>
          )
        })}
        </ul>
        || <p className=" text-primary text-2xl font-semibold mb-5">No hay respuestas disponbles</p>}
    </section>
  )

}