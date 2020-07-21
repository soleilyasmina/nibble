const Nibble = require('../models/nibble');

// GET /nibbles/users/:user_id
const allNibbles = async (req, res) => {
  try {
    const { id } = res.locals.user;

    return res.status(200).json('Reached!');
  } catch (e) {

  }
};


// GET /nibbles
const myNibbles = async (req, res) => {
  try {
    const { id } = res.locals.user;
    return res.status(200).json('Reached!');
  } catch (e) {

  }
}

// GET /nibbles/:nibble_id
const oneNibble = async (req, res) => {
  try {
    return res.status(200).json('Reached!');
  } catch (e) {

  }
};

// POST /nibbles
const newNibble = async (req, res) => {
  try {
    return res.status(200).json('Reached!');
  } catch (e) {

  }
};

// POST /nibbles/:nibble_id
const newBite = async (req, res) => {
  try {
    return res.status(200).json('Reached!');
  } catch (e) {

  }
};

// PUT /nibbles/:nibble_id
const updateNibble = async (req, res) => {
  try { 
    return res.status(200).json('Reached!');
  } catch (e) {

  }
};

// DELETE /nibbles/:nibble_id
const deleteNibble = async (req, res) => {
  try {
    return res.status(200).json('Reached!');
  } catch (e) {

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
