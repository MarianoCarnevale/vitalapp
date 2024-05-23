import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

export const updateResponseModel = async (response_id, content) => {
  try {
    // Crear la conexión a la base de datos.
    const pool = await getPool();

    // Crear la query base.
    let query = `UPDATE responses SET content = ?`;

    // Crear los valores para la query.
    let values = [content];

    // Añadir el where al final de la query y el user_id a los valores.
    query += ` WHERE response_id = ?`;
    values.push(response_id);

    // Actualizar la respuesta en la base de datos.
    const result = await pool.query(query, values);

    // Verificar si el update afectó a alguna línea.
    if (result.affectedRows === 0) {
      throw generateError('No se ha podido actualizar la respuesta.', 500)
    }

    // Buscar la respuesta actualizada.
    const [response] = await pool.query(`SELECT * FROM responses WHERE response_id = ?`, response_id);

    // Devolver la respuesta.
    return response[0];
  } catch (error) {
    throw error;
  }
};
