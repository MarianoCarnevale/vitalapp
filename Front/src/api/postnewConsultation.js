import axios from "axios";
import { VITE_BASE_URL } from "../config/env.js";
import { toast } from "react-toastify";

export const postNewConsultation = async ( data ) => { 
  const dataToSend = {
      doctor_id: data.doctor,
      title: data.titulo,
      description: data.descripcion,
      discipline_id: data.especialidad,
      severity: data.gravedad,
  };
  try {
    const token = localStorage.getItem("token");

      const resp = await axios.post(
        `${VITE_BASE_URL}/consultations`,
        dataToSend,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
    );

    const consultation_id = resp.data.data
    return consultation_id

  } catch (error) {
    toast.success("Consulta enviada correctamente");
  }
}