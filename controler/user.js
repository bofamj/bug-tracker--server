const User = require("../models/User");
const bcrypt = require("bcryptjs");

//!the registration function
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  //if the user didn't provide all required fields return massage
  if (!email || !password || !name) {
    return res
      .status(403)
      .json({ message: "please enter all required fields" });
  }
  try {
    //* create the user in the database
    const user = await User.create({ name, email, password, role });
    //* create the token
    const token = user.createJWT();
    //*send the token and the user details
    res
      .status(200)
      .json({ name: user.name, email: user.email, role: user.role, token });
  } catch (error) {
    res.status(500).json({ masseg: error.message, error });
  }
};

//!sign in function
const signIn = async (req, res) => {
  const { email, password } = req.body;

  //* if one of the fields is empty
  if (!email || !password) {
    res.status(403).json({ masseg: "please fill all required fields" });
  }

  //*find the user in the database
  const user = await User.findOne({ email });

  //* if there is no user in the database
  if (!user) {
    return res
      .status(403)
      .json({ masseg: "you dont have a account to login please register" });
  }

  //*compare the provided password with the password in the database
  const isMatch = await user.comparePassword(password);

  //*is the password match
  if (!isMatch) {
    return res.status(403).json({ masseg: "invalid email or password" });
  }
  try {
    //* create the token
    const token = user.createJWT();
    res
      .status(200)
      .json({ userId: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    res.status(500).json({ masseg: error.message });
  }
};

//!get all users
const getUsers = async (req, res) => {
  //*get all users from the database and return without the users password
  //const userData = { name: 0, email: 0, role: 0 };
  const users = await User.find().select(["-password"]);

  //*if the is no user in the database
  if (!users) {
    return res.status(400).json({ messeg: error.message });
  }
  try {
    res.status(200).json({ ...users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//!get a single user
const getUser = async (req, res) => {
  //*git the id form the param
  const { id } = req.params;
  //*get user from the database and return without the user password
  const user = await User.findOne({ _id: id }).select("-password");
  //* if the is no user found with that id
  if (!user) {
    return res
      .status(400)
      .json({ message: "there is no user with that id was found" });
  }
  try {
    res.status(200).json({
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      userRole: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//!delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete({ _id: id });
  //*if the no user is found
  if (!user) {
    return res.status(400).json({ message: "the is no user found by this id" });
  }
  try {
    res.status(200).json({ message: "you have successfully deleted a user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//!update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  //*if the user is not matching
  if (!user) {
    return res.status(400).json({ message: "User does not exist " });
  }
  try {
    res.status(200).json({
      message: "you have successfully updated a user",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  signIn,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
