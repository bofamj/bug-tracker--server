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

  //*find if the issue is already existing with the same name
  const isExsisted = await Issue.findOne({ name });
  if (isExsisted) {
    return res.status(400).json({
      message: "there is already an existing issue with the same name",
    });
  }

  //*create a new issue
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
    return res.status(500).json({ message: error.message });
  }
};

//! find all issues
const findAllIssues = async (req, res) => {
  //* find all issues in the datapase
  const issues = await Issue.find();
  //* if there is no issues in the datapase
  if (issues.length === 0) {
    return res
      .status(404)
      .json({ message: "you have no issues open in the datapase" });
  }
  try {
    res.status(200).json(issues);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! find a singel issue
const findIssue = async (req, res) => {
  const { id } = req.params;
  //* if the id is wrong
  if (id.length > 24 || id.length < 24) {
    return res
      .status(404)
      .json({ message: "the id you provide is too short or too long" });
  }
  const issue = await Issue.findOne({ _id: id });

  if (!issue) {
    return res
      .status(404)
      .json({ message: "there is no issue fond with this id" });
  }
  try {
    res.status(200).json(issue);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//! find user issues

const findUserIssue = async (req, res) => {
  const {
    user: { userId },
  } = req;

  try {
    const issues = await Issue.find({ createdBy: userId });
    if (!issues) {
      return res.status(404).send({ message: "you have no issues" });
    }
    res.status(200).json(issues);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//!delete an issue
const deleteIssue = async (req, res) => {
  const { id } = req.params;
  //* if the id is wrong
  if (id.length > 24 || id.length < 24) {
    return res
      .status(404)
      .json({ message: "the id you provide is too short or too long" });
  }
  const issue = await Issue.findByIdAndDelete({ _id: id });
  if (!issue) {
    return res.status(404).json({ message: "the is no issue with this id" });
  }

  try {
    res.status(200).json({ message: "you have successfully  deleted a issue" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//!update a issue
const updateIssue = async (req, res) => {
  const { id } = req.params;
  //* if the id is wrong
  if (id.length > 24 || id.length < 24) {
    return res
      .status(404)
      .json({ message: "the id you provide is too short or too long" });
  }

  const issue = await Issue.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!issue) {
    return res.status(404).json({ message: "the is no issue with this id" });
  }
  try {
    res.status(200).json(issue);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createIssue,
  findAllIssues,
  findIssue,
  deleteIssue,
  updateIssue,
  findUserIssue,
};
