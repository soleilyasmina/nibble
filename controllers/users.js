const bcrypt = require('bcrypt');

const { createToken } = require('../helpers');
const User = require('../models/user');

const { SALT_ROUNDS } = process.env;

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

    const token = createToken(payload);

    return res.status(201).json({ user: userInfo, token });
  } catch (e) {
    return res.status(422).json({ error: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (await bcrypt.compare(password, user.password_digest)) {
      const userInfo = {
        username: user.username,
        email: user.email,
        nibbles: user.nibbles,
        id: user._id,
      };

      const { nibbles, ...payload } = userInfo;
      const token = createToken(payload);

      return res.status(200).json({ user: userInfo, token });
    }
    return res.status(401).json({ error: 'Not authorized!' });
  } catch (e) {
    return res.status(401).json({ error: 'Not authorized!' });
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
