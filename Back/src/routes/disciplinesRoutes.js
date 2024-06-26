// Importamos las dependencias.
import express from 'express';

// Importamos los controladores.
import {
  getAllDisciplinesController,
  getAllDisciplinesWithDoctorsController,
} from '../controllers/disciplines/index.js';

// Creamos un router.
export const disciplinesRouter = express.Router();

disciplinesRouter.get('/disciplines', getAllDisciplinesController);

disciplinesRouter.get(
  '/disciplines/doctors',
  getAllDisciplinesWithDoctorsController
);
