# vitalApp

## Backend

Para la implementación del Backend para nuestra aplicación, utilizamos Node.js a través de su librería Express y una serie de dependencias extras para su funcionamiento. Una vez el server está completamente equipado, procedemos a crear una serie de controladores y middlewares para los siguientes endpoints:

### Controladores

- Controlador para endpoint registro de usuario:
    "http://localhost:4000/users/register"
- Controlador para endpoint validación de usuario:
    "http://localhost:4000/users/validate/d6723cc8-e6bf-4d9e-ad77-7fb499ef66d7"
- Controlador para endpoint login de usuario:
    "http://localhost:4000/users/login"
- Controlador para endpoint recuperación de contraseña:
    "http://localhost:4000/users/recoverpass"
- Controlador para endpoint cambio de contraseña:
    "http://localhost:4000/users/update/841eb058-333d-42c1-b3c4-6fbb326142a3"
- Controlador para endpoint actualizar información de usuario:
    "http://localhost:4000/users/6481ea90-cf95-4e3f-90db-699b8c2717af"
- Controlador para endpoint de listado total de doctores:
    "http://localhost:4000/doctors"
- Controlador para endpoint para la información de un solo doctor:
    "http://localhost:4000/doctor/de001abf-542d-473c-8654-fcc5dd89bdf4"
- Controlador para endpoint de listado total de especialidades:
    "http://localhost:4000/disciplines"
- Controlador para endpoint para creación de una consulta:
    "http://localhost:4000/consultations/"
- Controlador para endpoint para eliminar una consulta:
    "http://localhost:4000/consultations/:consultation_id"
- Controlador para endpoint para crear una respuesta a una consulta:
    "http://localhost:4000/responses/:consultation_id"
- Controlador para endpoint para obtener todas las respuestas de una consulta:
    "http://localhost:4000/responses/:consultation_id"
- Controlador para endpoint para modificar respuesta propia:
    "http://localhost:4000/responses/:response_id"
- Controlador para endpoint para eliminar respuesta propia:
    "http://localhost:4000/consultations/:consultation_id/responses/:response_id"
- Controlador para endpoint de listado de consultas con filtro/búsqueda y ordenación:
    "http://localhost:4000/consultations/search/consultation/"
- Controlador para endpoint de visualización de una consulta:
    "http://localhost:4000/consultations/:consultation_id"

### Middlewares

- Middleware para la autenticación de usuario:
    Back>src>middlewares>authUserController.js
- Middleware para la comprobación de usuario existente:
    Back>src>middlewares>userExistsController.js
- Middleware para la comprobación de respuesta existente:
    Back>src>middlewares>responseExistsController.js
- Middleware para la comprobación de valoración existente:
    Back>src>middlewares>ratingExistsController.js