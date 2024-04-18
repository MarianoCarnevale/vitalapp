// Importamos las dependencias.
import express from 'express';

// Importamos los controladores.
import {
  loginUserController,
  recoverPassController,
  // updatePassController,
} from '../controllers/users/index.js';

// Importamos los middlewares.
// import { authUserController } from '../middlewares/index.js';

// Creamos un router.
export const userRouter = express.Router();

// Login de usuario.
userRouter.post('/users/login', loginUserController);

// Envío de recuperación de código de contraseña.
userRouter.post('/users/recoverpass', recoverPassController);

// // Actualizar contraseña.
// userRouter.put('/users/updatepass', authUserController, updatePassController);
