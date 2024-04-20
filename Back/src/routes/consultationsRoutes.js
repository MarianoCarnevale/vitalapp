import express from 'express';
import { consultationsController, consultationsSeverityController } from '../controllers/consultations/index.js';

export const consultationsRouter = express.Router();

//Importando controladores
consultationsRouter.get('/', consultationsController);

consultationsRouter.get('/severity', consultationsSeverityController);