import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PORT } from './env.js';
import { route404 } from './src/controllers/errors/route404.js';

const app = express();

app.use(cors())

// middleware 404
app.use('*', route404);

app.listen(PORT || 3000, () => {
  console.log(`Escuchando el puerto ${PORT || 3000}...`);
});