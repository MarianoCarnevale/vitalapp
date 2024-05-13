import axios from "axios";
import { VITE_BASE_URL } from "../config/env.js";

export const getDisciplinesApi = async () => {
  try {
    //hacemos la consulta a la base de datos
    const resp = await axios.get(`${VITE_BASE_URL}/disciplines`);
    
    //obtenemos todos los objetos d la consulta
    const disciplines_values = Object.values(resp.data.data.disciplines);
      
    //Asignamos todas las disciplinas al useState
    return disciplines_values;

    } catch (error) {
      console.log("Error al obtener disciplinas: ",error);
    }
  };