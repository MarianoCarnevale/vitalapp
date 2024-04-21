import { selectConsultationsByFilter } from "../../models/consultations/index.js";
import { filter } from "../../utils/Filter.js";
import { severityValidation } from "../../utils/severityValidation.js";

export const consultationsFilterController= async (req ,res ,next) => {

  try {
    //Sacar todos los parametros del body
    const  {
    username,
    name,
    last_name,
    user_type,
    severity,
    speciality,
    order
  }  = req.body

    
  //Creamos un array vacio 
  let filtro = []

  //Empezamos a añadir filtros sengun existan 
  filter(filtro, 'username', username);
  filter(filtro, 'firtsname', firstname);
  filter(filtro, 'lastname', last_name);
  filter(filtro, 'user_type', user_type);
  filter(filtro, 'severity', severity);
  filter(filtro, 'speciality', speciality);
  //Orden se agrega como GROUP BY orden DES/ASC
  
  //Eliminamos el primer And del array
  filtro = filtro.slice(1,filtro.length)

  //Unimos todo por espacios
  filtro = filtro.join(' ')
  
  //pasamostodos los elementos que iran en la consulta
  //name = name AND last_name = last_name AND order = order

  //recibir datos de la tabla 
  const [consultations] = await selectConsultationsByFilter(filtro);

  res.status(200).send({
    status : 'Ok',
    message : `Consultations Found`,
    data : consultations
    })
  } catch (error) {
    next(error);
  }
}