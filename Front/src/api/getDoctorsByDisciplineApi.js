import axios from "axios";
import { VITE_BASE_URL } from "../config/env.js";

export const getDoctorsByDisciplineApi = async (discipline_value) => { 
  try {
    //Obtener doctores por disciplina
    const response = await axios.get(
      `${VITE_BASE_URL}/doctors/${discipline_value}`
    );
    
    //Obtener los doctores 
    const doctors_array = Object.values(response.data.data);

    //retornar la lista de doctores
    return(doctors_array[0])
    
    } catch (error) {
      console.error("Error al obtener doctores por disciplina: ",error);
    }

}