// Importamos las dependencias.
import express from 'express';

// Importamos los controladores.
import {
  getDoctorController,
  getDoctorsController,
  getDoctorsByDisciplineController,
} from '../controllers/doctors/index.js';
import { authUserController } from '../middlewares/authUserController.js';

// Creamos un router.
export const doctorsRouter = express.Router();

// obtener informacion del doctor
doctorsRouter.get(
  '/doctor/:doctor_id',
  authUserController,
  getDoctorController
);

// Obtener todos los doctores:
doctorsRouter.get('/doctors', authUserController, getDoctorsController);

// -Obtener doctores por especialidad:
doctorsRouter.get(
  '/doctors/:discipline_id',
  authUserController,
  getDoctorsByDisciplineController
);
