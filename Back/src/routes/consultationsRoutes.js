import express from 'express';
import {
  consultationsController,
  newConsultationsController,
  // deleteConsultationController,
  ConsultationFileController,
  oneConsultationControler,
  deleteConsultationFileController,
  endConsultationController,
  consultationsByDisciplineController,
} from '../controllers/consultations/index.js';
import { authUserController } from '../middlewares/authUserController.js';
// import { userValidationController } from '../middlewares/userValidationController.js';

export const consultationsRouter = express.Router();

//Importando controladores
//Crear consulta
consultationsRouter.post(
  '/consultations',
  authUserController,
  newConsultationsController
);

// //Borrar consulta
// consultationsRouter.delete(
//   '/consultations/:consultation_id',
//   authUserController,
//   userValidationController,
//   deleteConsultationController
// );

//Conseguir todas las consultas
consultationsRouter.get(
  '/consultations',
  authUserController,
  consultationsController
);

//Conseguir consultas de la especialidad del usuario
consultationsRouter.get(
  '/consultations/discipline',
  authUserController,
  consultationsByDisciplineController
);
//Conseguir consulta especifica
consultationsRouter.get(
  '/consultations/:consultation_id',
  authUserController,
  oneConsultationControler
);

// añadir archivo a la consulta
consultationsRouter.post(
  '/consultations/:consultation_id/file',
  authUserController,
  ConsultationFileController
);

// //actualizar consulta
// consultationsRouter.put(
//   '/consultations/update/:consultation_id',
//   authUserController,
//   userValidationController,
//   ConsultationFileController
// );

//borrar archivo de consulta

consultationsRouter.delete(
  '/consultation/:consultation_id/file',
  authUserController,
  deleteConsultationFileController
);

// cambiar consulta a finalizada
consultationsRouter.post(
  '/consultation/:consultation_id/end',
  // authUserController,
  endConsultationController
);
