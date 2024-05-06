import { newConsultationsModel } from '../../models/consultations/index.js';

export const
  newConsultationService = async (data, img) => {
  try {
    // Creamos una id para el tweet.
    data.consultation_id = crypto.randomUUID();

    //Creamos el archivo en la carpeta upload
    const file = FileService(
    user_id,
    consultation_id,
    img,
    100
  );

    await newConsultationsModel(data, file)

  } catch (error) {
    console.log('Error al insertar en la consulta', error);
    throw error;
  }
};
