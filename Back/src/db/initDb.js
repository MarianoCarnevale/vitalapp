import { MYSQL_DATABASE } from '../../env.js';
import { getPool } from './getPool.js';
const initDb = async () => {
  try {
    // Obtener el pool de conexiones
    const pool = await getPool();

    console.log(MYSQL_DATABASE);

    // Poner en uso la base de datos
    console.log('Poniendo en uso la base de datos 📑');
    await pool.query(`USE ${MYSQL_DATABASE}`);
    console.log('Base de datos en uso ✅ 📑');

    // Eliminar las tablas ratings , responses , consultations , doctors_desciplines , desciplines , doctors , users si existen
    console.log(
      'Eliminando las tablas ratings , responses , consultations , doctors_disciplines , disciplines , doctors , users si existen '
    );
    await pool.query(
      'DROP TABLE IF EXISTS ratings , responses , consultations , doctors_disciplines , disciplines , doctors , users'
    );
    console.log('Tablas eliminadas ✅ 🗑');

    // Crear la tabla users
    console.log('Creando la tabla users 📑');
    await pool.query(`
    CREATE TABLE users (
      user_id VARCHAR(100) PRIMARY KEY NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      username VARCHAR(30) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      role ENUM("doctor" , "patient") NOT NULL,
      validation_code VARCHAR(100) NOT NULL,
      recovery_code VARCHAR(100) NOT NULL,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30),
      first_surname VARCHAR(30) NOT NULL,
      last_surname VARCHAR(30),
      avatar VARCHAR(50),
      bio VARCHAR(255),
      address VARCHAR(100),
      phone_number VARCHAR(15),
      birth_date DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_active BOOLEAN DEFAULT False
      );
    `);
    console.log('Tabla users creada ✅ 📑');

    // Crear la tabla doctors
    console.log('Creando la tabla doctors 📑');
    await pool.query(`
    CREATE TABLE doctors (
      doctor_id VARCHAR(100) PRIMARY KEY NOT NULL,
      user_id VARCHAR(100) NOT NULL,
      doctor_registration_number VARCHAR(15) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
    `);
    console.log('Tabla doctors creada ✅ 📑');

    // Crear la tabla doctors_desciplines
    console.log('Creando la tabla doctors_disciplines 📑');
    await pool.query(`
        CREATE TABLE disciplines (
          discipline_id TINYINT AUTO_INCREMENT PRIMARY KEY NOT NULL,

          discipline_name VARCHAR(30) NOT NULL

         );
        `);
    console.log('Tabla disciplines creada ✅ 📑');

    // Insertamos datos en tabla disciplinas
    await pool.query(`

    INSERT INTO disciplines (discipline_name) VALUES 
    ('Medicina Familiar'),
    ('Anatomía Patológica'),
    ('Anestesiología'),
    ('Bioquímica Clínica'),
    ('Cardiología'),
    ('Cirugía Cardiovascular'),
    ('Cirugía General'),
    ('Cirugía Plástica'),
    ('Dermatología'),
    ('Endocrinología'),
    ('Farmacología Clínica'),
    ('Fisioterapia'),
    ('Gastroenterología'),
    ('Genética Médica'),
    ('Ginecología'),
    ('Hematología'),
    ('Infectología'),
    ('Medicina Deportiva'),
    ('Medicina General'),
    ('Medicina Interna'),
    ('Microbiología'),
    ('Nefrología'),
    ('Neumología'),
    ('Neurocirugía'),
    ('Neurología'),
    ('Nutriología'),
    ('Obstetricia'),
    ('Oftalmología'),
    ('Oncología'),
    ('Ortopedia'),
    ('Otorrinolaringología'),
    ('Patología Clínica'),
    ('Pediatría'),
    ('Psiquiatría'),
    ('Radiología'),
    ('Reumatología'),
    ('Terapia Intensiva'),
    ('Terapia Ocupacional'),
    ('Traumatología'),
    ('Urología')
    ;
`);
    console.log('Especialidades médicas insertadas correctamente.');


    // Crear la tabla doctors_disciplines
    console.log('Creando la tabla doctors_disciplines 📑');
    await pool.query(`
    CREATE TABLE doctors_disciplines (
      doctor_id VARCHAR(100) NOT NULL,
      discipline_id VARCHAR(100) NOT NULL,
      experience DATE NOT NULL,
      PRIMARY KEY (doctor_id, discipline_id),
      FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
      FOREIGN KEY (discipline_id) REFERENCES disciplines(discipline_id)
     );
        `);
    console.log('Tabla doctors_disciplines creada ✅ 📑');

    // Crear tabla consultations
    console.log('Creando la tabla consultations 📑');
    await pool.query(`
           CREATE TABLE consultations (
            consultation_id VARCHAR(100) PRIMARY KEY NOT NULL,
            user_id VARCHAR(100) NOT NULL,
            discipline_id VARCHAR(100) NOT NULL,
            doctor_id VARCHAR(100),
            title VARCHAR(50) NOT NULL,
            description TEXT NOT NULL,
            file VARCHAR(40),
            severity ENUM("high" , "medium" , "low") NOT NULL,
            is_private BOOLEAN DEFAULT False, 
            is_active BOOLEAN DEFAULT True,
            is_pending BOOLEAN DEFAULT True,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            FOREIGN KEY (discipline_id) REFERENCES disciplines(discipline_id),
            FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
           );
           `);
    console.log('Tabla consultations creada ✅ 📑');

    // Crear la tabla responses
    console.log('Creando la tabla responses  📑');
    await pool.query(`
        CREATE TABLE responses (
          response_id VARCHAR(100) PRIMARY KEY NOT NULL,
          consultation_id VARCHAR(100) NOT NULL,
          user_id VARCHAR(100) NOT NULL,
          content TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (consultation_id) REFERENCES consultations(consultation_id),
          FOREIGN KEY (user_id) REFERENCES users(user_id)
          );
            `);
    console.log('Tabla responses  creada ✅ 📑');

    // Crear la tabla ratings
    console.log('Creando la tabla ratings   📑');
    await pool.query(`
        CREATE TABLE ratings (
          rating_id VARCHAR(100) PRIMARY KEY NOT NULL,
          response_id VARCHAR(100) NOT NULL,
          user_id VARCHAR(100) NOT NULL,
          rating_value TINYINT NOT NULL, 
          FOREIGN KEY (user_id) REFERENCES users(user_id),
          FOREIGN KEY (response_id) REFERENCES responses(response_id)
          );
                `);
    console.log('Tabla ratings creada ✅ 📑');

    console.log('Base de datos inicializada 🚀');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

initDb();
