const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "add a name for the issue"],
    },
    discrption: {
      type: "string",
      required: [true, "you most add a description "],
      minlength: 10,
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Projects",
      required: [true, "avry issue most bilong to a project"],
    },
    priority: {
      type: "string",
      required: true,
      default: "max",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    closedBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    resolutionSummary: {
      type: "string",
    },
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", IssueSchema);
