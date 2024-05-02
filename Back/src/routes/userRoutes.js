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
  updateUserAvatarController,
  getOwnUserController,
} from '../controllers/users/index.js';

// Importamos los middlewares.
import {
  authUserController,
  userExistsController,
} from '../middlewares/index.js';

// Creamos un router.
export const userRouter = express.Router();

// Obtener perfil privado de un usuario.
userRouter.get(
  '/users',
  authUserController,
  userExistsController,
  getOwnUserController
);

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

// Editar el avatar de un usuario.
userRouter.put(
  '/users/avatar',
  authUserController,
  userExistsController,
  updateUserAvatarController
);

// Actualizar informamción de usuario
userRouter.put(
  '/users/update',
  authUserController,
  userExistsController,
  updateUserController
);
