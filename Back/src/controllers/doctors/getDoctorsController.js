import { getDoctorsModel } from '../../models/doctors/index.js';

export const getDoctorsController = async (req, res, next) => {
  try {
    // Obtener doctores.
    const doctors = await getDoctorsModel();

    // filtrar doctores activos
    const activeDoctors = doctors.filter((doctor) => doctor.is_active);

    res.status(200).send({
      status: 'Ok',
      message: 'All Doctors obtained',
      data: { activeDoctors },
    });
  } catch (error) {
    next(error);
  }
};
