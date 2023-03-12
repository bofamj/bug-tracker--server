const express = require("express");
const router = express.Router();
const {
  createProject,
  getProject,
  findAllProjects,
  deleteProject,
  updateProject,
} = require("../controler/projects");

router.route("/project").post(createProject).get(findAllProjects);
router
  .route("/project/:id")
  .get(getProject)
  .delete(deleteProject)
  .patch(updateProject);

module.exports = router;
