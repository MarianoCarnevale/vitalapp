import { getDoctorsRankedModel } from '../../models/doctors/index.js';

export const getDoctorsRankedController = async (req, res, next) => {
  try {
    // Obtener doctores.
    const doctors = await getDoctorsRankedModel();

    // responder con los doctores
    res.status(200).send({
      status: 'Ok',
      message: 'Ranking de doctores obtenidos',
      data: { doctors },
    });
  } catch (error) {
    next(error);
  }
};
