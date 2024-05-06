import { selectConsultationsModel } from '../../models/consultations/index.js';
import { generateError } from '../../utils/errors/generateError.js';
import { filter } from '../../utils/Filter.js';

const Seacrh = (data) => { 
  
  let array_filter

  if (Object.keys(data).length > 0) {
    
    //obtener todos los datos de busqueda
    const { firstname, last_name, rol, date, severity, speciality, order } = data

    //Creamos un array con el filtro Where para el sql
    array_filter = ['WHERE'];
  
    //Empezamos a añadir filtros sengun existan   
    if (rol === 'doctor') {
      
      //Busqueda por doctor
      filter(array_filter, 'doctor_Name', firstname);
      filter(array_filter, 'doctor_last_name', last_name);
  
    } else {
  
      //Busqueda por paciente
      filter(array_filter, 'U.first_name', firstname);
      filter(array_filter, 'U.last_name', last_name);
  
    }
  
    //Busquedas en comun
    filter(array_filter, 'C.severity', severity);
    filter(array_filter, 'speciality', speciality);
    filter(array_filter, 'C.created_at', date);
    //Orden de filtro por GROUP BY orden DES/ASC
     
    array_filter.push(`ORDER BY ${order}`);
    
    //Eliminamos el primer And del array
    array_filter[1] = array_filter[1].slice(5, array_filter[1].length);
    
    //Unimos todo por espacios
    array_filter = array_filter.join(' ');

  }
  
  return array_filter;
}

export const consultationsController = async (req, res, next) => {
  try {
    //Si se necesita una consulta especifica
    const { doctor_id, consultation_id } = req.params

    const { user_id } = req.user
    //Obtenemos todos los datos de la busqueda por filtro
    const data = req.body;

    let array_filter
    
    //Busqueda segun usuario
    if (user_id) {
      array_filter = `WHERE C.user_id = '${user_id}'`;
    }
    if (doctor_id) {
      array_filter = `WHERE doctor.doctor_id = '${doctor_id}'`;
    }

    //Busqueda por filtro

    if (data) {

      //Funcion que devuelve un where con todos los filtros
      array_filter = Seacrh(data);

    } 

    //recibir datos de la tabla
    const [consultations] = await selectConsultationsModel(array_filter);

    if (consultations.length === 0) {
      throw generateError('Consulta no encontrada', 404);
    }

    res.status(200).send({
      status: 'Ok',
      message: `Tabla de consultas`,
      data: { consultations },
    });


  } catch (error) {
    next(error);
  }
};
