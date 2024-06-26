import { newResponseSchema } from '../../schemas/responses/newResponseSchema.js';
import { insertResponseService } from '../../services/responses/insertResponseService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const newResponseController = async (req, res, next) => {
  try {
    // Obtengo la id del usuario.
    const user_id = req.user.id;

    const role = req.user.role;

    // Obtengo la consulta.
    const { consultation_id } = req.params;
    // Obtengo el contenido.
    const { content } = req.body;

    // Validar el body con el esquema newResponseSchema.
    await validateSchemaUtil(newResponseSchema, { content });

    // Insertar la respuesta en la base de datos.
    const response = await insertResponseService(
      consultation_id,
      user_id,
      content,
      role
    );

    // Responder al cliente.
    res.status(201).send({
      status: 'ok',
      message: 'Respuesta creada',
      data: { response },
    });
  } catch (error) {
    next(error);
  }
};
