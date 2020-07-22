const db = require('../db');
const User = require('../models/user');

const createUsers = async () => {
  await User.create({
    username: 'bigbite',
    email: 'bigbite@email.com',
    password_digest: 'honkletons',
  });
};

const seedUsers = async () => {
  await createUsers();
  db.close();
};

seedUsers();
