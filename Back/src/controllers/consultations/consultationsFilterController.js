import { selectConsultations } from '../../models/consultations/index.js';
import { filter } from '../../utils/Filter.js';
import { severityValidation } from '../../utils/severityValidation.js';

export const consultationsFilterController = async (req, res, next) => {
  try {
    //Sacar todos los parametros del body
    const { firstname, last_name, rol, date, severity, speciality } = req.body;

    //Creamos un array con el filtro Where para el sql
    let array_filter = ['WHERE'];

    //Empezamos a añadir filtros sengun existan
    if (rol === 'doctor') {
      filter(array_filter, 'doctor_Name', firstname);
      filter(array_filter, 'doctor_last_name', last_name);
    } else {
      filter(array_filter, 'U.first_name', firstname);
      filter(array_filter, 'U.last_name', last_name);
    }

    filter(array_filter, 'C.severity', severity);
    filter(array_filter, 'speciality', speciality);
    filter(array_filter, 'C.created_at', date);
    //Orden se agrega como GROUP BY orden DES/ASC
    console.log(array_filter);
    //Eliminamos el primer And del array
    array_filter[1] = array_filter[1].slice(5, array_filter[1].length);

    //Unimos todo por espacios
    array_filter = array_filter.join(' ');

    console.log(array_filter);
    //pasamostodos los elementos que iran en la consulta
    //name = name AND last_name = last_name AND order = order

    //recibir datos de la tabla
    const [consultations] = await selectConsultations(array_filter);

    res.status(200).send({
      status: 'Ok',
      message: `Consultations Found`,
      data: consultations,
    });
  } catch (error) {
    next(error);
  }
};
