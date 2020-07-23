const Nibble = require('../models/nibble');
const User = require('../models/user');

// GET /nibbles/users/:user_id
const allNibbles = async (req, res) => {
  try {
    const nibbles = await Nibble
      .find({ user_id: req.params.user_id })
      .populate('ancestors')
      .populate('contentAncestors');
    return res.status(200).json({ nibbles });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

// GET /nibbles
const myNibbles = async (req, res) => {
  try {
    const { id } = res.locals.user;
    const nibbles = await Nibble
      .find({ user_id: id })
      .populate('ancestors')
      .populate('contentAncestors');
    return res.status(200).json({ nibbles });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

// GET /nibbles/:nibble_id
const oneNibble = async (req, res) => {
  try {
    const nibble = await Nibble
      .findById(req.params.nibble_id)
      .populate('ancestors')
      .populate('contentAncestors');
    return res.status(200).json({ nibble });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

// POST /nibbles
const newNibble = async (req, res) => {
  try {
    const nibble = await Nibble.create({ ...req.body, user_id: res.locals.user.id });
    const user = await User.findById(res.locals.user.id);
    user.nibbles.push(nibble._id);
    return res.status(200).json({ nibble });
  } catch (e) {
    return res.status(422).json({ error: e.message });
  }
};

// POST /nibbles/:nibble_id
const newBite = async (req, res) => {
  try {
    const nibble = await Nibble.findById(req.params.nibble_id);
    const bite = {
      content: req.body.content,
      user_id: res.locals.user.id,
      ancestors: [...nibble.ancestors, nibble.id],
      contentAncestors: nibble.content
        ? [...nibble.contentAncestors, nibble.id]
        : nibble.contentAncestors,
    };
    const createdBite = await Nibble.create(bite);
    const user = await User.findById(res.locals.user.id);
    user.nibbles.push(createdBite._id);
    await user.save();
    return res.status(200).json(createdBite);
  } catch (e) {
    return res.status(422).json({ error: e.message });
  }
};

// PUT /nibbles/:nibble_id
const updateNibble = async (req, res) => {
  try {
    await Nibble.findByIdAndUpdate(req.params.nibble_id, req.body, { new: true, validate: true }, (err, nibble) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!nibble) {
        return res.status(404).json({ error: 'Nibble not found!' });
      }
      res.status(200).json({ nibble });
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

// DELETE /nibbles/:nibble_id
const deleteNibble = async (req, res) => {
  try {
    return res.status(200).json('Reached!');
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  allNibbles,
  myNibbles,
  oneNibble,
  newNibble,
  newBite,
  updateNibble,
  deleteNibble,
};
