const express = require("express");
const router = express.Router();

const { createMessage, getAllMessage } = require(".././controler/messoge");

router.route("/message").post(createMessage).get(getAllMessage);

module.exports = router;
