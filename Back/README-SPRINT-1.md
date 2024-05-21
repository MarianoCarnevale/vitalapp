# vitalApp

## Descripción de la aplicación

vitalApp es una aplicación web creada para generar un sistema de consultas médicas, donde un paciente puede generar consultas a doctores o especialdades, y los doctores responder a estas consultas, y poder comunicarse a través de estas con los pacientes que realizan esa consulta.

## Backend

Para la implementación del Backend para nuestra aplicación, utilizamos Node.js a través de su librería Express y una serie de dependencias extras para su funcionamiento. Una vez el server está completamente equipado, procedemos a crear una serie de controladores y middlewares para los siguientes endpoints:

- Controlador para endpoint registro de usuario.
- Controlador para endpoint validación de usuario.
- Controlador para endpoint login de usuario.
- Controlador para endpoint recuperación de contraseña.
- Controlador para endpoint cambio de contraseña.
- Controlador para endpoint actualizar información de usuario.
- Middleware para la autenticación de usuario.
- Controlador para endpoint de listado total de doctores.
- Controlador para endpoint para la información de un solo doctor.
- Controlador para endpoint de listado total de especialidades.
- Controlador para endpoint para creación de una consulta.
- Controlador para endpoint para eliminar una consulta.
- Controlador para endpoint para crear una respuesta a una consulta.
- Controlador para endpoint para obtener todas las respuestas de una consulta.
- Controlador para endpoint para modificar respuesta propia.
- Controlador para endpoint para eliminar respuesta propia.
- Controlador para endpoint de listado de consultas con filtro/búsqueda y ordenación.
- Controlador para endpoint de visualización de una consulta.
