// Importamos las dependencias necesarias para el servidor
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './env.js';
import { router } from './src/routes/index.js';

const app = express();

//middlewares
app.use(express.json());
app.use(fileUpload());
app.use(morgan('dev'));

app.use(cors());

// Middlewares de gestion de rutas
// Middleware que indica a express dónde están las rutas.
app.use(router);

// Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

// Middleware de gestión de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

app.listen(PORT || 3000, () => {
  console.log(`Escuchando el puerto ${PORT || 3000}...`);
});
