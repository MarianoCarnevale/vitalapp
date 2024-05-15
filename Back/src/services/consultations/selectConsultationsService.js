import { consultationsByUserIdModel } from '../../models/consultations/consultationsByUserIdModel.js';

export const selectConsultationsService = async (array_filter, data) => {
  try {
    let array_search_filter = '';

    if (data) {
      if (Object.keys(data).length > 0) {
        //obtener todos los datos de busqueda
        const { word, order } = data;

        //Creamos un array con el filtro Where para el sql
        array_search_filter = `
        AND (doctor.doctor_first_name LIKE '%${word}%'
        OR DS.discipline_name LIKE '%${word}%'
        OR doctor.doctor_last_name LIKE '%${word}%'
        OR U.first_name LIKE '%${word}%'
        OR U.last_name LIKE '%${word}%'
        OR C.severity LIKE '%${word}%'
        OR C.description LIKE '%${word}%'
        OR C.title LIKE '%${word}%')
          `;

        if (order) {
          //Orden de filtro por GROUP BY orden DES/ASC
          array_search_filter.push(`ORDER BY C.created_at ${order}`);
          array_filter = array_filter.join(' ');
        }
      }
      console.log(array_search_filter);
      array_filter = `${array_filter} ${array_search_filter}`;
    }

    const resp = consultationsByUserIdModel(array_filter);
    return resp;
  } catch (error) {
    console.log('Error al insertar en la consulta', error);
    throw error;
  }
};
