import express from 'express';
import {
  consultationsController,
  newConsultationsController,
  deleteConsultationController,
  ConsultationFileController,
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
  '/consultations/',
  authUserController,
  consultationsController
);

//Conseguir consulta especifica
consultationsRouter.get(
  '/consultations/:consultation_id',
  authUserController,
  userValidationController,
  consultationsController
);

//Conseguir consulta por usuario(paciente)
consultationsRouter.get(
  '/consultations/user/:user_id',
  authUserController,
  consultationsController
);

//Conseguir consulta por usuario(medico)
consultationsRouter.get(
  '/consultations/doctor/:doctor_id',
  authUserController,
  consultationsController
);

//filtro de busqueda
consultationsRouter.get(
  '/consultations/search/consultation',
  authUserController,
  consultationsController
);

// //actualizar consulta
// consultationsRouter.put(
//   '/consultations/update/:consultation_id',
//   authUserController,
//   userValidationController,
//   ConsultationFileController
// );
