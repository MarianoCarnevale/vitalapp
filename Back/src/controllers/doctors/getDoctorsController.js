import { getDoctorsModel } from '../../models/doctors/index.js';

export const getDoctorsController = async (req, res, next) => {
  try {
    // Obtener doctores.
    const doctors = await getDoctorsModel();

    // responder con los doctores
    res.status(200).send({
      status: 'Ok',
      message: 'Todos los doctores obtenidos correctamente',
      data: { doctors },
    });
  } catch (error) {
    next(error);
  }
};
