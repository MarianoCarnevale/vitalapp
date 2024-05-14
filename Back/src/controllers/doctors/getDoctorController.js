import { getDoctorModel } from '../../models/doctors/index.js';

export const getDoctorController = async (req, res, next) => {
  try {
    const { doctor_id } = req.params;

    // obtener el doctor
    const doctor = await getDoctorModel(doctor_id);

    // Responder.
    res.status(200).send({
      status: 'Ok',
      message: 'Doctor obtained',
      data: { doctor },
    });
  } catch (error) {
    next(error);
  }
};
