import { desactivateUserByUserIdModel } from '../../models/users/index.js';
export const desactivateOwnUserController = async (req, res, next) => {
  try {
    // Obtenemos la id del usuario de la request.
    const { id } = req.user;

    // Desactivamos en la bbdd el campo "is_active" del usuario a través de su model
    const user = await desactivateUserByUserIdModel(id);

    // Respondemos con un status ok
    res.status(200).send({
      status: 'ok',
      message: 'Usuario desactivado',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
