const { Router } = require('express');

const api = Router();

api.get('/', (req, res) => {
  res.send('Welcome to the Nibble API!');
});

module.exports = api;
