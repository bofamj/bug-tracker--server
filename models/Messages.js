const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    message: {
      type: "string",
      required: [true, "add a your message"],
    },
    writingBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    belongTo: {
      type: mongoose.Types.ObjectId,
      ref: "Issue",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
