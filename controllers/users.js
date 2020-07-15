const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { SALT_ROUNDS, SECRET } = process.env;

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordDigest = await bcrypt.hash(password, parseInt(SALT_ROUNDS, 10));

    const user = await User.create({
      username,
      email,
      password_digest: passwordDigest,
    });

    const userInfo = {
      id: user._id,
      username,
      email,
      nibbles: [],
    };

    const { nibbles, ...payload } = userInfo;

    const token = jwt.sign(payload, SECRET);

    return res.status(201).json({ user: userInfo, token });
  } catch (e) {
    return res.status(422).json({ error: e.message });
  }
};

const login = async (req, res) => {
  try {

  } catch (e) {

  }
};

const update = async (req, res) => {
  try {

  } catch (e) {

  }
};

const remove = async (req, res) => {
  try {

  } catch (e) {

  }
};

module.exports = {
  register,
  login,
  update,
  remove,
};
