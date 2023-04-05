const express = require("express");
const router = express.Router();

const {
  createMessage,
  getAllMessage,
  getATicketMessages,
} = require(".././controler/messoge");

router.route("/message").post(createMessage).get(getAllMessage);

router.route("/message/ticket").get(getATicketMessages);
module.exports = router;
