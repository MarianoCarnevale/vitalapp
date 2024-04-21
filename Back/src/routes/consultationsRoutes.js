import express from 'express';
import { consultationsController } from '../controllers/consultations/index.js';
import { consultationsFilterController } from '../controllers/consultations/consultationsFilterController.js';

export const consultationsRouter = express.Router();

//Importando controladores
consultationsRouter.get('/', consultationsController);

consultationsRouter.get('/filter', consultationsFilterController)