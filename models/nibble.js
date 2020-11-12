const { model, Schema } = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const nibbleSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "users" },
    content: { type: String, default: "" },
    ancestors: [
      { type: Schema.Types.ObjectId, default: [], required: true, index: true },
    ],
    contentAncestors: [
      { type: Schema.Types.ObjectId, default: [], required: true },
    ],
    parent: { type: Schema.Types.ObjectId, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

nibbleSchema.methods.tree = function tree() {
  let source;
  if (!this.parent) {
    source = this.id;
  } else {
    source = this.ancestors[0]._id;
  }
  return model("nibbles")
    .find({ ancestors: source }, { id: 1, user_id: 1, parent: 1 })
    .populate("user_id", { id: 1, username: 1 })
    .populate({
      path: "parent",
      select: { username: 1, id: 1, user_id: 1 },
      populate: {
        path: "user_id",
        select: { username: 1 }
      }
    })
    .lean();
};

nibbleSchema.plugin(mongooseLeanVirtuals);

module.exports = model("nibbles", nibbleSchema);
