const Issue = require(".././models/Issue");

//!create a new Issue

const createIssue = async (req, res) => {
  const {
    name,
    discrption,
    project,
    priority,
    createdBy,
    closedBy,
    resolutionSummary,
    assignedTo,
  } = req.body;
  const issue = await Issue.create({
    name,
    discrption,
    project,
    priority,
    createdBy,
    resolutionSummary,
    assignedTo,
  });

  //* if there is an empty field
  if (!name || !discrption || !project || !createdBy) {
    return res
      .status(400)
      .json({ message: "Missing field you have to fill all fields" });
  }

  //*if the issue has not been created successfully
  if (!issue) {
    return res.status(400).json({ message: "there is some thing wint wrong" });
  }

  try {
    res.status(200).json({
      name,
      discrption,
      project,
      priority,
      createdBy,
      closedBy,
      resolutionSummary,
      assignedTo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createIssue,
};
