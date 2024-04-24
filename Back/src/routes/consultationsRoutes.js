import express from 'express';
import { consultationsController, postConsultationsController,consultationsFilterController, deleteConsultationController } from '../controllers/consultations/index.js';
import { consultationByUser } from '../controllers/consultations/ConsultationByUser.js';

export const consultationsRouter = express.Router();

//Importando controladores
//Crear consulta
consultationsRouter.post('/consultations/', postConsultationsController);

//Borrar consulta
consultationsRouter.delete('/consultations/:consultation_id', deleteConsultationController);

//Conseguir todas las consultas
consultationsRouter.get('/consultations/', consultationsController);

//Conseguir consulta especifica
consultationsRouter.get('/consultations/:consultation_id', consultationsController);

//Conseguir consulta por usuario(paciente)
consultationsRouter.get('/consultations/user/:user_id',consultationByUser )

//Conseguir consulta por usuario(medico)
consultationsRouter.get('/consultations/doctor/:doctor_id',consultationByUser )

//filtro de busqueda
consultationsRouter.get('/consultations/search/hola', consultationsFilterController)