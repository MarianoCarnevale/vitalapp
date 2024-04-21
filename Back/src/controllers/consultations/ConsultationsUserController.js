import { selectConsultationsAndUserInfo } from "../../models/consultations/selectConsultationsPatient";
import { filter } from "../../utils/Filter";

export const ConsultationsAndUserInfoController = async ( req, res, next) => {

  //sacamos el user_id de la url /consultations/:user_id
  const user_id = req.params.user_id;

  //desectruturamos datos de filtro 
  //Nota: order es un objeto que pasa {dato , way(decresiente o ascendiente)}
  const {
    firstname, 
    last_tname, 
    date, 
    severity, 
    user_type, 
    speciality, 
    order
  } = req.body;
  const {data, way} = order;

  //Array que contendra todas las condiciones del where de la consulta
  let filtro = []

  //Añadimos un AND condicion = dato al array filter
  filter(filtro, 'firtsname', firstname);
  filter(filtro, 'lastname', last_tname);
  filter(filtro, 'date', date);
  filter(filtro, 'severity', severity);
  filter(filtro, 'user_type', user_type);
  filter(filtro, 'speciality', speciality);

  //Eliminamos el primer And del array
  filtro = filtro.slice(1,filtro.length)

  //Unimos todo por espacios
  filtro = filtro.join(' ')

  //Consultar datos a base de datos
  const [consultations] = selectConsultationsAndUserInfo( user_id, user_type, data, way, filtro)

  res.status(200).send({
    status: 'ok',
    message: `Consultas del ${user_type} ${firstname}`,
    data: consultations
  })
}