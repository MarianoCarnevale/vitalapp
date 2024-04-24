import { selectConsultations } from "../../models/consultations/index.js"
import { generateError } from "../../utils/errors/generateError.js"

export const consultationByUser = async ( req, res, next ) =>{
  try {
    
    const { user_id, doctor_id } = req.params
  
    let filter
    if(user_id){
      filter = `WHERE C.user_id = ${user_id}` 
    }
    if(doctor_id){
      filter = `WHERE doctor.doctorID = ${doctor_id}` 
    }
    const [consusltations] = await selectConsultations(filter)
    if(consusltations.length === 0){
          throw generateError('User not Found',404)
        }
  
    //respuesta con los datos de la tabla
        res.status(200).send({
          status : 'Ok',
          message : `Tabla de consultas de usuario`,
          data : {consusltations}
        })
  } catch (error) {
    next(error)
  }
}