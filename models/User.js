const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//* Create the user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: "string",
    required: [true, "please enter a valid email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide a valid email",
    ],
  },
  password: {
    type: "string",
    required: [true, "please enter a a password"],
    minlength: 6,
  },
  role: {
    type: "string",
    default: "employee",
  },
});

//* bcrypting the password before sending to the database
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//* create the jsonwebtoken
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, userName: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

//* combaring the password to aluw access
UserSchema.methods.comparePassword = async function (password) {
  const isMatch = bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model("user", UserSchema);
