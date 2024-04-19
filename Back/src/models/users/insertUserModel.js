// Importamos la conexión a la base de datos.
import { getPool } from '../../db/getPool.js';
import { generateError } from '../../utils/errors/generateError.js';

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
export const insertUserModel = async (
  user_id,
  username,
  email,
  password,
  role,
  validation_code,
  recovery_code,
  first_name,
  first_surname
) => {
  // Crear un pool de conexiones.
  const pool = await getPool();

  // Insertamos el usuario en la base de datos.
  const [result] = await pool.query(
    `INSERT INTO users (user_id, username, email, password, role, validation_code, recovery_code, first_name, first_surname) VALUES (?, ?, ?, ?, ?, ?,?,?,?)`,
    [
      user_id,
      username,
      email,
      password,
      role,
      validation_code,
      recovery_code,
      first_name,
      first_surname,
    ]
  );

  // Verificar si el insert afectó a alguna línea.
  if (result.affectedRows === 0) {
    throw generateError('No se ha podido insertar el usuario', 500);
  }
};
