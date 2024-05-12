import axios from "axios";
import { VITE_BASE_URL } from "../config/env.js";

export const postNewFileApi = async (file, consultation_id) => {

  try { 
    //obtener el token del local storage
    const token = localStorage.getItem("token")

    //hacer consulta a la base de datos mandando el archivo
    const resp = await axios.post(`${VITE_BASE_URL}/consultations/${consultation_id}/file`,
      { "Files" : file },
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )

    //retornar la respuesta
    return resp
  } catch (error) {
    console.log("Error al mandar la el archivo: ",error);
     
    }
}