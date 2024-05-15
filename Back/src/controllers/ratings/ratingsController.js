import { selectRatingsModel } from "../../models/ratings/selectRatingsModel.js"
import { filter } from "../../utils/Filter.js"

export const ratingsController = async (req, res , next) => {
  try {
    const user_id = req.user.id;

    const { response_id } = req.params;

    //crear array de filtro para el where
    let array_filter = ['WHERE']

    //asignar filtros a traves de la funcion filter si existen
    if (response_id) { 

      //agregar and response_id = "response_id"
      filter(array_filter, 'response_id', response_id)
    }
    if (user_id) {
      
      //agregar and user_id = "user_id"
      filter(array_filter, 'user_id', user_id)
      
    } if (array_filter.length === 1) {

      //si no hay parametros el fitro esta vacio
      array_filter = []

    } else {

      //eliminar el primer and 
      array_filter[1] = array_filter[1].slice(5, array_filter[1].length);
    }

    //unir el array para completar el where 
    array_filter = array_filter.join(' ');

    // consulta a la base de datos
    const ratings = await selectRatingsModel(array_filter);
    res.status(200).send({
      status: 'Ok',
      message: 'Valoración encontrada',
      data: ratings
    })

  } catch (error) {
    next(error)
  }
}