function route404 (req, res) {
  res.status(404).send({ error: 'Ruta no existente.' });
}

export { route404 };