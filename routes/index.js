const { Router } = require('express');

const followRouter = require('./follows');
const nibbleRouter = require('./nibbles');
const userRouter = require('./users');

const api = Router();

api.use('/users', followRouter);
api.use('/nibbles', nibbleRouter);
api.use('/auth', userRouter);

api.get('/', (req, res) => {
  res.send('Welcome to the Nibble API!');
});

module.exports = api;
