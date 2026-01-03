const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    comments: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
