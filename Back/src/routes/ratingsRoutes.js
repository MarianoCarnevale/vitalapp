import express from 'express';
import {
  deleteRatingController,
  newRatingController,
  ratingsController,
  updateRatingController,
} from '../controllers/ratings/index.js';
import {
  authUserController,
  ratingsExistsController,
} from '../middlewares/index.js';

export const ratingsRoutes = express.Router();

// crear una valoración a una respuesta
ratingsRoutes.post(
  '/ratings/:response_id',
  authUserController,
  newRatingController
);

ratingsRoutes.get('/ratings/:response_id', ratingsController);

// conseguir la valoracion de la respuesta
ratingsRoutes.get(
  '/ratings/:response_id',
  authUserController,
  ratingsController
);

ratingsRoutes.delete('/ratings/:rating_id', deleteRatingController);

// // modificar la valoración propia del usuario
// ratingsRoutes.put('/ratings/:rating_id', authUserController, ratingsExistsController, updateRatingController);
