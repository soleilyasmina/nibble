const { model, Schema } = require('mongoose');

const nibbleSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'users' },
    content: { type: String, default: '' },
    ancestors: [{ type: Schema.Types.ObjectId, default: [], required: true, index: true }],
    contentAncestors: [{ type: Schema.Types.ObjectId, default: [], required: true }],
  },
  { timestamps: true },
);

nibbleSchema.methods.tree = function tree() {
  let source;
  if (!this.ancestors.length) {
    source = this.id;
  } else {
    source = this.ancestors[0].id;
  }
  return model('nibbles').find({ ancestors: source }, { id: 1, user_id: 1 }).populate('user_id', { id: 1, username: 1 }).lean();
};

module.exports = model('nibbles', nibbleSchema);
