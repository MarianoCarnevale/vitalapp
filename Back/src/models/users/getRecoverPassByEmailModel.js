import { getPool } from '../../db/getPool.js';

export const getRecoverPassByEmailModel = async (email) => {
  const pool = await getPool();

  // Obtener el codigo de recuperación con ese email.
  const [recoveryCode] = await pool.query(
    `SELECT recovery_code FROM users WHERE email = ?`,
    [email]
  );

  // Si no se ha encontrado ningún usuario, lanzar un error.
  /* if (user.length === 0) {
    notFoundError('usuario');
  } */

  // El array de usuarios solo podrá contener un único usuario dado que el email no puede repetirse. Retornamos al usuario que se encuentra en la posición 0, es decir, retornamos el objeto en lugar de retornar un array con un elemento.
  // Si en la posición 0 no hay nada retornaremos undefined.

  // Devolver el resultado.
  return recoveryCode[0];
};
