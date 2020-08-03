const bcrypt = require('bcrypt');

const { createToken } = require('../helpers');
const { createUserInfoAndPayload } = require('../helpers/user');
const User = require('../models/user');

// POST /register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({
      username,
      email,
      password_digest: password,
    });

    const userInfo = {
      id: user._id,
      username,
      email,
      nibbles: [],
      following: [],
      blocking: [],
      active: true,
    };

    const { nibbles, ...payload } = userInfo;

    const token = createToken(payload);

    return res.status(201).json({ user: userInfo, token });
  } catch (e) {
    return res.status(422).json({ error: e.message });
  }
};

// POST /login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (await bcrypt.compare(password, user.password_digest)) {
      const { payload, userInfo } = createUserInfoAndPayload(user);
      const token = createToken(payload);
      return res.status(200).json({ user: userInfo, token });
    }
    return res.status(401).json({ error: 'Not authorized!' });
  } catch (e) {
    return res.status(401).json({ error: 'Not authorized!' });
  }
};

// GET /verify
const verify = async (req, res) => {
  try {
    const user = await User.findOne({ username: res.locals.user.username });
    const { userInfo } = createUserInfoAndPayload(user);
    return res.status(200).json({ user: userInfo });
  } catch (e) {
    return res.status(401).json({ error: e.message });
  }
};

// PUT /update
const update = async (req, res) => {
  const { id } = res.locals.user;
  await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'No user found!' });
    }
    const { payload, userInfo } = createUserInfoAndPayload(user);
    const token = createToken(payload);
    res.status(200).json({ user: userInfo, token });
  });
};

// DELETE /deactivate
const deactivate = async (req, res) => {
  const { id } = res.locals.user;
  await User.findByIdAndUpdate(id, { active: false }, { new: true }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'No user found!' });
    }
    const { payload, userInfo } = createUserInfoAndPayload(user);
    const token = createToken(payload);
    res.status(200).json({ user: userInfo, token });
  });
};

module.exports = {
  register,
  login,
  verify,
  update,
  deactivate,
};
