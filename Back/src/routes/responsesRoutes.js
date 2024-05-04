import express from 'express';
import {
  newResponseController,
  deleteResponseController,
  getAllResponsesController,
  updateResponseController,
} from '../controllers/responses/index.js';
import {
  authUserController,
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
responsesRouter.get('/responses/:consultation_id', getAllResponsesController);

// Modificar una respuesta
responsesRouter.put(
  '/responses/:response_id',
  responseExistsController,
  updateResponseController
);

//Ver una respuesta a una consulta de un usuario/doctor(propia)
// responsesRouter.get('/responses/:responseId', responseExistsController, getSingleResponseController);

// Borrar una respuesta
responsesRouter.delete(
  '/consultations/:consultation_id/responses/:response_id/',
  authUserController,
  responseExistsController,
  deleteResponseController
);
