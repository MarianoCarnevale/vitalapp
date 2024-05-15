import { getAllDisciplinesWithDoctorsModel } from '../../models/disciplines/index.js';

export const getAllDisciplinesWithDoctorsController = async (
  req,
  res,
  next
) => {
  try {
    // obtener todas las especialidades
    const disciplines = await getAllDisciplinesWithDoctorsModel();

    // Responder con las disciplinas.
    res.status(200).send({
      status: 'Ok',
      message: 'All disciplines obtained',
      data: { disciplines },
    });
  } catch (error) {
    next(error);
  }
};
