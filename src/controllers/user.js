const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("following");
    res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    next(err);
  }
};
const follow = async (req, res) => {
  const followee = await User.findOne({ _id: req.params.id });
  if (req.user.id === followee.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: "You cannot follow yourself",
    });
  } else {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $addToSet: { following: followee._id } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { _id: followee._id },
      { $addToSet: { followers: req.user._id } }
    );
    res.status(StatusCodes.OK).json({
      user,
    });
  }
};

const unfollow = async (req, res) => {
  const followee = await User.findOne({ _id: req.params.id });
  if (req.user.id === followee.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      msg: "You cannot unfollow yourself",
    });
  } else {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { following: followee._id } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { _id: followee._id },
      { $pull: { followers: req.user._id } }
    );
    res.status(StatusCodes.OK).json({
      user,
    });
  }
};

module.exports = {
  getUser,
  follow,
  unfollow,
};
