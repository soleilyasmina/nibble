const { model, Schema } = require('mongoose');

const nibbleSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'users' },
    content: { type: String, default: '' },
    ancestors: [{ type: Schema.Types.ObjectId, default: [], required: true }],
    contentAncestors: [{ type: Schema.Types.ObjectId, default: [], required: true }],
  },
  { timestamps: true },
);

module.exports = model('nibbles', nibbleSchema);
