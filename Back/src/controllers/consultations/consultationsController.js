import { selectConsultations } from "../../models/consultations/index.js"

export const consultationsController = async (req , res, next) => {
  try {
    
    //Si se necesita una consulta especifica
    const consultation_id = await req.body.consultation_id
    
    if(!!consultation_id){
      //Recibir datos de la tabla con query de id
      const [consultations] = await selectConsultations(`WHERRE consultation_id = ${consultation_id}`);

    }else{
      //recibir datos de la tabla
      const [consultations] = await selectConsultations();
  
      //respuesta con los datos de la tabla
      res.status(200).send({
        status : 'Ok',
        message : 'Tabla de consultas',
        data : {consultations}
      })
    }

  } catch (error) {
    next(error);
  }
}