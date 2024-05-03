import express from 'express'
import { deleteRatingController, newRatingController, ratingsController, updateRatingController } from '../controllers/ratings/index.js';
import { ratingsExistsController } from '../middlewares/index.js';

export const ratingsRoutes = express.Router();

ratingsRoutes.get('/ratings/', ratingsController);

ratingsRoutes.get('/ratings/:response_id', ratingsController);

ratingsRoutes.get('/ratings/:response_id/user/:user_id', ratingsController);

ratingsRoutes.delete('/ratings/:rating_id', deleteRatingController);

ratingsRoutes.put('/ratings/:rating_id', ratingsExistsController, updateRatingController);

ratingsRoutes.post('/ratings/', newRatingController);
