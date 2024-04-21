// Importamos las dependencias.
import express from 'express';

// Importamos los routers.

import { doctorsRouter } from './doctorsRoutes.js';
import { disciplinesRouter } from './disciplinesRoutes.js';

// Creamos un router y lo exportamos.
export const router = express.Router();

// Usamos los routers de doctors.
router.use(doctorsRouter);
router.use(disciplinesRouter);
