const Projects = require(".././models/Projects");

//! create a new project function
const createProject = async (req, res) => {
  const { name, discription } = req.body;

  //*if there is one field empty
  if (!discription || !name) {
    return res.status(404).json({ message: "please fill all fields" });
  }

  //* if the project is already created
  const isThere = await Projects.findOne({ name });
  if (isThere) {
    return res.status(404).json({ message: "the project is already exists" });
  }

  //*create a new project
  const project = await Projects.create({ name, discription });

  try {
    res
      .status(200)
      .json({ name: project.name, discription: project.discription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//! find a singel project function
const getProject = async (req, res) => {
  //* get the project id from the request params
  const { id: id } = req.params;

  //*find the project form batabase by its id
  const project = await Projects.findOne({ _id: id });
  //* if the is no project by the provided id
  if (!project) {
    return res.status(404).json({ message: "the is no project found" });
  }
  try {
    res.status(200).json({
      name: project.name,
      discription: project.discription,
      projectId: project._id,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//!find all project
const findAllProjects = async (req, res) => {
  //* find all projects from the database
  const projects = await Projects.find();

  //*if the database is empty
  if (!projects) {
    return res.status(404).json({ message: "the is no project found" });
  }

  try {
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//!update project
const updateProject = async (req, res) => {
  const { id: id } = req.params;
  //*find a project by id and update
  const project = await Projects.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  //* if the is no project by the provided id
  if (!project) {
    return res.status(404).json({ message: "the is no project found" });
  }
  try {
    res.status(200).json({ message: "project successfully updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//!delete projects from the database
const deleteProject = async (req, res) => {
  const { id: id } = req.params;
  //* find the project by id and delete it

  const project = await Projects.findByIdAndDelete({ _id: id });

  //* if the is no project by the provided id
  if (!project) {
    return res.status(404).json({ message: "the is no project found" });
  }
  try {
    res.status(200).json({ message: "project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProject,
  findAllProjects,
  deleteProject,
  updateProject,
};
