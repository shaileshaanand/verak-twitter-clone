const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { username, first_name, last_name, password } = req.body;
  const exists = await User.findOne({ username });
  if (exists) {
    throw new BadRequestError(`Username ${req.body.username} is already taken`);
  }
  const user = await User.create({ username, first_name, last_name, password });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: await User.findById(user._id), token });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

module.exports = {
  register,
  login,
};
