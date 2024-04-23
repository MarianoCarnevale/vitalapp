import { getAllDisciplinesModel } from '../../models/disciplines/index.js';

export const getAllDisciplinesController = async (req, res, next) => {
  try {
    // obtener todas las especialidades
    const disciplines = await getAllDisciplinesModel();

    // Responder con el tweet.
    res.status(200).send({
      status: 'Ok',
      message: 'All disciplines obtained',
      data: { disciplines },
    });
  } catch (error) {
    next(error);
  }
};
