// Importamos las dependencias.
import express from 'express';

// Importamos los controladores.
import {
  newUserController,
  validateUserController,
  loginUserController,
  recoverPassController,
  updatePassController,
  updateUserController,
} from '../controllers/users/index.js';

// Importamos los middlewares.
import {
  authUserController,
  userExistsController,
} from '../middlewares/index.js';

// Creamos un router.
export const userRouter = express.Router();

// Crear un usuario pendiente de activar.
userRouter.post('/users/register', newUserController);

// Validar a un usuario.
userRouter.put('/users/validate/:validation_code', validateUserController);

// Login de usuario.
userRouter.post('/users/login', loginUserController);

// Envío de recuperación de código de contraseña.
userRouter.post('/users/recoverpass', recoverPassController);

// Actualizar contraseña.
userRouter.put('/users/update/:recovery_code', updatePassController);

// Actualizar informamción de usuario
userRouter.put(
  '/users/update',
  authUserController,
  userExistsController,
  updateUserController
);
