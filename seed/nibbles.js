const db = require('../db');
const Nibble = require('../models/nibble');
const User = require('../models/user');

const createNibbles = async () => {
  const user = await User.find({ username: 'bigbite' });
  await Nibble.create({
    user_id: user[0]._id,
    content: 'Here is our first nibble!',
  });
};

const seedNibbles = async () => {
  await createNibbles();
  db.close();
};

seedNibbles();
