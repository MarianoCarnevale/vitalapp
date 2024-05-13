import axios from "axios";
import { VITE_BASE_URL } from "../config/env.js";

export const postNewConsultation = async (data) => { 
  
  //asignar todos los archivos de data segun se pasan al backend
  const dataToSend = {
      doctor_id: data.doctor,
      title: data.titulo,
      description: data.descripcion,
      discipline_id: data.especialidad,
      severity: data.gravedad,
  };
  try {

    //obtener el token del local storage
    const token = localStorage.getItem("token")
    
    //hacer peticion a la base de datos
    const resp = await axios.post(
      `${VITE_BASE_URL}/consultations`,
      dataToSend,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    
    //obtener id de consulta de la respuesta y retornarlo
    const consultation_id = resp.data.data
    return consultation_id

  } catch (error) {
    console.log("Error al enviar consulta: ",error);
  }
}