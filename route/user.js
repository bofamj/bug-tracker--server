const express = require("express");
const router = express.Router();
const {
  register,
  signIn,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controler/user");

router.route("/register").post(register).get(getUsers);
router.route("/user").get(getUsers);
router.route("/user/:id").get(getUser).delete(deleteUser).patch(updateUser);
router.post("/sign-in", signIn);

module.exports = router;
