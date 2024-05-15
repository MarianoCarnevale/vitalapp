import { selectDoctorsByDiscipline } from '../../models/doctors/index.js';

export const getDoctorsByDisciplineController = async (req, res, next) => {
  try {
    const { discipline_id } = req.params;

    // Obtener los doctores.
    const doctors = await selectDoctorsByDiscipline(discipline_id);

    // Responder con los doctores
    res.status(200).send({
      status: 'Ok',
      message: 'Doctores por disciplina obtenidos correctamente',
      data: { doctors },
    });
  } catch (error) {
    next(error);
  }
};
