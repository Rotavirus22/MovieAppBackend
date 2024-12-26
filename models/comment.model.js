const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment_type: {
      type: String,
      required: [true],
    },
    content_id: {
      type: String,
      required: [true, "Content id is required"],
    },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        username: { type: String, required: true },
        comment: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ]
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;