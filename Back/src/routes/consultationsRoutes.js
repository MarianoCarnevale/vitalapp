import express from 'express';
import { consultationsController, postConsultationsController,consultationsFilterController, deleteConsultationController } from '../controllers/consultations/index.js';
import { consultationByUser } from '../controllers/consultations/ConsultationByUser.js';
import { authUserController } from '../middlewares/authUserController.js';

export const consultationsRouter = express.Router();

//Importando controladores
//Crear consulta
consultationsRouter.post('/consultations/',authUserController, postConsultationsController);

//Borrar consulta
consultationsRouter.delete('/consultations/:consultation_id',authUserController, deleteConsultationController);

//Conseguir todas las consultas
consultationsRouter.get('/consultations/',authUserController, consultationsController);

//Conseguir consulta especifica
consultationsRouter.get('/consultations/:consultation_id',authUserController, consultationsController);

//Conseguir consulta por usuario(paciente)
consultationsRouter.get('/consultations/user/:user_id',authUserController, consultationByUser )

//Conseguir consulta por usuario(medico)
consultationsRouter.get('/consultations/doctor/:doctor_id',authUserController, consultationByUser )

//filtro de busqueda
consultationsRouter.get('/consultations/search/consultation',authUserController, consultationsFilterController)