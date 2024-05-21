import express from 'express';
import {
  newResponseController,
  deleteResponseController,
  getAllResponsesController,
  updateResponseController,
} from '../controllers/responses/index.js';
import {
  authUserController,
  isOwnerController,
  responseExistsController,
} from '../middlewares/index.js';

export const responsesRouter = express.Router();

//Rutas de respuestas

// Crear una respuesta
responsesRouter.post(
  '/responses/:consultation_id',
  authUserController,
  newResponseController
);

// Ver todas las respuestas de una consulta
responsesRouter.get(
  '/responses/:consultation_id',
  authUserController,
  getAllResponsesController
);

// Modificar una respuesta
responsesRouter.put(
  '/responses/:response_id',
  authUserController,
  isOwnerController,
  responseExistsController,
  updateResponseController
);

// Borrar una respuesta
responsesRouter.delete(
  '/consultations/:consultation_id/responses/:response_id',
  authUserController,
  isOwnerController,
  responseExistsController,
  deleteResponseController
);
