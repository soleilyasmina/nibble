const db = require('../db');
const Nibble = require('../models/nibble');
const User = require('../models/user');

const createNibbles = async () => {
  const [user] = await User.find({ username: 'bigbite' });
  const nibble = await Nibble.create({
    user_id: user._id,
    content: 'Here is our first nibble!',
  });
  user.nibbles.push(nibble._id);
  await user.save();
};

const seedNibbles = async () => {
  await createNibbles();
  db.close();
};

seedNibbles();
