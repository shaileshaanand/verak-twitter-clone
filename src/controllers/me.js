const { StatusCodes } = require("http-status-codes");

const getMe = async (req, res, next) => {
  try {
    const { username, first_name, last_name } = req.user;
    console.log("USERRRRR", req.user);
    res
      .status(StatusCodes.OK)
      .json({ user: { username, first_name, last_name } });
  } catch (err) {
    next(err);
  }
};

const updateMe = async (req, res, next) => {
  try {
    const { first_name, last_name } = req.body;
    if (first_name) {
      req.user.first_name = first_name;
    }
    if (last_name) {
      req.user.last_name = last_name;
    }
    req.user.save();
    res.status(StatusCodes.OK).json({
      user: {
        username: req.user.username,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMe, updateMe };
