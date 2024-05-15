import express from 'express';
import {
  consultationsController,
  newConsultationsController,
  deleteConsultationController,
  ConsultationFileController,
  oneConsultationControler,
} from '../controllers/consultations/index.js';
import { authUserController } from '../middlewares/authUserController.js';
import { userValidationController } from '../middlewares/userValidationController.js';

export const consultationsRouter = express.Router();

//Importando controladores
//Crear consulta
consultationsRouter.post(
  '/consultations',
  authUserController,
  newConsultationsController
);

//Borrar consulta
consultationsRouter.delete(
  '/consultations/:consultation_id',
  authUserController,
  userValidationController,
  deleteConsultationController
);

//Conseguir todas las consultas
consultationsRouter.get(
  '/consultations',
  authUserController,
  consultationsController
);

//Conseguir consulta especifica
consultationsRouter.get(
  '/consultations/:consultation_id',
  authUserController,
  userValidationController,
  oneConsultationControler
);

//filtro de busqueda
consultationsRouter.get(
  '/consultations/search/consultation',
  authUserController,
  consultationsController
);

consultationsRouter.post(
  '/consultations/:consultation_id/file',
  authUserController,
  ConsultationFileController
)

// //actualizar consulta
// consultationsRouter.put(
//   '/consultations/update/:consultation_id',
//   authUserController,
//   userValidationController,
//   ConsultationFileController
// );
