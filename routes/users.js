const { Router } = require('express');
const {
  register, login, verify, update, remove
} = require('../controllers/users');
const { restrict } = require('../helpers');

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/verify', restrict, verify);
userRouter.put('/update', restrict, update);
userRouter.delete('/remove', (req, res) => res.json('Remove reached!'));

module.exports = userRouter;
