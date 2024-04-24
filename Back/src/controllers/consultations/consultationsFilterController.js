import { selectConsultations } from "../../models/consultations/index.js";
import { filter } from "../../utils/Filter.js";
import { severityValidation } from "../../utils/severityValidation.js";

export const consultationsFilterController= async (req ,res ,next) => {

  try {
    //Sacar todos los parametros del body
    const  {
    firstname,
    last_name,
    rol,
    date,
    severity,
    speciality
  }  = req.body

  //Creamos un array con el filtro Where para el sql 
  let filtro = ["WHERE"]
  
  //Empezamos a añadir filtros sengun existan 
  if(rol === "doctor"){
    filter(filtro, 'doctor_Name', firstname);
    filter(filtro, 'doctor_last_name', last_name);
  }else{
    filter(filtro, 'U.first_name', firstname);
    filter(filtro, 'U.last_name', last_name);
  }
  
  filter(filtro, 'C.severity', severity);
  filter(filtro, 'speciality', speciality);
  filter(filtro, 'C.created_at', date);
  //Orden se agrega como GROUP BY orden DES/ASC
  
  //Eliminamos el primer And del array
  filtro[1] = filtro[1].slice(5, filtro[1].length)

  //Unimos todo por espacios
  filtro = filtro.join(' ')
  
  console.log(filtro);
  //pasamostodos los elementos que iran en la consulta
  //name = name AND last_name = last_name AND order = order

  //recibir datos de la tabla 
  const [consultations] = await selectConsultations(filtro);

  res.status(200).send({
    status : 'Ok',
    message : `Consultations Found`,
    data : consultations
    })
  } catch (error) {
    next(error);
  }
}