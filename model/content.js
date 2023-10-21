const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentsSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
    caption: String,
    hashtags: [String],
    category: String,
    thumbnailUrl: String,
    contentUrl: String,
    comments: [
      {
        comment: String,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        timestamp: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", contentsSchema);
