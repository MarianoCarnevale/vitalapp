import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";
import { updateResponseSchema } from "../../schemas/responses/updateResponseSchema.js";
import { updateResponseService } from "../../services/responses/updateResponseService.js";

export const updateResponseController = async (req, res, next) => {
  try {
    // Obtener el id del usuario.
    const user_id = req.user.id;

    // Obtener el id de la respuesta.
    const { response_id } = req.params;

    // Obtener el contenido de la respuesta.
    const { content } = req.body;

    // Validar el contenido con Joi.
    await validateSchemaUtil(updateResponseSchema, { content });


    // Actualizar la respuesta.
    const response = await updateResponseService(user_id, response_id, content);

    // Enviar una respuesta de éxito.
    res.status(200).send({
      status: 'ok',
      message: 'Respuesta actualizada',
      data: { response },
    });
  } catch (error) {
    next(error);
  }
};

