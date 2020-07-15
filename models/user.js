const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_digest: { type: String, required: true },
    nibbles: [{ type: Schema.Types.ObjectId, ref: 'nibbles' }],
  },
  { timestamps: true },
);

module.exports = model('users', userSchema);
