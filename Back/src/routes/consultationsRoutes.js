import express from 'express';
import { consultationsController, putConsultationsController } from '../controllers/consultations/index.js';
import { consultationsFilterController } from '../controllers/consultations/consultationsFilterController.js';

export const consultationsRouter = express.Router();

//Importando controladores
consultationsRouter.get('/consultations/', consultationsController);

consultationsRouter.get('/consultations/filter', consultationsFilterController)

consultationsRouter.put('/consultations/', putConsultationsController)