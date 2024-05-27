// Importamos las dependencias.
import express from 'express';

// Importamos los controladores.
import {
  getDoctorController,
  getDoctorsController,
  getDoctorsByDisciplineController,
  getDoctorsRankedController,
} from '../controllers/doctors/index.js';

// Creamos un router.
export const doctorsRouter = express.Router();

// obtener informacion del doctor
doctorsRouter.get(
  '/doctor/:doctor_id',
  authUserController,
  getDoctorController
);

// Obtener todos los doctores:
doctorsRouter.get('/doctors', getDoctorsController);

// Obtener todos los doctores:
doctorsRouter.get(
  '/doctors/ranking',
  authUserController,
  getDoctorsRankedController
);

// -Obtener doctores por especialidad:
doctorsRouter.get('/doctors/:discipline_id', getDoctorsByDisciplineController);
