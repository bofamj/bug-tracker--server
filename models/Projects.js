const mongoose = require("mongoose");

const ProjectsSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
      unique: true,
      minlength: 3,
    },
    discription: { type: "string", required: true, minlength: 10 },
    issues: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Issue",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Projects", ProjectsSchema);
