const User = require('../models/user');
const { createUserInfoAndPayload } = require('../helpers/user');

const follow = async (req, res) => {
  try {
    const { id } = res.locals.user;
    const { user_id } = req.params;
    const follower = await User.findById(id);
    const following = await User.findById(user_id);
    if (!following) {
      return res.status(404).json({ error: 'No user found!' });
    }
    if (follower.following.includes(user_id)) {
      return res.status(400).json({ error: 'Already following!' });
    }
    await User.findByIdAndUpdate(id, { following: [...follower.following, user_id] }, { new: true }, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      const { userInfo } = createUserInfoAndPayload(user);
      return res.status(200).json({ user: userInfo });
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const unfollow = async (req, res) => {
  try {
    const { id } = res.locals.user;
    const { user_id } = req.params;
    const follower = await User.findById(id);
    const following = await User.findById(user_id);
    if (!following) {
      return res.status(404).json({ error: 'No user found!' });
    }
    if (!follower.following.includes(user_id)) {
      return res.status(400).json({ error: 'Not following!' });
    }
    await User.findByIdAndUpdate(id, { following: follower.following.filter((f) => f.toString() !== user_id) }, { new: true }, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      const { userInfo } = createUserInfoAndPayload(user);
      return res.status(200).json({ user: userInfo });
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const block = async (req, res) => {
  try {
    const { id } = res.locals.user;
    const { user_id } = req.params;
    const blocker = await User.findById(id);
    const blocking = await User.findById(user_id);
    if (!blocking) {
      return res.status(404).json({ error: 'No user found!' });
    }
    if (blocker.blocking.includes(user_id)) {
      return res.status(400).json({ error: 'Already blocked!' });
    }
    await User.findById(user_id, {
      following: blocking.following.filter((f) => f.toString() !== user_id),
    });
    await User.findByIdAndUpdate(id, {
      blocking: [...blocker.blocking, user_id],
      following: blocker.following.filter((f) => f.toString() !== user_id), 
    }, { new: true }, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      const { userInfo } = createUserInfoAndPayload(user);
      return res.status(200).json({ user: userInfo });
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const unblock = async (req, res) => {
  try {
    const { id } = res.locals.user;
    const { user_id } = req.params;
    const blocker = await User.findById(id);
    const blocking = await User.findById(user_id);
    if (!blocking) {
      return res.status(404).json({ error: 'No user found!' });
    }
    if (!blocker.blocking.includes(user_id)) {
      return res.status(400).json({ error: 'Not blocked!' });
    }
    await User.findByIdAndUpdate(id, { blocking: blocker.blocking.filter((b) => b.toString() !== user_id) }, { new: true }, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      const { userInfo } = createUserInfoAndPayload(user);
      return res.status(200).json({ user: userInfo });
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const search = async (req, res) => {
  try {
    const { query } = req.body;
    const users = await User.find({ username: new RegExp(query) }, { id: 1, username: 1 });
    return res.status(200).json({ users });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

module.exports = {
  follow,
  unfollow,
  block,
  unblock,
  search,
};
