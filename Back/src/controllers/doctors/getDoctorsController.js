import { getDoctorsModel } from '../../models/doctors/index.js';

export const getDoctorsController = async (req, res, next) => {
  try {
    // Obtener doctores.
    const doctors = await getDoctorsModel();

    // Responder con el tweet.
    res.status(200).send({
      status: 'Ok',
      message: 'All Doctors obtained',
      data: { doctors },
    });
  } catch (error) {
    next(error);
  }
};
