// Importamos las dependencias.
import express from 'express';

// Importamos los controladores.
import {
  getDoctorController,
  getDoctorsController,
  getDoctorsByDisciplineController,
} from '../controllers/doctors/index.js';

// Creamos un router.
export const doctorsRouter = express.Router();

// obtener informacion del doctor
doctorsRouter.get('/doctor/:doctor_id', getDoctorController);

// Obtener todos los doctores:
doctorsRouter.get('/doctors', getDoctorsController);

// -Obtener doctores por especialidad:
doctorsRouter.get('/doctors/:discipline_id', getDoctorsByDisciplineController);
