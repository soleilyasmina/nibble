const { Router } = require('express');
const {
  register, login, verify, update, remove
} = require('../controllers/users');
const { restrict } = require('../helpers');

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/verify', restrict, verify);
userRouter.put('/update', (req, res) => res.json('Update reached!'));
userRouter.delete('/remove', (req, res) => res.json('Remove reached!'));

module.exports = userRouter;
