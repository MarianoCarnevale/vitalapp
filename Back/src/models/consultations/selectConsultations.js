import { MYSQL_DATABASE } from "../../../env.js";
import { getPool } from "../../db/getPool.js"
import { generateError } from "../../utils/errors/generateError.js";

export const selectConsultations = async () => {
  try {
    //Esperamos conexion de la base de datos
    const pool = await getPool();

    //Peticon a la base de datos
    const [consultations] = await pool.query(`SELECT * FROM vitalapp.consultations`);
    
    //retorno de los datos
    return consultations;
    
  } catch (error) {
    throw generateError('consultations table not found', 404)
  }
}