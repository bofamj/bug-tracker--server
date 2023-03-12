const User = require("../models/User");

//*the registration function
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  //if the user didn't provide all required fields return massage
  if (!email || !password || !name) {
    res.status(403).json({ message: "please enter all required fields" });
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

//*sign in function
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

module.exports = {
  register,
  signIn,
};
