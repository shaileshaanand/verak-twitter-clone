const { StatusCodes } = require("http-status-codes");

const getMe = async (req, res) => {
  res.status(StatusCodes.OK).json(req.user);
};

const updateMe = async (req, res) => {
  const { first_name, last_name, password } = req.body;
  if (first_name) {
    req.user.first_name = first_name;
  }
  if (last_name) {
    req.user.last_name = last_name;
  }
  if (password) {
    req.user.password = password;
  }
  req.user.save();
  res.status(StatusCodes.OK).json(req.user);
};

module.exports = { getMe, updateMe };
