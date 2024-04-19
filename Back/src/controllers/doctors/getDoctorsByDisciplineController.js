import { selectDoctorsByDiscipline } from '../../models/doctors/index.js';

export const getDoctorsByDisciplineController = async (req, res, next) => {
  try {
    const { discipline_id } = req.params;

    // Obtener el doctor.
    const doctors = await selectDoctorsByDiscipline(discipline_id);

    // Responder con el tweet.
    res.status(200).send({
      status: 'Ok',
      message: 'Doctors obtained',
      data: { doctors },
    });
  } catch (error) {
    next(error);
  }
};
