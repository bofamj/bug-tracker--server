const express = require("express");
const router = express.Router();

const { createIssue } = require(".././controler/issue");

router.route("/issue").post(createIssue);

module.exports = router;
