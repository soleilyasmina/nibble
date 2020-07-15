const { Router } = require('express');
const {
  register, login, update, remove
} = require('../controllers/users');

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', (req, res) => res.json('Login reached!'));
userRouter.put('/update', (req, res) => res.json('Update reached!'));
userRouter.delete('/remove', (req, res) => res.json('Remove reached!'));

module.exports = userRouter;
