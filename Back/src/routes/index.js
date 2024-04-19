// Importamos las dependencias.
import express from 'express';

// Importamos los routers.
import { userRouter } from './userRoutes.js';

// Creamos un router y lo exportamos.
export const router = express.Router();

// Usamos los routers de usuarios.
router.use(userRouter);
