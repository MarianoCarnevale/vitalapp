import express from 'express';
import { newResponseController, getSingleResponseController, deleteResponseController } from '../controllers/responses/index.js';
import { authUserController, responseExistsController } from '../middlewares/index.js'

export const responsesRouter = express.Router();

//Rutas de respuestas

// Crear una respuesta
responsesRouter.post('/responses', authUserController, newResponseController);
// responsesRouter.post('/consultations/:consultationId/responses', authUserController, newResponseController);

//Ver una respuesta a una consulta de un usuario/doctor(propia)
responsesRouter.get('/responses/:responseId', authUserController, responseExistsController, getSingleResponseController);
// responsesRouter.get('/consultations/consultationId/:doctorId?userId/responses/:responseId', authUserController, responseExistsController, getSingleResponseController);

//Ver una respuesta a una consulta de una especialidad (doctor)
responsesRouter.get('/responses/:responseId', authUserController, responseExistsController, getSingleResponseController);
// responsesRouter.get('/consultations/consultationId/:doctorId/responses/:responseId', authUserController, responseExistsController, getSingleResponseController);

// Borrar una respuesta
responsesRouter.delete('/responses/:responseId', authUserController, responseExistsController, deleteResponseController);
// responsesRouter.delete('/consultations/:consultationId/responses/:responseId', authUserController, deleteResponseController);