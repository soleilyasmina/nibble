const { Router } = require('express');

const userRouter = Router();

userRouter.post('/register', (req, res) => res.json('Register reached!'));
userRouter.post('/login', (req, res) => res.json('Login reached!'));
userRouter.put('/update', (req, res) => res.json('Update reached!'));
userRouter.delete('/remove', (req, res) => res.json('Remove reached!'));

module.exports = userRouter;
