import { getPool } from "../../db/getPool.js";
import { generateError } from "../../utils/errors/generateError.js";

export const selectConsultationsByFilter = async (filter) => {
  try {
    //Esperamos conexion de la base de datos
    const pool = await getPool();

    //Peticon a la base de datos
    //Unimos el WHERE con los filtros que llegan de el controlador
    const [consultations] = await pool.query(`
    SELECT * FROM vitalapp.consultations WHERE ${filter}` 
  );
    
    //retorno de los datos
    return consultations;
    
  } catch (error) {
    throw generateError('consultation not found', 404)
  }
}