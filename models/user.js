const { model, Schema } = require('mongoose');
const { hashSync } = require('bcrypt');
require('dotenv').config();

const { SALT_ROUNDS } = process.env;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_digest: { type: String, required: true, min: [6, 'Password too short!'] },
    nibbles: [{ type: Schema.Types.ObjectId, ref: 'nibbles' }],
    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

userSchema.pre('save', function () {
  if (!this.isModified('password_digest')) return next();
  this.password_digest = hashSync(this.password_digest, parseInt(SALT_ROUNDS, 10));
  next();
});

userSchema.pre('findOneAndUpdate', async function () {
  const doc = await this.model.findOne(this.getQuery());

  if (this._update.password_digest && doc.password_digest !== this._update.password_digest) {
    this._update.password_digest = hashSync(this._update.password_digest, parseInt(SALT_ROUNDS, 10));
  }
});

module.exports = model('users', userSchema);
