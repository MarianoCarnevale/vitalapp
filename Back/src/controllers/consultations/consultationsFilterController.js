import { selectConsultationsByFilter } from "../../models/consultations/index.js";
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
  let filter = []

  //Empezamos a añadir filtros sengun existan 
  if(username){
    filter.push(' AND ',`username = ${username}`)};
  if(name){
    filter.push(' AND ',`name = ${name}`) };
  if(last_name){
    filter.push(' AND ',`last_name = ${last_name}`) };
  if(user_type){
    filter.push(' AND ',`user_type = ${user_type}`) };
  if(severity){
    severityValidation(severity)
    filter.push(' AND ',`severity = ${severity}`)};
  if(speciality){
    filter.push(' AND ',`speciality = ${speciality}`) };
  if(order){
    filter.push(' AND ',`order = ${order}`) };
  
  //Eliminamos el primer And del array
  filter = filter.slice(1,filter.length)

  //Unimos todo por espacios
  filter = filter.join(' ')
  
  //pasamostodos los elementos que iran en la consulta
  //name = name AND last_name = last_name AND order = order

  //recibir datos de la tabla 
  const [consultations] = await selectConsultationsByFilter(filter);

  res.status(200).send({
    status : 'Ok',
    message : `Consultations Found`,
    data : consultations
    })
  } catch (error) {
    next(error);
  }
}