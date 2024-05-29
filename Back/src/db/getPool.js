import mysql from 'mysql2/promise';
import { generateError } from '../utils/errors/generateError.js';
import url from 'url';

let pool;

export const getPool = async () => {
  try {
    if (!pool) {
      const dbUrl = new url.URL(process.env.DATABASE_URL);
      pool = mysql.createPool({
        host: dbUrl.hostname,
        user: dbUrl.username,
        password: dbUrl.password,
        database: dbUrl.pathname.substr(1),
        port: dbUrl.port,
        connectionLimit: 10,
        timezone: 'Z',
      });
    }

    return pool;
  } catch (error) {
    throw new generateError('Error al conectar con la base de datos', 500);
  }
};
