const { model, Schema } = require('mongoose');

const nibbleSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'users' },
    content: { type: String, required: true },
    path: { type: String, default: ',', required: true },
    contentPath: { type: String, default: ',', required: true },
  },
  { timestamps: true },
);

module.exports = model('nibbles', nibbleSchema);
