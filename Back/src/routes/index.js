// Importamos las dependencias.
import express from 'express';

// Importamos los routers.

import { doctorsRouter } from './doctorsRoutes.js';
import { disciplinesRouter } from './disciplinesRoutes.js';
import { userRouter } from './userRoutes.js';
import { consultationsRouter } from './consultationsRoutes.js';
import { responsesRouter } from './responsesRoutes.js';
import { ratingsRoutes } from './ratingsRoutes.js';


// Creamos un router y lo exportamos.
export const router = express.Router();

// Usamos los routers de doctors.
router.use(doctorsRouter);
router.use(disciplinesRouter);

// Usamos los routers de usuarios.
router.use(userRouter);

// Usamos los routers de consultas.
router.use(consultationsRouter);

// Usamos los routers de respuestas.
router.use(responsesRouter);

//Usamos los routers de valoraciones
router.use(ratingsRoutes)