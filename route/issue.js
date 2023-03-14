const express = require("express");
const router = express.Router();

const {
  createIssue,
  findAllIssues,
  findIssue,
  deleteIssue,
  updateIssue,
} = require(".././controler/issue");

router.route("/issue").post(createIssue).get(findAllIssues);
router
  .route("/issue/:id")
  .get(findIssue)
  .delete(deleteIssue)
  .patch(updateIssue);

module.exports = router;
