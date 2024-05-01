// Cargamos las variables de entorno
import 'dotenv/config';

// Importar las variables de entorno del .env
const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  PORT,
  SECRET,
  UPLOADS_DIR,
  SMTP_SERVICE,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
} = process.env;

export {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  PORT,
  SECRET,
  UPLOADS_DIR,
  SMTP_SERVICE,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
};
