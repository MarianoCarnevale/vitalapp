import { consultationsByUserIdModel } from '../../models/consultations/consultationsByUserIdModel.js';

export const selectConsultationsService = async (array_filter, data) => {
  try {
      // let array_search_filter = '';
      let select_info = '';

      if (data.role === "patient") {
        select_info = `doctor.doctor_id AS doctor_id, doctor.doctor_first_name AS first_name,doctor.doctor_last_name AS last_name,`
      } else {
        select_info = `U.user_id, U.first_name, U.last_name,`
      }

      // if (data) { 
      //   if (Object.keys(data).length > 0) {
          
      //     //obtener todos los datos de busqueda
      //     const { word, order } = data
          
      //     //Creamos un array con el filtro Where para el sql
      //     array_search_filter = `
      //   AND (doctor.doctor_first_name LIKE '%${word}%'
      //   OR DS.discipline_name LIKE '%${word}%'
      //   OR doctor.doctor_last_name LIKE '%${word}%'
      //   OR U.first_name LIKE '%${word}%'
      //   OR U.last_name LIKE '%${word}%'
      //   OR C.severity LIKE '%${word}%'
      //   OR C.description LIKE '%${word}%'
      //   OR C.title LIKE '%${word}%')
      //     `;
          
      //     if (order) { 
      //       //Orden de filtro por GROUP BY orden DES/ASC
      //       array_search_filter.push(`ORDER BY C.created_at ${order}`);
      //       array_filter = array_filter.join(' ');
      //     } 
      //   }
      //   array_filter = `${array_filter}`
      // }
    
      const resp = consultationsByUserIdModel(select_info, array_filter);
      
      console.log(resp);
    return resp

  } catch (error) {
    console.log('Error al insertar en la consulta', error);
    throw error;
  }
};
