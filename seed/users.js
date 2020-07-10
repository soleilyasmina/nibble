const db = require('../db');
const User = require('../models/user');

const createUsers = async () => {
  await User.create({
    username: 'bigbite',
    email: 'bigbite@email.com',
  });
};

const seedUsers = async () => {
  await createUsers();
  db.close();
};

seedUsers();
