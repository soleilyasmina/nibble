const { Router } = require('express');

const nibbleRouter = require('./nibbles');
const userRouter = require('./users');

const api = Router();

api.use('/nibbles', nibbleRouter);
api.use('/auth', userRouter);

api.get('/', (req, res) => {
  res.send('Welcome to the Nibble API!');
});

module.exports = api;
