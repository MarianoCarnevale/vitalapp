import axios from "axios";
import { VITE_BASE_URL } from "../config/env.js";

export const postNewFileApi = async (file, consultation_id) => {

  const form = new FormData();
  
  form.append('Files', file);

  try { 
    const token = localStorage.getItem("token");
    const resp = await axios.post(`${VITE_BASE_URL}/consultations/${consultation_id}/file`,
      {"Files" : file},
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )
    return resp
  } catch (error) {
    console.log("Error al mandar la el archivo: ",error);
     
    }
}