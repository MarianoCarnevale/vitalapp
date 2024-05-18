import { generateError } from '../../utils/errors/generateError.js';
import { deleteConsultationFileModel } from '../../models/consultations/deleteConsultationFileModel.js';

export const deleteConsultationFileController = async (req, res) => {
  const { consultation_id } = req.params;
  const user_id = req.user.id;
  try {
    await deleteConsultationFileModel(user_id, consultation_id);
    res
      .status(200)
      .send({ status: 'Success', message: 'Archivo borrado correctamente' });
  } catch (error) {
    throw generateError('No se pudo borrar el archivo', 400);
  }
};
