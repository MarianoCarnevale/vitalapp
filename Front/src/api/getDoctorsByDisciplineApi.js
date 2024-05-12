import axios from "axios";
import { VITE_BASE_URL } from "../config/env.js";

export const getDoctorsByDisciplineApi = async (discipline_value) => { 
  try {
      const response = await axios.get(
        `${VITE_BASE_URL}/doctors/${discipline_value}`
      );
      const doctors_array = Object.values(response.data.data);
      
      return(doctors_array[0])
    } catch (error) {
      //Si no hay doctor en la especilida
      
      //mandar mensaje de disponibilidad
      
      console.error(error);
    }

}