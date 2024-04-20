import express from 'express';
import { consultationsController } from '../controllers/consultations/index.js';
import { selectConsultations } from '../models/consultations/selectConsultations.js';
import { generateError } from '../utils/errors/generateError.js';

export const consultationsRouter = express.Router();

//Importando controladores
consultationsRouter.get('/', consultationsController);