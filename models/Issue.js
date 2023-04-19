const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "add a name for the issue"],
      unique: [true, "there is already an existing issue with the same name"],
    },

    discrption: {
      type: "string",
      required: [true, "you most add a description "],
      minlength: 10,
    },
    project: {
      type: "string",
      ref: "Projects",
    },
    priority: {
      type: "string",
      required: true,
      default: "max",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    closedBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    resolutionSummary: {
      type: "string",
    },
    assignedTo: {
      type: "string",
      ref: "user",
    },
    issueStatus: {
      type: "string",
      default: "Pinding",
    },
    version: {
      type: "string",
    },
    message: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", IssueSchema);
