import { consultationsByUserIdModel } from '../../models/consultations/consultationsByUserIdModel.js';
import { getOneDisciplineByUserModel } from '../../models/disciplines/getOneDisciplineByUserModel.js';
import { generateError } from '../../utils/errors/generateError.js';

export const consultationsByDisciplineController = async (req, res, next) => {
  try {
    const user_id = req.user.id;
  
    const role = req.user.role;
  
    // conseguir la disciplina del usuario
    const discipline_id = await getOneDisciplineByUserModel(user_id);
    
    let select_info= '';
    let array_filter= '';
    //Busqueda por disciplina del doctor
    if (role === "doctor") {
     select_info = `U.user_id, U.first_name, U.first_surname AS surname,`
     array_filter = `WHERE C.discipline_id = '${discipline_id}'`
    }

    //recibir consultas de la disciplina
    const consultations = await consultationsByUserIdModel(
      select_info, array_filter);

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
